import React, { useEffect, useState } from 'react';
import Header from '../../component/common/Header'
import { userNavLinks } from '../../Assets/Data/HeaderItems'
import { quickLink01, quickLink02, quickLink03, socialLinks } from '../../Assets/Data/FooterItems'
import Footer from '../../component/common/Footer'
import { Table, message } from 'antd';
import MultiItemCarousel from './MultiItemCarousel'




const Home = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filterData, setFilterData] = useState();

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


  ];

  const fetchData = async () => {

    await fetch('http://localhost:5000/api/shedule/show')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
       
        setDataSource(data)
        setFilterData(data); // get frist time data otherwise empty table load
      })
      .catch(error => {
        // Handle errors here
        console.error('Fetch error:', error);
        // Notify the user
        // alert('An error occurred while fetching data. Please try again.');
        message.info("An error occurred while fetching data. Please try again.");

      });
  }
  
  useEffect(() => {
    fetchData();
    

  }, []);



  //show all data
  

  return (
    <div>
      <Header navLinks={userNavLinks} role='/user' />
      <div className='bgImage border-b-2 border-gray-400 pb-[25px] pt-[25px]' >
        {/* <h1 className='font1 text-[100px] text-center font-[700]'>USER HOME</h1> */}

        <MultiItemCarousel />

      </div>
      <div>
        <h1 className='flex justify-center pt-[15px] text-[25px]'>Upcoming Events</h1>
      </div>

      <div className='grid ml-[150px] mr-[150px] mt-[25px] mb-[25px]'>
        <Table columns={columns} dataSource={dataSource} className='border-2 ' />
      </div>
      <Footer socialLinks={socialLinks} quickLink01={quickLink01} quickLink02={quickLink02} quickLink03={quickLink03} />
    </div>
  )
}

export default Home