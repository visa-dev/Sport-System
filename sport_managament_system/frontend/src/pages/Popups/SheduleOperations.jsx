import * as React from 'react';
import { useState, useEffect } from 'react';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';

import DialogTitle from '@mui/material/DialogTitle';
import { TextField, MenuItem, Select } from '@mui/material';








export default function FormDialog({ open, handleClose, operation, data, edit }) {

    // useEffect(() => {
    //     //console.log(data.object);
    //     setFormData(data.object ? data.object : "");
    // }, [edit]);

    const [sports, setSports] = useState([]);
    let [formData, setFormData] = useState({
        eventName: '',
        gameType: '',
        date: '',
        time: '',
        venue: '',


    });

    const { eventName, date, time, venue, gameType } = formData;


    const handleAddShedule = async () => {


        await axios.post('http://localhost:5000/api/shedule/add', JSON.stringify(formData), {
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

     
await axios.put(`http://localhost:5000/api/shedule/update/${data.object._id}`, JSON.stringify(formData), {
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
        //console.log(value, name);
        setFormData({ ...formData, [name]: value });
       

    }

    const getSports = async () => {

        await fetch('http://localhost:5000/api/sport/show')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then(data => {
                setSports(data);
            })
            .catch(error => {
                // Handle errors here
                console.error('Fetch error:', error);
                // Notify the user
                // alert('An error occurred while fetching data. Please try again.');


            });
    }

    useEffect(() => {
        getSports();


    }, []);




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
                           

                            <div className='mb-[20px]'>
                                <TextField name='eventName' placeholder='Enter Event Name' label="Event" plavalue={eventName} onChange={handleChnage} />
                            </div>

                            <div>
                                <label className=''>GameType: </label>

                                <Select name='gameType' value={gameType} className='w-[130px]' onChange={handleChnage} >


                                    {
                                        sports.map((item) =>
                                            <MenuItem value={item.sportName} >{item.sportName}</MenuItem>
                                        )
                                    }

                                </Select>

                            </div>


                        </div>
                        <div className='mb-[20px]'>
                            <label htmlFor="">Date :</label>
                            <input type="date" value={date} name='date' onChange={handleChnage} className='w-[150px] h-[50px] ml-[40px]' />
                        </div>
                        <div className='mb-[20px]'>
                            <label htmlFor="">Time :</label>
                            <input type="time" value={time} name='time' onChange={handleChnage} className='w-[150px] h-[50px] ml-[40px]' />
                        </div>

                        <div className='mb-[20px]'>
                            <TextField name='venue' value={venue} placeholder='Enter Venue' label="Venue" onChange={handleChnage} />
                        </div>



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
