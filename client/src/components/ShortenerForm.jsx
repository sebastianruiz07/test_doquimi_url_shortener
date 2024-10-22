import { useState } from 'react';
import dayjs from 'dayjs';
import { Alert, Button, Checkbox, FormControlLabel, Grid2 as Grid, IconButton, Snackbar, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import getShortenedUrl from '../services/service';
import ShowShortenUrl from './ShowShortenUrl';
import CustomAlert from './CustomAlert';

const ShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [hasPassword, setHasPassword] = useState(false);
  const [password, setPassword] = useState(null);
  const [hasExpirationDate, setHasExpirationDate] = useState(false);
  const [expirationDate, setExpirationDate] = useState(null);

  const getShortenedUrlFunction = () => {
    if (originalUrl.length <= 0) {
      setOpenAlert(true);
      setAlertType('info');
      setAlertMessage("Please fill the URL to shortener");
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
        setOpenAlert(true);
        setAlertType('success');
        setAlertMessage('URL copied successfully');
      }).catch((error) => {
        setOpenAlert(true);
        setAlertType('error');
        setAlertMessage('Error copying URL');
      });
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

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
      <Grid item size={{ xs: 10, md: 8 }}>
        <Grid container spacing={2}>
          <Grid item size={12}>
            <Grid container spacing={2} alignItems={'center'}>
              <Grid item size={{ xs: 12, md: 10 }}>
                <TextField
                  required
                  id="url-text"
                  label="Paste the URL: "
                  fullWidth
                  onChange={(e) => setOriginalUrl(e.target.value)}
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 2 }}>
                <Toolbar title={originalUrl.length <= 0 ? 'Please set an URL' : 'Shorten URL'}>
                  <Button
                    size={'large'}
                    onClick={() => getShortenedUrlFunction()}
                    disabled={originalUrl.length <= 0 ? true : false}>
                    Shorten
                  </Button>
                </Toolbar>
              </Grid>
            </Grid>
          </Grid>
          <Grid item size={12}>
            <Grid container spacing={2} alignItems={'center'}>
              <Grid item size={8}>
                <Grid container spacing={2}>
                  <Grid item size={{ xs: 12, md: 4 }} alignContent={'center'}>
                    <FormControlLabel
                      control={<Checkbox checked={hasPassword} onChange={(e) => handleCheckPassword(e)} />}
                      label="Set password to URL: "
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, md: 8 }}>
                    <TextField
                      id="url-password"
                      label="Type password: "
                      fullWidth
                      disabled={!hasPassword}
                      onChange={(e) => { setPassword(e.target.value) }}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, md: 4 }} alignContent={'center'}>
                    <FormControlLabel
                      control={<Checkbox checked={hasExpirationDate} onChange={(e) => handleCheckExpirationDate(e)} />}
                      label="Set expiration date to URL:"
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, md: 8 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          disabled={!hasExpirationDate}
                          label="Set expiration date to URL"
                          value={expirationDate}
                          minDate={dayjs()}
                          onChange={(newValue) => setExpirationDate(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item size={12}>
              </Grid>
            </Grid>
          </Grid>
          <ShowShortenUrl shortUrl={shortUrl} copyShortUrlToClipboard={() => copyShortUrlToClipboard()} />
        </Grid>
      </Grid>
      <CustomAlert openAlert={openAlert} handleCloseSnackbar={handleCloseSnackbar} alertType={alertType} alertMessage={alertMessage} />
    </Grid>
  )
}

export default ShortenerForm;