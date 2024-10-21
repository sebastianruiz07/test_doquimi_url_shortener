const path = require('path');
const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const { generateUniqueId } = require('./util/urlUtils');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());

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
    creation_date DATE )`
);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.post('/api/urlshort', (req, res) => {
  const originalUrl = req.body.url;

  if (!originalUrl) {
    return res.status(400).json({ error: 'No URL provided' })
  }

  generateUniqueId((shortUrlId) => {
    const query = `INSERT INTO urls (id, original_url, creation_date) VALUES (?, ?, ?)`;
    db.run(query, [shortUrlId, originalUrl, new Date().toDateString()], (error) => {
      if (error) {
        return console.error(error.message);
      }

      const shortUrl = `http://localhost:3001/${shortUrlId}`;

      res.json({ shortUrl });
    });
  });
});

app.get('/:shortUrlId', (req, res) => {
  const shortUrlId = req.params.shortUrlId;
  const query = `SELECT original_url FROM urls WHERE id = ?`;

  db.get(query, [shortUrlId], (error, row) => {
    if (error) {
      return console.log(error.message);
    }
    if (!row) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(row.original_url);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on ${PORT}`);
});