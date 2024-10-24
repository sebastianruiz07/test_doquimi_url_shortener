import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";

const CustomAlert = () => {
  const { customAlert, setCustomAlert } = useContext(MyContext);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setCustomAlert({ open: false, type: '', message: "" });
  };

  return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center',}}open={customAlert.open} autoHideDuration={3000} onClose={() => handleCloseSnackbar()}>
      <Alert
        onClose={() => handleCloseSnackbar()}
        severity={customAlert.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {customAlert.message}
      </Alert>
    </Snackbar>
  )
}

export default CustomAlert;