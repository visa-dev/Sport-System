import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, message, Input } from 'antd';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from '../Popups/EquipmentOpertions.jsx';
import LoadingSpinner from '../Loading/LoadingSpinner.jsx';

import Header from '../../component/common/Header.jsx'
import Footer from '../../component/common/Footer.jsx'
import { userNavLinks } from '../../Assets/Data/HeaderItems.jsx';
import { socialLinks, quickLink01, quickLink02, quickLink03 } from '../../Assets/Data/FooterItems.jsx';
import EquipmentBook from './Popups/EquipmentBook.jsx';


const Equipment = () => {


  //show all data
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(0);
  const [equipmentName, setEquipmentName] = useState(null);

  //filter serachbar
  const [filterData, setFilterData] = useState();

  const filterDataSource = (e) => {
    setFilterData(dataSource.filter(temp => temp.name.toLowerCase().includes(e.target.value)));
  }


  const fetchData = async () => {

    await fetch('http://localhost:5000/api/equipment/show')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
        setDataSource(data)
        setFilterData(data); // get frist time data otherwise empty table load
      }).then(setInterval(() => {
        setLoading(false);
      }, 250))
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







  const columns = [
    {
      key: '1',
      title: 'Equipment Name',
      dataIndex: 'name'
    },
    {
      key: '2',
      title: 'Game Type',
      dataIndex: 'gametype'
    },
    {
      key: '3',
      title: 'Qty',
      dataIndex: 'qty'
    },
    {
      key: '4',
      title: 'Available',
      dataIndex: 'available'
    },
    {
      key: '7',
      title: 'Book',
      render: (recode) => {
        const tempData = JSON.stringify(recode);
        const row = JSON.parse(tempData);

        return <>
          <div key={recode.key} className='flex gap-5'>
            <AddIcon onClick={() => { handleClickOpen(); setQty(recode.available); setEquipmentName(recode.name) }} />

          </div>
        </>
      }
    }

  ];


  const handleClickOpen = (item) => {

    setOpen(true);

  };


  const handleClose = () => {
    setOpen(false);

  };




  return (

    <div>
      <Header navLinks={userNavLinks} role='user' />
      <div className='bgImage border-2 pl-[100px] pr-[100px] pt-[20px] pb-[400px] '>

        <EquipmentBook open={open} handleClose={handleClose} qty={qty} equName={equipmentName} />

        {
          loading ? (<LoadingSpinner />) : (
            <>

              <div className='flex gap-4 mb-[10px] '>


                <Input type='text' placeholder='Search Equipment' onChange={(e) => filterDataSource(e)}></Input>
              </div>

              <Table columns={columns} dataSource={filterData} rowClassName={''} className='border-4 h-[500px] mt-[20px]'> </Table>
            </>)

        }



      </div >
      <Footer socialLinks={socialLinks} quickLink01={quickLink01} quickLink02={quickLink02} quickLink03={quickLink03} />
    </div>


  );
}

export default Equipment


