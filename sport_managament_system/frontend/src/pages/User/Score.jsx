import React from 'react';
import { useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { Table } from 'antd';
import VolleyBall from './ScoreTemplates/VolleyBall';
import FootBall from './ScoreTemplates/FootBall';
import Cricket from './ScoreTemplates/Cricket';
import Badminton from './ScoreTemplates/Badminton.jsx';
import Ruger from './ScoreTemplates/Ruger.jsx';
import { ProfileOutlined } from '@ant-design/icons';

import LoadingSpinner from '../Loading/LoadingSpinner.jsx';
import Chess from './ScoreTemplates/Chess.jsx';

import Header from '../../component/common/Header.jsx'
import Footer from '../../component/common/Footer.jsx'
import { addminNavLinks, userNavLinks } from '../../Assets/Data/HeaderItems.jsx';
import { socialLinks, quickLink01, quickLink02, quickLink03 } from '../../Assets/Data/FooterItems.jsx';

const Score = () => {

  const [sports, setSports] = useState([]);

  const [events, setEvents] = useState([]);
  const [game, setGame] = useState();
  const [load, setLoad] = useState(true);
  const [open, setOpen] = useState(false);


  const [formData, setFormData] = useState({
    gameType: '',

  });


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
      }).then(setInterval(() => {
        setLoad(false);
      }, 250))
      .catch(error => {
        // Handle errors here
        console.error('Fetch error:', error);
        // Notify the user
        // alert('An error occurred while fetching data. Please try again.');


      });
  }

  const getEvents = async (type) => {


    await fetch(`http://localhost:5000/api/shedule/show/${type}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
        setEvents(data);


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



  const handleChnage = (e) => {
    const { value, name } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    getEvents(value);

    setOpen(false);
    setLoad(false);

  }
  // const handleChnageEvenntSelector = (e) => {
  //   const { value, name } = e.target;

  //   setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

  // }

  const columns = [
    {
      key: '1',
      title: 'Event Name',
      dataIndex: 'eventName'
    },
    {
      key: '2',
      title: 'Game Type',
      dataIndex: 'gameType'
    },
    {
      key: '3',
      title: 'Date',
      dataIndex: 'date'
    },
    {
      key: '5',
      title: 'Venue',
      dataIndex: 'venue'
    },

    {
      key: '7',
      title: 'Actions',
      render: (recode) => {
        const tempData = JSON.stringify(recode);
        const row = JSON.parse(tempData);

        return <>
          <div key={recode.key} className='flex gap-5'>

            <ProfileOutlined style={{ color: 'blue' }} onClick={() => { createScoreCard(recode.gameType, row._id, recode.eventName) }} />

          </div>
        </>
      }
    }
  ];

  const createScoreCard = (gameType, sheduleId, eventName) => {


    switch (gameType) {
      case 'Cricket':
        setGame(<Cricket gameType={gameType} sheduleId={sheduleId} eventName={eventName} />);
        break;
      case 'FootBall':
        setGame(<FootBall gameType={gameType} sheduleId={sheduleId} eventName={eventName} />);
        break;
      case 'VolleyBall':
        setGame(<VolleyBall gameType={gameType} sheduleId={sheduleId} eventName={eventName} />);
        break;
      case 'Badminton':
        setGame(<Badminton gameType={gameType} sheduleId={sheduleId} eventName={eventName} />);
        break;
      case 'Chess':
        setGame(<Chess gameType={gameType} sheduleId={sheduleId} eventName={eventName} />);
        break;
      case 'Ruger':
        setGame(<Ruger gameType={gameType} sheduleId={sheduleId} eventName={eventName} />);
        break;

      default:
        break;


    }



    setOpen(true);
    setLoad(true);


    setTimeout(() => {
      setLoad(false);
    }, 250);


  }




  return (
    <div>
      <Header navLinks={userNavLinks} role='user' />
      <div className='container'>


        {
          load ? (<LoadingSpinner />) : (<div className='flex justify-center mt-[5px] gap-5'>

            <div>
              <InputLabel >Select Sport</InputLabel>

              <Select name='gameType' value={formData.gameType} className='w-[450px] mb-[15px]' onChange={handleChnage}  >


                {
                  sports.map((item) =>
                    <MenuItem value={item.sportName}  >{item.sportName}</MenuItem>
                  )
                }

              </Select>


            </div>



          </div>)
        }


        {

          open ? (load ? (<LoadingSpinner />) : (<>{game} </>)) : (<><Table columns={columns} dataSource={events}></Table></>)
        }



      </div>
      {/* <Footer socialLinks={socialLinks} quickLink01={quickLink01} quickLink02={quickLink02} quickLink03={quickLink03} /> */}
    </div>
  )
}

export default Score