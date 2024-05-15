import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';

import DialogTitle from '@mui/material/DialogTitle';
import { TextField, MenuItem, Select } from '@mui/material';


import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextArea from 'antd/es/input/TextArea';

import { styled } from '@mui/material/styles';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});








export default function FormDialog({ open, handleClose, operation, data, edit }) {


    const [sports, setSports] = useState([]);

    let [formData, setFormData] = useState({

        achivementName: '',
        gameType: 'cricket',
        discription: '',
        photo: ''

    });




    const handleAddAchivement = async () => {

        const ftest = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            ftest.append(key, value);
        });


        await axios.post('http://localhost:5000/api/achivement/add', ftest, {
            headers: {
                "Content-Type": "multipart/form-data",
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
        // //window.location.reload();

    }

    const handleUpdateAchivement = async () => {



        await axios.put(`http://localhost:5000/api/achivement/update/${data.object._id}`, JSON.stringify(formData), {
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
        tempfunction = handleAddAchivement;

    } if (data.val === "update") {
        // setFormData(data.object);
        tempfunction = handleUpdateAchivement;


    }



    const handleChnage = (e) => {
        const { value, name } = e.target;
        // //console.log(value, name);
        // setFormData({ ...formData, [name]: value });
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    }

    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(",")[1]);

        var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    }
    const imageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const blob = dataURItoBlob(event.target.result);
                setFormData((prevFormData) => ({ ...prevFormData, photo: blob }));

            };

            reader.readAsDataURL(file);
        }

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

                    <div className='mb-[20px]'>
                        <TextField name='achivementName' placeholder='Enter Achivement' label="Achivement" value={formData.achivementName} onChange={handleChnage} />
                    </div>

                    <div className='mb-[20px]'>
                        <label className=''>GameType: </label>

                        <Select name='gameType' value={formData.gameType} className='w-[140px]' onChange={handleChnage} >


                            {
                                sports.map((item) =>
                                    <MenuItem value={item.sportName} >{item.sportName}</MenuItem>
                                )
                            }

                        </Select>

                    </div>

                    <div className='mb-[20px]'>
                        <p>Discription : </p>
                        <TextArea rows={5} value={formData.discription} name='discription' onChange={handleChnage}></TextArea>
                    </div>
                    <div className='mb-[20px]'>
                        <label htmlFor="">Add Image: </label>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload Photo
                            <VisuallyHiddenInput type="file" onChange={imageUpload} name='photo' accept='image/*' />
                        </Button>
                        {/* <input type="file" accept="image/*" onChange={imageUpload} name='photo' /> */}
                    </div>


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
