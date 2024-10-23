import { Grid2 as Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { ContentCopy as ContentCopyIcon} from '@mui/icons-material';

const ShowShortenUrl = ({shortUrl, copyShortUrlToClipboard}) => {
  return (
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
  )
}

export default ShowShortenUrl;