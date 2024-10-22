import axios from "axios";

const getShortenedUrl = async (originalUrl, password, creationDate, expirationDate, setShortUrl) => {
  try {
    await axios.post('http://localhost:3001/api/urlshort', { url: originalUrl, password: password, creationDate: creationDate, expirationDate: expirationDate }).then((urlResponse) => {
      setShortUrl(urlResponse.data.shortUrl);
    });
  } catch (error) {
    console.error('Error shortering the URL: ', error);
  }
}

export default getShortenedUrl;