import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { assignTask, viewtaskID } from '../api/endpoints';

import apiController from '../api/endpoints';

import Sidebar from './Sidebar';
import toast from 'react-hot-toast';
import { Button, Spinner } from 'react-bootstrap';

import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



import { searchusers } from '../api/endpoints';

import { useNavigate } from 'react-router-dom';
import Hamburger from './Hamburger';

const TaskDetails = () => {

    const navigate = useNavigate();

    const { taskId } = useParams();

    const [taskdetail, settaskdetail] = useState(null);

    const [textsearch, settextsearch] = useState({
        id: "",
        username: ""
    });

    const [userlist, setuserlist] = useState([])

    useEffect(() => {




        const fetchData = async () => {
            try {
                const result = await apiController.viewtaskID(taskId)

                settaskdetail(result?.data?.data[0])

            } catch (error) {
                toast.error(error)
            }
        };

        fetchData();

    }, [taskId])



    useEffect(() => {

        const fetchData = async () => {
            try {
                const result = await apiController. searchusers(textsearch)

                setuserlist(result?.data?.data)

            } catch (error) {
                toast.error(error)
            }
        };

        fetchData();

    }, [textsearch])


    console.log("task detail are", taskdetail)


    const handlechange = (e) => {
        settextsearch(e.target.value)
    }


    const handleSelectChange = async () => {
        await settextsearch(userlist[0])
        setuserlist([])
    }


    const handleAssign = async() => {
        console.log("txt", textsearch?._id)

        assignTask(textsearch?._id, taskId).then(async(d) => {
            await toast.success("Task Assigned !")
            navigate('/assign');
        }).catch(error => {
            toast.error("Error Occured !")
        })
    }





    console.log("here is task detail page")
    return (
        <div className='dashboard-main-container'>
            <Sidebar />
            <div className='assign-task-container'>
                <Hamburger />

                <div className='asgn'>
                    <div className='task-detail-child'>
                        <div>
                            <h4>{taskdetail?.title}</h4>
                        </div>


                        <div>
                            {/* Status logic */}
                            {taskdetail?.status == 'complete' ? (
                                <Badge style={{ fontSize: 'small' }} pill bg="success">
                                    complete
                                </Badge>
                            ) : (
                                <Badge style={{ fontSize: 'small' }} pill bg="warning" text='dark'>
                                    pending
                                </Badge>
                            )}
                        </div>

                    </div>

                    <br />

                    <div className='task-detail-child'>

                        <div>
                            <p>Date Created - <span style={{ fontWeight: 'bold' }}>{taskdetail?.createdAt}</span></p>
                        </div>

                    </div>


                    <div className='task-detail-child'>
                        <div>
                            <p>{taskdetail?.description}</p>
                        </div>
                    </div>


                    <br />
                    <br />


                    <div className='task-detail-child'>

                        <div>
                            {/* <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />




                                <Dropdown.Menu as={CustomMenu}>


                                    <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                                    <Dropdown.Item eventKey="3" active>
                                        Orange
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                            <InputGroup className="mb-3">

                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    onChange={handlechange}
                                    value={textsearch?.username}
                                />
                            </InputGroup>
                        </div>

                        <div><Button variant='success' onClick={handleAssign}>Assign</Button></div>
                    </div>



                    <div className='task-detail-child'>
                        <div>


                            {/* Dropdown */}
                            <a onClick={handleSelectChange} style={{ cursor: 'pointer' }}>{userlist[0]?.username}</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default TaskDetails
