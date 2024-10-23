import { useContext } from 'react';
import dayjs from 'dayjs';
import { Button, Checkbox, FormControlLabel, Grid2 as Grid, TextField, Toolbar } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import ShowShortenUrl from './ShowShortenUrl';

import { MyContext } from '../context/MyContext';

const ShortenerForm = ({ getShortenedUrlFunction, handleCheckPassword, handleCheckExpirationDate, copyShortUrlToClipboard }) => {
  const { shortUrl, originalUrl, setOriginalUrl, hasPassword, setPassword, hasExpirationDate, expirationDate, setExpirationDate } = useContext(MyContext);
  return (
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
  )
}

export default ShortenerForm;