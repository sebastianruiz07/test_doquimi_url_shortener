const shortid = require('shortid');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./urlShortener.db');

generateUniqueId = (callback) => {
  const shortUrlId = shortid.generate();
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

module.exports = { generateUniqueId };