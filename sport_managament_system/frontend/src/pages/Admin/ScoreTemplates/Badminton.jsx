import React from 'react'
import { TextField } from '@mui/material';
import { Modal } from 'antd';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateSpinner from '../../Loading/UpdateSpinner';
import BarChartView from '../Charts/BarChartView';


const Badminton = (props) => {

    const [load, setLoad] = useState(false);
    const [disble, setDisble] = useState(false);
    const [scoreData, setScoreData] = useState([]);

    const [formData, setFormData] = useState({

        team1Name: '',
        team2Name: '',
        team1Score: '',
        team2Score: '',
        eventName: '',
        gameType: '',
        _id: '',
        date: ''

    });



    const handleChange = (e) => {

        const { value, name } = e.target;

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    }
    const handleScoreUpdate = (e) => {

        const { value, name } = e.target;

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));



    }

    const cheakScoreCard = async () => {

        await axios.get(`http://localhost:5000/api/score/show/${props.sheduleId}`, JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {

            if (res.data === null) {
                setDisble(true);

            } else {
                setDisble(false);
                setScoreData(res.data);

            }

        }

        )
            .catch(error => {

                console.error('Error:', error);
            });

        
    }


    const addTeams = async () => {

        const currentDate = new Date();
        const mounth = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const date = currentDate.getDate();
        formData.date = `${year}/${mounth}/${date}`;
        formData.gameType = props.gameType;
        formData._id = props.sheduleId;
        formData.eventName = props.eventName;

        await axios.post('http://localhost:5000/api/score/add', JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(
                () => setDisble(true)
            ).then(() =>
                cheakScoreCard()
            )
            .catch(error => {

                console.error('Error:', error);
            });


    }
    const updateScore = async () => {

        await axios.put(`http://localhost:5000/api/score/update/livescore/${props.sheduleId}`, JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {

                setLoad(true);
                cheakScoreCard();
                setTimeout(() => {
                    setLoad(false);
                }, 1000)
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });



    }

    const deleteScoreCard = (id) => {


        Modal.confirm({
            title: `Are you sure, you want to delete this ${props.eventName} ${props.gameType} Scorecard?`,
            okText: "Yes",
            okType: "danger",
            onOk: () => {

                axios.delete(`http://localhost:5000/api/score/delete/${id}`)
                    .then(() => {

                        window.location.reload();
                    })
                    .catch(error => {
                        // Handle errors
                        console.error('Error:', error);
                    });


            }
        });



    }

    const updateTeamNames = async () => {

        await axios.put(`http://localhost:5000/api/score/update/teamname/${props.sheduleId}`, JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            () => cheakScoreCard()
        )

            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });


    }


    useEffect(() => {
        cheakScoreCard();



    }, []);


    return (

        <div className='container'>
            <div className='flex justify-center gap-5 mt-[0px]'>

                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined" disabled={disble} color="error" className='h-[50px]  w-[250px]' onClick={() => { deleteScoreCard(props.sheduleId) }} >DELETE SCORE CARD</Button>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <Button
                        variant="outlined" color="secondary" className='h-[50px]  w-[250px]' onClick={() => window.location.reload()}  >BACK</Button>
                </Stack>
            </div>





            <div className=' flex justify-center gap-10 m-[10px]'>

                <div>
                    <TextField name='team1Name' label="Team Name 1" placeholder='Team Name 1' onChange={handleChange}></TextField>

                </div>
                <div>

                </div>
                <div>
                    <TextField name='team2Name' label="Team Name 2" placeholder='Team Name 2' onChange={handleChange}></TextField>
                </div>
                <div className='w-[100px] h-[50px] mt-[10px]'>


                    {
                        disble ? (<Stack direction="row" spacing={2}>

                            <Button variant="contained" color="success" className='h-[40px] w-[100px]' onClick={addTeams}>Add</Button>

                        </Stack>) : (<Stack direction="row" spacing={2}>

                            <Button variant="contained" color="secondary" className='h-[40px] w-[100px]' onClick={updateTeamNames} >Update</Button>

                        </Stack>)
                    }




                </div>

            </div>

            <div className=' flex justify-center gap-10 '>
                <div>
                    <TextField name='team1Score' label="Team-1 Score" placeholder='Score' onChange={handleScoreUpdate}></TextField>

                </div>
                <div>

                </div>
                <div>
                    <TextField name='team2Score' label="Team-2 Score" placeholder='Score' onChange={handleScoreUpdate} ></TextField>
                </div>
                <div>

                    {
                        load ? (<UpdateSpinner />) : (<Stack direction="row" spacing={2}>

                            <Button variant="contained" color="success" className='h-[50px] w-[100px]' onClick={updateScore} >Update</Button>

                        </Stack>)
                    }
                </div>

            </div>

            <div className='flex justify-center mt-[25px] '>
                <BarChartView dataSource={scoreData}></BarChartView>
            </div>









        </div>

    )
}

export default Badminton