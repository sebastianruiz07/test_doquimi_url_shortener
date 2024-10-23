import { useContext } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { Grid2 as Grid, Typography } from "@mui/material";
import { default as ShortenerForm } from "../components/ShortenerForm";
import { MyContext } from "../context/MyContext";
import CustomAlert from '../components/CustomAlert';

const HomeView = () => {
  const { shortUrl, originalUrl, setHasPassword, password, setPassword, setHasExpirationDate, expirationDate, setExpirationDate, setCustomAlert, setShortUrl } = useContext(MyContext);

  const getShortenedUrl = async () => {
    if (originalUrl.length <= 0) {
      setCustomAlert({ open: true, type: 'info', message: "Please fill the URL to shortener" });
      return;
    }
    try {
      const creationDate = dayjs();
      await axios.post('https://sebastian.lab.doqimi.net/api/urlshort', { url: originalUrl, password: password, creationDate: creationDate, expirationDate: expirationDate ? expirationDate.endOf('day') : null }).then((urlResponse) => {
        setShortUrl(urlResponse.data.shortUrl);
      });
    } catch (error) {
      setCustomAlert({ open: true, type: 'error', message: 'Error shortering the URL' });
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
        handleCheckPassword={handleCheckPassword}
        handleCheckExpirationDate={handleCheckExpirationDate}
        copyShortUrlToClipboard={copyShortUrlToClipboard} />
      <CustomAlert />
    </Grid>
  )
}

export default HomeView;