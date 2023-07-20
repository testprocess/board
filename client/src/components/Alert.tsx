import React, { useEffect, useState } from "react";
import { Button, Box, Grid, TextField, Stack, Alert } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';


function Popup(props) {
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertSeverity, setAlertSeverity]: any = React.useState(props.severity);
    const [alertMessage, setAlertMessage] = React.useState(props.message);

    useEffect(() => {
        console.log(props.trigger)
        if (props.trigger > 0) {
            showAlert()
        }
    }, [props.trigger])

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }
    
    const showAlert = () => {
        setOpenAlert(true)
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

export { Popup }