import * as React from 'react';
import { useState, useEffect } from 'react';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
import { TextField, MenuItem, Select } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ open, handleClose, operation, data, edit }) {

    // useEffect(() => {
    //     //console.log(data.object);
    //     setFormData(data.object ? data.object : "");
    // }, [edit]);

    // const [coatchs, setCoatchs] = useState([]);
    const [formData, setFormData] = useState({
        sportName: 'Select',
        coatch: '',

    });

    const { sportName, coatch } = formData;


    const handleAddShedule = async () => {

        await axios.post('http://localhost:5000/api/sport/add', JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {

                operation(); //fetch data for realtime update

                setFormData({});

            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });

        handleClose();
        //window.location.reload();

    }

    const handleUpdateShedule = async () => {




        await axios.put(`http://localhost:5000/api/sport/update/${data.object._id}`, JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {

                operation();//fetch data
                setFormData({});

            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });

        handleClose();
        //window.location.reload();


    }

    let tempfunction;

    if (data.val === "add") {

        tempfunction = handleAddShedule;

    } if (data.val === "update") {
        // setFormData(data.object);
        tempfunction = handleUpdateShedule;


    }



    const handleChnage = (e) => {
        const { value, name } = e.target;
        console.log(value, name);
        setFormData({ ...formData, [name]: value });

    }


    // const getCoatches = async () => {

    //     await fetch('http://localhost:5000/api/coatch/show')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }

    //             return response.json();
    //         })
    //         .then(data => {
    //             setCoatchs(data);

    //         })
    //         .catch(error => {
    //             // Handle errors here
    //             console.error('Fetch error:', error);
    //             // Notify the user
    //             // alert('An error occurred while fetching data. Please try again.');


    //         });
    // }

    // useEffect(() => {
    //     getCoatches();
    // }, []);


    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <center className='font-[700] '>{data.title}</center>

                </DialogTitle>
                <div className=' mx-auto pl-[150px] pr-[150px]'>
                    <form action="">
                        <div className='mb-[20px]'>
                            <TextField name='sportName' placeholder='Enter Sport' label="Sport" value={sportName} onChange={handleChnage} />
                        </div >
                       

                    </form>
                </div>

                <DialogActions>
                    <Button onClick={handleClose} variant='outlined' color='secondary'>Cancel</Button>
                    <Button autoFocus className='text-primaryColor' variant='contained' onClick={tempfunction}>
                        {data.val}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
