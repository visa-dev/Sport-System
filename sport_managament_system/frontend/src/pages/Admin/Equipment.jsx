import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, message, Input } from 'antd';
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import FormDialog from '../Popups/EquipmentOpertions.jsx';
import LoadingSpinner from '../Loading/LoadingSpinner.jsx';

import Header from '../../component/common/Header.jsx'
import Footer from '../../component/common/Footer.jsx'
import { addminNavLinks } from '../../Assets/Data/HeaderItems.jsx';
import { socialLinks, quickLink01, quickLink02, quickLink03 } from '../../Assets/Data/FooterItems.jsx';


const Equipment = () => {
  const [edit, setEdit] = useState(false);

  //show all data
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

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





  const deleteCoatch = (id) => {

    Modal.confirm({
      title: "Are you sure, you want to delete this coatch?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {

        axios.delete(`http://localhost:5000/api/equipment/delete/${id}`)
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
      title: 'Actions',
      render: (recode) => {
        const tempData = JSON.stringify(recode);
        const row = JSON.parse(tempData);

        return <>
          <div key={recode.key} className='flex gap-5'>

            <EditOutlined onClick={() => handleClickOpen({ val: "update", object: row, title: "Update Equipment" })} />
            <DeleteOutlined style={{ color: 'red' }} onClick={() => deleteCoatch(row._id)} />
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

                <Button onClick={() => handleClickOpen({ val: "add", object: '', title: "Add Equipment" })} > + Add Equipment </Button>
                <Input type='text' placeholder='Search Equipment' onChange={filterDataSource}></Input>
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


