import { useContext } from 'react';
import dayjs from 'dayjs';
import { Button, Checkbox, FormControlLabel, Grid2 as Grid, TextField, Toolbar } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LinkIcon from '@mui/icons-material/Link';

import ShowShortenUrl from './ShowShortenUrl';

import { MyContext } from '../context/MyContext';

const ShortenerForm = ({ getShortenedUrl, handleCheckCustomUrl, handleCheckPassword, handleCheckExpirationDate, copyShortUrlToClipboard, shortUrlMessage }) => {
  const { originalUrl, setOriginalUrl, hasCustomUrl, customUrl, setCustomUrl, hasPassword, password, setPassword, hasExpirationDate, expirationDate, setExpirationDate } = useContext(MyContext);

  const handleChangeCustomUrl = (value) => {
    if (value.length <= 15) {
      setCustomUrl(value);
    }
  }

  return (
    <Grid item size={{ xs: 11, md: 9 }}>
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item size={12}>
          <Grid container alignItems={'center'}>
            <Grid item size={12}>
              <TextField
                required
                id="url-text"
                label="Paste the URL: https://example.com"
                fullWidth
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item size={12}>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item size={10}>
              <Grid container spacing={2}>
                <Grid item size={{ xs: 12, md: 4 }} alignContent={'center'}>
                  <FormControlLabel
                    control={<Checkbox checked={hasCustomUrl} onChange={(e) => handleCheckCustomUrl(e)} />}
                    label="Set custom URL"
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 8 }}>
                  <TextField
                    id="url-custom"
                    label="Type custom URL: "
                    fullWidth
                    helperText={"Character limit: 15"}
                    value={customUrl}
                    sx={{ visibility: hasCustomUrl ? 'visible' : 'hidden' }}
                    onChange={(e) => { handleChangeCustomUrl(e.target.value) }}
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }} alignContent={'center'}>
                  <FormControlLabel
                    control={<Checkbox checked={hasPassword} onChange={(e) => handleCheckPassword(e)} />}
                    label="Set password to URL"
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 8 }}>
                  <TextField
                    id="url-password"
                    label="Type password: "
                    type="password"
                    fullWidth
                    value={password}
                    sx={{ visibility: hasPassword ? 'visible' : 'hidden' }}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 4 }} alignContent={'center'}>
                  <FormControlLabel
                    control={<Checkbox checked={hasExpirationDate} onChange={(e) => handleCheckExpirationDate(e)} />}
                    label="Set expiration date to URL"
                  />
                </Grid>
                <Grid item size={{ xs: 12, md: 8 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} sx={{ visibility: hasExpirationDate ? 'visible' : 'hidden' }}>
                      <DatePicker
                        label="Set expiration date"
                        value={expirationDate}
                        minDate={dayjs()}
                        onChange={(newValue) => setExpirationDate(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item size={8} >
          <Toolbar title={originalUrl.length <= 0 ? 'Please set an URL' : 'Shorten URL'}>
            <Button
              size={'large'}
              onClick={() => getShortenedUrl()}
              variant='contained'
              fullWidth
              disabled={originalUrl.length <= 0 ? true : false}>
              <LinkIcon />&nbsp;&nbsp; Shorten &nbsp;&nbsp; <LinkIcon />
            </Button>
          </Toolbar>
        </Grid>
        <ShowShortenUrl shortUrlMessage={shortUrlMessage} copyShortUrlToClipboard={() => copyShortUrlToClipboard()} />
      </Grid>
    </Grid>
  )
}

export default ShortenerForm;