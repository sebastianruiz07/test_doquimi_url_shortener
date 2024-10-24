import { useContext, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { Grid2 as Grid, Typography } from "@mui/material";
import { default as ShortenerForm } from "../components/ShortenerForm";
import { MyContext } from "../context/MyContext";
import CustomAlert from '../components/CustomAlert';

const HomeView = () => {
  const { apiUrl, shortUrl, originalUrl, setOriginalUrl, setHasCustomUrl, customUrl, setCustomUrl, setHasPassword, password, setPassword, setHasExpirationDate, expirationDate, setExpirationDate, setCustomAlert, setShortUrl } = useContext(MyContext);
  const [shortUrlMessage, setShortUrlMessage] = useState('');

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
        if (password && password.length > 0 && expirationDate) {
          showShortMessage('OPE');
        } else if (expirationDate) {
          showShortMessage('OE');
        } else if (password && password.length > 0) {
          showShortMessage('OP');
        } else {
          showShortMessage('O');
        }
        clearData();
        setCustomAlert({ open: true, type: 'success', message: 'Short URL successfully saved' })
      });
    } catch (error) {
      setCustomAlert({ open: true, type: 'error', message: `Error: This URL already exists` });
      console.error('Error shortering the URL: ', error);
    }
  }

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

  const clearData = () => {
    setOriginalUrl('');
    setHasCustomUrl(false);
    setCustomUrl(null);
    setHasPassword(false);
    setPassword('');
    setHasExpirationDate(false);
    setExpirationDate(null);
  }

  const showShortMessage = (params) => {
    const url = originalUrl;
    const pass = password;
    const expDate = new Date(expirationDate).toDateString();
    switch (params) {
      case 'O':
        setShortUrlMessage(`This shortcut URL redirects to "${url}"`);
        break;
      case 'OP':
        setShortUrlMessage(`This shortcut URL redirects to "${url}" with password "${pass}"`);
        break;
      case 'OE':
        setShortUrlMessage(`This shortcut URL redirects to "${url}" and is valid until ${expDate}`);
        break;
      case 'OPE':
        setShortUrlMessage(`This shortcut URL redirects to "${url}" with password "${pass}" and is valid until ${expDate}`);
        break;
      default:
        setShortUrlMessage(`This shortcut URL redirects to "${url}"`);
        break;
    }
  }

  const copyShortUrlToClipboard = () => {
    if (shortUrl.length > 0) {
      navigator.clipboard.writeText(shortUrl).then(() => {
        setCustomAlert({ open: true, type: 'success', message: "URL copied successfully" });
      }).catch((error) => {
        setCustomAlert({ open: true, type: 'error', message: "Error copying URL" });
        console.error(error);
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
    <Grid container justifyContent={'center'} size={12}>
      <Grid item margin={4} size={12}>
        <Typography variant='h3' textAlign={'center'}>URL Shortener</Typography>
      </Grid>
      <ShortenerForm
        getShortenedUrl={getShortenedUrl}
        handleCheckCustomUrl={handleCheckCustomUrl}
        handleCheckPassword={handleCheckPassword}
        handleCheckExpirationDate={handleCheckExpirationDate}
        copyShortUrlToClipboard={copyShortUrlToClipboard}
        shortUrlMessage={shortUrlMessage} />
      <CustomAlert />
    </Grid>
  )
}

export default HomeView;