import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Box, Button, CircularProgress, Grid2 as Grid, TextField, Tooltip, Typography } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { MyContext } from '../context/MyContext';
import CustomAlert from '../components/CustomAlert';

const RedirectView = () => {
  const { shortUrlId } = useParams();
  const [password, setPassword] = useState('');
  const { setCustomAlert } = useContext(MyContext);

  const verifyPassword = async () => {
    try {
      await axios.post(`https://sebastian.lab.doqimi.net/api/verifypass/${shortUrlId}`, { password: password }).then((response) => {
        window.location.href = response.data.original_url;
      });
    } catch (error) {
      setCustomAlert({ open: true, type: 'error', message: 'Incorrect password, please try again.' })
      console.error('Error with password: ', error);
    }
  }


  return (
    <Grid container justifyContent={'center'} spacing={3}>
      <Grid item size={10}>
        <Grid container spacing={3} justifyContent={'center'}>
          <Grid item size={12}>
            <Typography variant='h1' textAlign={'center'}>URL Shortener</Typography>
          </Grid>
          <Grid item size={12}>
            <Box sx={{ display: 'flex' }} justifyContent={'center'}>
              <CircularProgress size={100} color='inherit' sx={(theme) => ({ color: 'gray' })} />
            </Box>
          </Grid>
          <Grid item size={12}>
            <Typography variant='h6' textAlign={'center'}>Please enter the password to continue:</Typography>
          </Grid>
          <Grid item size={6} display={'flex'} justifyContent={'center'}>
            <TextField
              required
              id="url-password"
              label="Enter the password: "
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item size={12} display={'flex'} justifyContent={'center'}>
            <Tooltip title={''}>
              <Button
                size={'large'}
                disabled={password.length <= 0 ? true : false}
                onClick={() => verifyPassword()}>
                Continue <ArrowForwardIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <CustomAlert />
    </Grid>
  )
}

export default RedirectView;