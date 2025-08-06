import { React, useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import PendingTaks from './PendingTaks';
import CompletedTasks from './CompletedTasks';

import Card from 'react-bootstrap/Card';
import RecentTasks from './RecentTasks';
import { Button, Navbar } from 'react-bootstrap';
import { Link, Router } from 'react-router-dom';
import { useAtom } from 'jotai'
import useratom from '../jotai/atom';

import common from '../helpers/common'
import { getUser, recentTasks, createdrecentTasks, updateemployee } from '../api/endpoints'

import apiController from '../api/endpoints';
import toast from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';
import empty from '../assets/empty.svg'
import Hamburger from './Hamburger';
import Header from './Header';




import Placeholder from 'react-bootstrap/Placeholder';
import Nav from './Nav';


const Dash = () => {




    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }


    const [selectValue, setSelectValue] = useState('Pending');

    // Event handler to update the select value
    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
    };












    // Logic


    const [empdetails, setempdetails] = useState([]);
    const [recenttasks, setrecenttasks] = useState([]);
    const [createdrecent, setcreatedrecent] = useState([]);


    useEffect(() => {
        const userdata = localStorage.getItem('empdetails');
        const token = JSON.parse(userdata);





        const fetchData = async () => {
            try {
                const data = await apiController.getUser(token);
                setempdetails(data.data.data)
                setIsLoading(false);
            } catch (error) {
                toast.error(error)
                setIsLoading(false); // Set error state if request fails
            }
        };

        fetchData();



        const fetchData2 = async () => {
            try {
                const result = await apiController.recentTasks(token.id);
                if (result.data.data?.length) {
                    setrecenttasks(result.data.data)
                } else {
                    setrecenttasks(null)
                }
            } catch (error) {
                toast.error(error)
            }
        };

        fetchData2();




        const fetchData3 = async () => {
            try {
                const result = await apiController?.createdrecentTasks(token.id);
                if (result.data.data?.length) {
                    setcreatedrecent(result.data.data)
                } else {
                    setcreatedrecent(null)
                }
            } catch (error) {
                toast.error(error)
            }
        };

        fetchData3();
    }, [])




    console.log("Local str")


    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            <div className='dashboard-main-container'>

                <Sidebar />



                <div className='assign-task-container'>
                    <Hamburger />

                    <div className='asgn'>
                        {empdetails && empdetails?.account_type == 'Assigner' && (

                            <div className='assign-child'>
                                <div>
                                    <h4>Account Details</h4>
                                </div>

                                <a href='/addtask' className='plus-sign'>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                                    </svg>
                                    <div>
                                        <h6>Add Task</h6>
                                    </div>

                                </a>
                            </div>
                        )}

                        <div className='assign-child2'>
                            <div>
                                <Card style={{ width: '20rem', height: '7rem' }}>
                                    <Card.Body>
                                        <Card.Title>My name</Card.Title>

                                        {isLoading ? (

                                            <Placeholder as={Card.Title} animation="glow">
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                        ) : (
                                            <Card.Text>
                                                {empdetails?.fname + " " + empdetails?.lname}
                                            </Card.Text>
                                        )}


                                    </Card.Body>
                                </Card>
                            </div>

                            <div>
                                <Card style={{ width: '20rem', height: '7rem' }}>
                                    <Card.Body>
                                        <Card.Title>My Email</Card.Title>
                                        {isLoading ? (
                                            <Placeholder as={Card.Title} animation="glow">
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                        ) : (
                                            <Card.Text>
                                                {empdetails?.email}
                                            </Card.Text>
                                        )}

                                    </Card.Body>
                                </Card>
                            </div>


                            <div>
                                <Card style={{ width: '20rem', height: '7rem' }}>
                                    <Card.Body>
                                        <Card.Title>Type of Account</Card.Title>
                                        {isLoading ? (
                                            <Placeholder as={Card.Title} animation="glow">
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                        ) : (
                                            <Card.Text>
                                                {empdetails?.account_type}
                                            </Card.Text>
                                        )}

                                    </Card.Body>
                                </Card>
                            </div>


                        </div>


                        <div className='assign-child'>
                            <div>
                                <h4>Recent Tasks</h4>
                            </div>

                        </div>
                        <br></br>

                        <div className='assign-child'>




                            {empdetails?.account_type == 'Assigner' ? (
                                <div>
                                    {createdrecent?.length ? createdrecent.slice(0, 5).map((l, index) => {
                                        return (
                                            <RecentTasks prop={l} />
                                        )
                                    }) : createdrecent != null && (
                                        <div className='assign-child2'>
                                            <div><Spinner animation="border" variant="success" /></div>
                                            <div>  Loading...</div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    {recenttasks?.length ? recenttasks.slice(0, 5).map((l, index) => {
                                        return (
                                            <RecentTasks prop={l} />
                                        )
                                    }) : recenttasks != null && (
                                        <div className='assign-child2'>
                                            <div><Spinner animation="border" variant="success" /></div>
                                            <div> Loading...</div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                        {empdetails?.account_type == 'Assigner' && createdrecent == null && (

                            <div className='empty-bin-container'>
                                <img style={{ height: '300px', width: '300px' }} src={empty} />
                                <h6>Oops ! No Tasks Found</h6>
                            </div>
                        )}


                        {empdetails?.account_type == 'Employee' && recenttasks == null && (

                            <div className='empty-bin-container'>
                                <img style={{ height: '300px', width: '300px' }} src={empty} />
                                <h6>Oops ! No Tasks Found</h6>
                            </div>
                        )}




                        <br></br>

                        <div className='assign-child'>
                            <div>

                                {empdetails?.account_type == 'Assigner' && createdrecent?.length ? (
                                    <Link style={{ textDecoration: 'none' }} to='/assign'>
                                        <Button variant='outline-primary'>View More...</Button>
                                    </Link>
                                ) : empdetails?.account_type == 'Employee' && recenttasks?.length ? (
                                    <Link style={{ textDecoration: 'none' }} to='/task'><Button variant='outline-primary'>View More...</Button></Link>
                                ) : (
                                    <></>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dash
