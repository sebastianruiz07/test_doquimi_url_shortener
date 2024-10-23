import { useContext } from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import { default as ShortenerForm } from "../components/ShortenerForm";
import { MyContext } from "../context/MyContext";
import CustomAlert from '../components/CustomAlert';
import { getShortenedUrl } from '../services/service';
import dayjs from "dayjs";

const HomeView = () => {
  const { shortUrl, originalUrl, setHasPassword, password, setPassword, setHasExpirationDate, expirationDate, setExpirationDate, setCustomAlert, setShortUrl } = useContext(MyContext);

  const getShortenedUrlFunction = () => {
    if (originalUrl.length <= 0) {
      setCustomAlert({ open: true, type: 'info', message: "Please fill the URL to shortener" });
      return;
    }
    try {
      const creationDate = dayjs();
      getShortenedUrl(originalUrl, password, creationDate, expirationDate, setShortUrl);
    } catch (error) {
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
      setPassword(null);
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
        getShortenedUrlFunction={getShortenedUrlFunction}
        handleCheckPassword={handleCheckPassword}
        handleCheckExpirationDate={handleCheckExpirationDate}
        copyShortUrlToClipboard={copyShortUrlToClipboard} />
      <CustomAlert />
    </Grid>
  )
}

export default HomeView;