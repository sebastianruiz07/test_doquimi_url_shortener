import { Button, Grid2 as Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const getShortenedUrl = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/urlshort', { url: originalUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error shortering the URL: ', error);
    }
  }

  const copyShortUrlToClipboard = () => {
    if(shortUrl.length > 0) {
      navigator.clipboard.writeText(shortUrl);
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
                  onChange={(e) => { setOriginalUrl(e.target.value) }}
                />
              </Grid>
              <Grid item size={{ xs: 12, md: 2 }}>
                <Button size={'large'} onClick={() => getShortenedUrl()}>Shorten</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item size={12}>
            <Grid container>
              <Grid item size={{ xs: 12, md: 2 }}>
                <Typography variant='subtitle1'>Shortened URL: </Typography>
              </Grid>
              <Grid item size={{ xs: 11, md: 9 }}>
                <Typography variant='subtitle1'>{shortUrl}</Typography>
              </Grid>
              <Grid item size={{ xs: 1, md: 1 }} visibility={shortUrl.length > 0 ? 'visible' : 'hidden'}>
                <Tooltip title='Copy to clipboard'>
                  <IconButton onClick={() => copyShortUrlToClipboard()}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ShortenerForm;