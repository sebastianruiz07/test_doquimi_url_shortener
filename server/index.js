const path = require('path');
const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const { generateUniqueId } = require('./util/urlUtils');

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

app.post('/api/urlshort', (req, res) => {
  const originalUrl = req.body.url;
  const password = req.body.password;
  const creationDate = req.body.creationDate;
  const expirationDate = req.body.expirationDate;

  if (!originalUrl || originalUrl.length <= 0) {
    return res.status(400).json({ error: 'No URL provided' })
  }

  generateUniqueId((shortUrlId) => {
    const query = `INSERT INTO urls (id, original_url, creation_date, password, expiration_date) VALUES (?, ?, ?, ?, ?)`;

    db.run(query, [shortUrlId, originalUrl, creationDate, password, expirationDate], (error) => {
      if (error) {
        return console.error(error.message);
      }

      const shortUrl = `http://sebastian.lab.doqimi.net:3001/${shortUrlId}`;
      res.json({ shortUrl });
    });
  });
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

  db.get(query, [shortUrlId], (error, row) => {
    if (error) {
      return res.status(500).sendFile(path.resolve(__dirname, '../client/build', 'error_500.html'));
    }
    if (!row) {
      return res.status(404).sendFile(path.resolve(__dirname, '../client/build', 'error_404.html'));
    }

    if (row.password === password) {
      return res.json({original_url: row.original_url})
    } else {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  });

});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on ${PORT}`);
});