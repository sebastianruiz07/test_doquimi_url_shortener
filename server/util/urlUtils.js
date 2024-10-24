import { nanoid } from 'nanoid';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv'

dotenv.config();

const apiUrl = process.env.API_URL;
const db = new sqlite3.Database('./urlShortener.db');

const generateUniqueId = (callback) => {
  const shortUrlId = nanoid(10);
  const query = `SELECT id FROM urls WHERE id = ?`;

  db.get(query, [shortUrlId], (error, row) => {
    if (error) {
      return console.error(error.message);
    }

    if (row) {
      console.log(`ID ${shortUrlId} already exists, generating another one`);
      return generateUniqueId(callback);
    }

    callback(shortUrlId);
  });
}

const insertUrl = (shortUrlId, originalUrl, creationDate, hashedPassword, expirationDate, res) => {
  const query = `INSERT INTO urls (id, original_url, creation_date, password, expiration_date) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [shortUrlId, originalUrl, creationDate, hashedPassword, expirationDate], (error) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to insert URL' });
    }

    const shortUrl = `${apiUrl}/${shortUrlId}`;
    res.json({ shortUrl });
  });
};

export { generateUniqueId, insertUrl };