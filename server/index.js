import path from 'path';
import express from "express";
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { generateUniqueId, insertUrl } from './util/urlUtils.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./urlShortener.db', (error) => {
  if (error) {
    return console.log(error.message);
  }
  console.log('Connected to database successfully');
});

db.run(
  `CREATE TABLE IF NOT EXISTS urls (
    id TEXT PRIMARY KEY,
    original_url TEXT NOT NULL,
    creation_date DATE,
    password TEXT,
    expiration_date DATE)`
);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get('/redirect/:shortUrlId', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.post('/api/urlshort', async (req, res) => {
  const { url: originalUrl, password, creationDate, expirationDate, customUrl } = req.body;

  if (!originalUrl || originalUrl.length <= 0) {
    return res.status(400).json({ error: 'No URL provided' })
  }
  try {
    let hashedPassword = null;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }
    if (customUrl) {
      const checkQuery = `SELECT id FROM urls WHERE id = ?`;
      db.get(checkQuery, [customUrl], (error, row) => {
        if (error) {
          return res.status(500).json({ error: 'Database error occurred' });
        }
        if (row) {
          return res.status(409).json({ error: 'Custom URL already exists' });
        }
        insertUrl(customUrl, originalUrl, creationDate, hashedPassword, expirationDate, res);
      });
    } else {
      generateUniqueId((shortUrlId) => {
        insertUrl(shortUrlId, originalUrl, creationDate, hashedPassword, expirationDate, res);
      });
    }
  } catch (error) {
    console.error('Error processing request: ', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/:shortUrlId', (req, res) => {
  const shortUrlId = req.params.shortUrlId;
  const query = `SELECT original_url, password, expiration_date FROM urls WHERE id = ?`;

  db.get(query, [shortUrlId], (error, row) => {
    if (error) {
      return res.status(500).sendFile(path.resolve(__dirname, '../client/build', 'error_500.html'));
    }
    if (!row) {
      return res.status(404).sendFile(path.resolve(__dirname, '../client/build', 'error_404.html'));
    }

    const today = new Date();
    if (row.expiration_date) {
      const expirationDate = new Date(row.expiration_date);
      if (expirationDate < today) {
        return res.status(410).sendFile(path.resolve(__dirname, '../client/build', 'error_expired.html'));
      }
    }
    if (row.password) {
      return res.redirect(`/redirect/${shortUrlId}`);
    }

    res.redirect(row.original_url);
  });
});

app.post('/api/verifypass/:shortUrlId', (req, res) => {
  const shortUrlId = req.params.shortUrlId;
  const password = req.body.password;

  const query = `SELECT original_url, password FROM urls WHERE id = ?`;

  db.get(query, [shortUrlId], async (error, row) => {
    if (error) {
      return res.status(500).sendFile(path.resolve(__dirname, '../client/build', 'error_500.html'));
    }
    if (!row) {
      return res.status(404).sendFile(path.resolve(__dirname, '../client/build', 'error_404.html'));
    }
    try {
      const match = await bcrypt.compare(password, row.password);

      if (match) {
        return res.json({ original_url: row.original_url });
      } else {
        return res.status(401).json({ error: 'Incorrect password' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Error verifying password' });
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on ${PORT}`);
});