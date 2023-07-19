import React, { useState } from "react";
import { Button, Box, Grid, TextField, Stack, Alert } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';


function Popup(props) {
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertSeverity, setAlertSeverity]: any = React.useState('success');
    const [alertMessage, setAlertMessage] = React.useState('');

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }
    
    const showAlert = (severity, message) => {
        setOpenAlert(true)
        setAlertSeverity(severity)
        setAlertMessage(message)
    }

    return (

        <Snackbar
        open={openAlert}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}>

            <Alert severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
            </Alert>
        </Snackbar>
    )
}

