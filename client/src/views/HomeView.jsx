import { useContext } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { Grid2 as Grid, Typography } from "@mui/material";
import { default as ShortenerForm } from "../components/ShortenerForm";
import { MyContext } from "../context/MyContext";
import CustomAlert from '../components/CustomAlert';

const HomeView = () => {
  const { apiUrl, shortUrl, originalUrl, setHasCustomUrl, customUrl, setCustomUrl, setHasPassword, password, setPassword, setHasExpirationDate, expirationDate, setExpirationDate, setCustomAlert, setShortUrl } = useContext(MyContext);

  const validateUrl = (url) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' +
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' +
      '(\\#[-a-zA-Z\\d_]*)?$',
      'i'
    );
    return urlPattern.test(url);
  };

  const getShortenedUrl = async () => {
    if (originalUrl.length <= 0) {
      return setCustomAlert({ open: true, type: 'info', message: "Please fill the URL to shortener" });
    }
    if (!validateUrl(originalUrl)) {
      return setCustomAlert({ open: true, type: 'error', message: "Invalid URL, please check it and try again" });
    }
    try {
      const creationDate = dayjs();
      await axios.post(`${apiUrl}/api/urlshort`, { url: originalUrl, customUrl: customUrl, password: password, creationDate: creationDate, expirationDate: expirationDate ? expirationDate.endOf('day') : null }).then((urlResponse) => {
        setShortUrl(urlResponse.data.shortUrl);
      });
    } catch (error) {
      setCustomAlert({ open: true, type: 'error', message: `Error: This URL already exists` });
      console.error('Error shortering the URL: ', error);
    }
  }

  const copyShortUrlToClipboard = () => {
    if (shortUrl.length > 0) {
      navigator.clipboard.writeText(shortUrl).then(() => {
        setCustomAlert({ open: true, type: 'success', message: "URL copied successfully" });
      }).catch((error) => {
        setCustomAlert({ open: true, type: 'error', message: "Error copying URL" });
      });
    }
  }

  const handleCheckCustomUrl = (event) => {
    setHasCustomUrl(event.target.checked);

    if (!event.target.checked) {
      setCustomUrl('');
    }
  }

  const handleCheckPassword = (event) => {
    setHasPassword(event.target.checked);

    if (!event.target.checked) {
      setPassword('');
    }
  }

  const handleCheckExpirationDate = (event) => {
    setHasExpirationDate(event.target.checked);

    if (event.target.checked) {
      const date = dayjs();
      setExpirationDate(date);
    } else {
      setExpirationDate(null);
    }
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item margin={4} size={12}>
        <Typography variant='h4' textAlign={'center'}>URL Shortener</Typography>
      </Grid>
      <ShortenerForm
        getShortenedUrl={getShortenedUrl}
        handleCheckCustomUrl={handleCheckCustomUrl}
        handleCheckPassword={handleCheckPassword}
        handleCheckExpirationDate={handleCheckExpirationDate}
        copyShortUrlToClipboard={copyShortUrlToClipboard} />
      <CustomAlert />
    </Grid>
  )
}

export default HomeView;