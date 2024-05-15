import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, message, Input } from 'antd';
import { EditOutlined, DeleteOutlined, ProfileOutlined } from '@ant-design/icons';
import FormDialog from '../Popups/CoatchOperations.jsx';
import LoadingSpinner from '../Loading/LoadingSpinner.jsx';
import ImageViewer from '../Popups/ImageViwer.jsx';

import Header from '../../component/common/Header.jsx'
import Footer from '../../component/common/Footer.jsx'
import { addminNavLinks } from '../../Assets/Data/HeaderItems.jsx';
import { socialLinks, quickLink01, quickLink02, quickLink03 } from '../../Assets/Data/FooterItems.jsx';

const AddCoatch = () => {




  const [edit, setEdit] = useState(false);

  const [coatchPhoto, setCoatchPhoto] = useState('');
  const [view, setView] = useState(false);

  //show all data
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  //filter serachbar
  const [filterData, setFilterData] = useState();

  const filterDataSource = (e) => {
    setFilterData(dataSource.filter(temp => temp.name.toLowerCase().includes(e.target.value)));
  }


  const fetchData = async () => {

    await fetch('http://localhost:5000/api/coatch/show')
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
  axios.defaults.withCredentials = true;
  useEffect(() => {
    fetchData();


  }, []);





  const deleteCoatch = (id) => {

    Modal.confirm({
      title: "Are you sure, you want to delete this coatch?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {

        axios.delete(`http://localhost:5000/api/coatch/delete/${id}`)
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

  const viewCoatch = (id) => {

    setCoatchPhoto('../../../public/' + id + '.jpg');
    setView(true);


  }


  const columns = [
    {
      key: '1',
      title: 'Game Type',
      dataIndex: 'gametype'
    },
    {
      key: '2',
      title: 'Name',
      dataIndex: 'name'
    },
    {
      key: '3',
      title: 'Gender',
      dataIndex: 'gender'
    },
    {
      key: '4',
      title: 'Birthday',
      dataIndex: 'dob'
    },
    {
      key: '5',
      title: 'Email',
      dataIndex: 'email'
    },
    {
      key: '6',
      title: 'Mobile',
      dataIndex: 'mobile'
    },
    {
      key: '7',
      title: 'Actions',
      render: (recode) => {
        const tempData = JSON.stringify(recode);
        const row = JSON.parse(tempData);

        return <>
          <div key={recode.key} className='flex gap-5'>

            <EditOutlined onClick={() => handleClickOpen({ val: "update", object: row, title: "Update Coatch" })} />
            <DeleteOutlined style={{ color: 'red' }} onClick={() => deleteCoatch(row._id)} />
            <ProfileOutlined style={{ color: 'blue' }} onClick={() => viewCoatch(row._id)} />
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
  const handleViewClose = () => {
    setView(false);

  }





  return (
    <div>
      <Header navLinks={addminNavLinks} role='/admin/home' />
      <div className='bgImage border-2 pl-[100px] pr-[100px] pt-[20px]  pb-[400px]'>


        <FormDialog open={open} handleClose={handleClose} operation={fetchData} data={params} edit={edit} />
        <ImageViewer open={view} handleViewClose={handleViewClose} imgId={coatchPhoto} />
        {
          loading ? (<LoadingSpinner />) : (
            <>

              <div className='flex gap-4 mb-[10px] '>

                <Button onClick={() => handleClickOpen({ val: "add", object: '', title: "Add Coatch" })} > + Add Coatch </Button>
                <Input type='text' placeholder='Search Coatchs' onChange={filterDataSource}></Input>
              </div>

              <Table columns={columns} dataSource={filterData} className='border-4 overflow-y-auto h-[500px]' > </Table>

            </>)

        }
        <div>
        </div>
      </div >
      <Footer socialLinks={socialLinks} quickLink01={quickLink01} quickLink02={quickLink02} quickLink03={quickLink03} />

    </div>







  );
}

export default AddCoatch


