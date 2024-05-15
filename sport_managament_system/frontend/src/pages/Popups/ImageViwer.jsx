import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import { all } from 'axios';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs({ open, handleViewClose, imgId }) {


    return (

        <React.Fragment>

            <BootstrapDialog
                onClose={handleViewClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <div className='h-[400px] w-[400px]'>
                <img className='h-[400px] w-[400px]' src={'http://localhost:5000/public/'+imgId} alt="dsdsdd" />
                </div>

            </BootstrapDialog>
        </React.Fragment>
    );
}
