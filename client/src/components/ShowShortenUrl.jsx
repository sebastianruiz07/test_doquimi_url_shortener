import { Grid2 as Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import { useContext } from 'react';
import { MyContext } from '../context/MyContext';

const ShowShortenUrl = ({ shortUrlMessage, copyShortUrlToClipboard }) => {
  const { shortUrl } = useContext(MyContext);

  return (
    <Grid item size={12}>
      <Grid container>
        <Grid item size={{ xs: 12, md: 2 }}>
          <Typography variant='h6'>Shortened URL: </Typography>
        </Grid>
        <Grid item size={{ xs: 11, md: 9 }}>
          <Typography variant='subtitle1' style={{ wordBreak: 'break-word' }}>{shortUrl}</Typography>
        </Grid>
        <Grid item size={{ xs: 1, md: 1 }} visibility={shortUrl.length > 0 ? 'visible' : 'hidden'}>
          <Tooltip title='Copy to clipboard'>
            <IconButton onClick={() => copyShortUrlToClipboard()}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item size={{ xs: 0, md: 2 }}>
        </Grid>
        <Grid item size={{ xs: 12, md: 10 }}>
          <Typography variant='caption' style={{ wordBreak: 'break-word' }}>{shortUrlMessage}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ShowShortenUrl;