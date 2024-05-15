import React from 'react'
import { TextField } from '@mui/material';
import { Modal } from 'antd';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateSpinner from '../../Loading/UpdateSpinner';
import BarChartView from '../Charts/BarChartView';


const Ruger = (props) => {

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


    useEffect(() => {
        cheakScoreCard();


    }, []);


  
    const timer = setTimeout(() => {
        cheakScoreCard();
    }, 3000); // 2000 milliseconds = 2 seconds


    return (

        <div className='container'>

            <div className='flex justify-center mt-[25px] '>
                <BarChartView dataSource={scoreData}></BarChartView>
            </div>
        </div>

    )
}

export default Ruger