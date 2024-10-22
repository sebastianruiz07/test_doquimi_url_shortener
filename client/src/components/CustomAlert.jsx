import { Alert, Snackbar } from "@mui/material";

const CustomAlert = ({openAlert, handleCloseSnackbar, alertType, alertMessage}) => {
  return (
    <Snackbar open={openAlert} autoHideDuration={5000} onClose={() => handleCloseSnackbar()}>
      <Alert
        onClose={() => handleCloseSnackbar()}
        severity={alertType}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  )
}

export default CustomAlert;