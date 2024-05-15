import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, message, Input } from 'antd';
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import FormDialog from '../Popups/SheduleOperations.jsx';
import LoadingSpinner from '../Loading/LoadingSpinner.jsx';

import Header from '../../component/common/Header.jsx'
import Footer from '../../component/common/Footer.jsx'
import { addminNavLinks } from '../../Assets/Data/HeaderItems.jsx';
import { socialLinks, quickLink01, quickLink02, quickLink03 } from '../../Assets/Data/FooterItems.jsx';

const Shedule = () => {
  const [edit, setEdit] = useState(false);

  //show all data
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  //filter serachbar
  const [filterData, setFilterData] = useState();

  const filterDataSource = (e) => {

    setFilterData(dataSource.filter(temp => temp.eventName.toLowerCase().includes(e.target.value)));
  }


  const fetchData = async () => {

    await fetch('http://localhost:5000/api/shedule/show')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
        setDataSource(data);
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





  const deleteShedule = (id) => {

    Modal.confirm({
      title: "Are you sure, you want to delete this shedule?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {

        axios.delete(`http://localhost:5000/api/shedule/delete/${id}`)
          .then(() => {
            // Handle the response from the server
            fetchData();
          })
          .catch(error => {
            // Handle errors
            console.error('Error:', error);
          });

        //window.location.reload();
      }
    });




  }


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

            <EditOutlined onClick={() => handleClickOpen({ val: "update", object: row, title: "Update Shedule" })} />
            <DeleteOutlined style={{ color: 'red' }} onClick={() => deleteShedule(row._id)} />
          </div>
        </>
      }
    }
  ];


  const [open, setOpen] = useState(false);

  const [params, setParams] = useState(0);

  const handleClickOpen = (item) => {


    if (item.val === "update") {
      // data = { title: "Update Coatch", option: item };
      setEdit(true);
      setParams(item);
    } if (item.val === "add") {
      setParams(item);
    }
    setOpen(true);

  };


  const handleClose = () => {
    setOpen(false);

  };





  return (

    <div>
      <Header navLinks={addminNavLinks} role='/admin/home' />
      <div className='bgImage border-2 pl-[100px] pr-[100px] pt-[20px] pb-[400px] '>


        <FormDialog open={open} handleClose={handleClose} operation={fetchData} data={params} edit={edit} />

        {
          loading ? (<LoadingSpinner />) : (
            <>

              <div className='flex gap-4 mb-[10px] '>


                <Button onClick={() => handleClickOpen({ val: "add", object: '', title: "Add Shedule" })} > + Add Shedule </Button>
                <Input type='text' placeholder='Search Shedule' onChange={filterDataSource}></Input>
              </div>

              <Table columns={columns} dataSource={filterData} rowClassName={''} className='border-4 h-[500px] mt-[20px]'> </Table>
            </>)

        }



      </div >
      <div>
        <Footer socialLinks={socialLinks} quickLink01={quickLink01} quickLink02={quickLink02} quickLink03={quickLink03} />
      </div>

    </div>


  );
}

export default Shedule


