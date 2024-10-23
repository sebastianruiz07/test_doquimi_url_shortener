import axios from "axios";

export const getShortenedUrl = async (originalUrl, password, creationDate, expirationDate, setShortUrl) => {
  try {
    await axios.post('http://localhost:3001/api/urlshort', { url: originalUrl, password: password, creationDate: creationDate, expirationDate: expirationDate ? expirationDate.endOf('day') : null }).then((urlResponse) => {
      setShortUrl(urlResponse.data.shortUrl);
    });
  } catch (error) {
    console.error('Error shortering the URL: ', error);
  }
}

export const passwordMatches = async (shortUrlId, password, ) => {
  try {
    await axios.post(`http://localhost:3001/api/verifypass/${shortUrlId}`, { password: password});
  } catch (error) {
    console.error('Error with password: ', error);
  }
}
