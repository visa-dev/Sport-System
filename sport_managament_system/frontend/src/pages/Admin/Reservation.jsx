import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, message, Input } from 'antd';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from '../Popups/EquipmentOpertions.jsx';
import LoadingSpinner from '../Loading/LoadingSpinner.jsx';

import Header from '../../component/common/Header.jsx'
import Footer from '../../component/common/Footer.jsx'
import { addminNavLinks, userNavLinks } from '../../Assets/Data/HeaderItems.jsx';
import { socialLinks, quickLink01, quickLink02, quickLink03 } from '../../Assets/Data/FooterItems.jsx';

import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';


const Reservation = () => {

    //show all data
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);


    //filter serachbar
    const [filterData, setFilterData] = useState();

    const filterDataSource = (e) => {
        setFilterData(dataSource.filter(temp => temp.indexnumber.toLowerCase().includes(e.target.value)));
    }


    const fetchData = async () => {
       
        await fetch('http://localhost:5000/api/equipment/show-books')
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
                // Notify the user;
                // alert('An error occurred while fetching data. Please try again.');
                message.info("An error occurred while fetching data. Please try again.");

            });
    }

    useEffect(() => {
        const fetchDataPeriodically = () => {
            fetchData(); // Call your fetch function here
        };
    
        const intervalId = setInterval(fetchDataPeriodically, 1000); // Call fetchDataPeriodically every 2000 milliseconds (2 seconds)
    
        // Cleanup function to clear the interval when the component unmounts or when the dependencies change
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect runs once on mount and then not again unless dependencies change
    



    const allowItems = async (row) => {
        alert("Are you want to give this equipment request?");
        await axios.put(`http://localhost:5000/api/equipment/update-status/${row._id}/allow/${row.name}/${row.qty}`, {}, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

    };

    const notAllowItems = async (row) => {
        alert("Are you want to not give this equipment request?");
        await axios.put(`http://localhost:5000/api/equipment/update-status/${row._id}/not-allow/${row.name}/${row.qty}`, {}, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    };

    const deleteInventory = async (id) => {
        alert("Are you want to deletethis equipment request?");
        await axios.delete(`http://localhost:5000/api/equipment/delete-inventory/${id}`, {}, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(
            window.location.reload()
        )

    };






    const columns = [
        {
            key: '1',
            title: 'Name',
            dataIndex: 'name'
        },
        {
            key: '2',
            title: 'Index Number',
            dataIndex: 'indexnumber'
        },
        {
            key: '3',
            title: 'Mobile',
            dataIndex: 'mobile'
        },
        {
            key: '4',
            title: 'Qty',
            dataIndex: 'qty'
        },

        // {
        //     key: '4',
        //     title: 'Game Type',
        //     dataIndex: 'gametype'
        // },
        {
            key: '4',
            title: 'From',
            dataIndex: 'from'
        },
        {
            key: '4',
            title: 'To',
            dataIndex: 'to'
        },
        {
            key: '5',
            title: 'Status',
            dataIndex: 'status'
        },
        {
            key: '6',
            title: 'Actions',
            render: (recode) => {
                const tempData = JSON.stringify(recode);
                const row = JSON.parse(tempData);

                return <>
                    <div key={recode.key} className='flex gap-5'>

                        <CheckCircleOutlineIcon onClick={async () => { await allowItems(row) }} />
                        <ArrowCircleLeftIcon onClick={async () => { await notAllowItems(row) }} />
                        <DeleteIcon style={{ color: 'red' }} onClick={async () => await deleteInventory(row._id)} />

                    </div>
                </>
            }
        }

    ];







    return (

        <div>
            <Header navLinks={addminNavLinks} role='/admin/home' />
            <div className='bgImage border-2 pl-[100px] pr-[100px] pt-[20px] pb-[400px] '>



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

export default Reservation


