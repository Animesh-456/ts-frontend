import { React, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import PendingTaks from './PendingTaks';
import CompletedTasks from './CompletedTasks';

import { viewTasksComplete, viewTasksPending } from '../api/endpoints';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import empty from '../assets/empty.svg'
import { Spinner } from 'react-bootstrap';
import Hamburger from './Hamburger';
import apiController from '../api/endpoints';
const Tasks = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pageNumber = parseInt(searchParams.get('page')) || 1;
    console.log(pageNumber)


    const goToPage = (pageNumber) => {
        if (pageNumber >= 1) {
            searchParams.set('page', pageNumber);
            navigate({ search: searchParams.toString() });
        }
    };

    const [selectValue, setSelectValue] = useState('pending');

    // Event handler to update the select value
    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
        goToPage(1)
    };


    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setcompletedTasks] = useState([]);
    const [totalPages, settotalPages] = useState(0);


    // Logic to fetch data 

    useEffect(() => {
        const userdata = localStorage.getItem('empdetails');
        console.log("userdata", JSON.parse(userdata)?.id)

        const fetchData = async () => {
            try {
                const d = await apiController.viewTasksPending(JSON.parse(userdata)?.id, selectValue, pageNumber);
                if (d.data?.tks[0]?.task?.length) {
                    setPendingTasks(d.data?.tks)
                    settotalPages(d?.data?.TotalPages)
                } else {
                    setPendingTasks(null)
                }

            } catch (error) {
                toast.error(error)
            }
        };

        fetchData();






        const fetchData2 = async () => {
            try {
                const d = await apiController.viewTasksComplete(JSON.parse(userdata)?.id, selectValue, pageNumber);
                if (d.data?.tks[0]?.task?.length) {
                    setcompletedTasks(d.data?.tks)
                    settotalPages(d?.data?.TotalPages)
                } else {
                    setcompletedTasks(null)
                }
            } catch (error) {
                toast.error(error)
            }
        };

        fetchData2();


     

    }, [pageNumber])


    let active = pageNumber;
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            { number }
        );
    }



    return (
        <div className='dashboard-main-container'>
            <Sidebar />
            <div className='assign-task-container'>
                <Hamburger />
                <div className='asgn'>
                    <div className='assign-child'>
                        <div>
                            <h4>Filter Results</h4>
                        </div>
                    </div>

                    <div className='assign-child'>
                        <div>
                            <select value={selectValue} onChange={handleSelectChange}>

                                <option value="pending">
                                    Pending Tasks
                                </option>
                                <option value="complete">
                                    Completed Tasks
                                </option>

                            </select>
                        </div>
                    </div>

                    <div className='assign-child'>

                        {selectValue == "pending" ? (
                            <div>
                                {pendingTasks?.length ? pendingTasks[0]?.task.map((l, index) => {
                                    return (
                                        <PendingTaks prop={l} />
                                    )
                                }) : pendingTasks != null && (
                                    <div className='assign-child2'>
                                        <div><Spinner animation="border" variant="success" /></div>
                                        <div>Loading...</div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                {completedTasks?.length ? completedTasks[0]?.task.map((l, index) => {
                                    return (
                                        <CompletedTasks prop={l} />
                                    )
                                }) : completedTasks != null && (
                                    <div className='assign-child2'>
                                        <div><Spinner animation="border" variant="success" /></div>
                                        <div>Loading...</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>


                    {selectValue == 'pending' && pendingTasks == null && (
                        <div className='empty-bin-container'>
                            <img style={{ height: '300px', width: '300px' }} src={empty} />
                            <h6>Oops ! No Unassigned Tasks Found</h6>
                        </div>
                    )}


                    {selectValue == 'complete' && completedTasks == null && (
                        <div className='empty-bin-container'>
                            <img style={{ height: '300px', width: '300px' }} src={empty} />
                            <h6>Oops ! No Unassigned Tasks Found</h6>
                        </div>
                    )}

                    {/* <div className='assign-child'>
                        <div>
                            <Pagination>{items}</Pagination>
                        </div>
                    </div> */}

                    <div className='assign-child'>
                        <Pagination>
                            {items?.map((i) => {
                                return (
                                    <Pagination.Item style={{ cursor: 'pointer' }} active={pageNumber == i?.number ? true : false} onClick={() => goToPage(i?.number)}>{i?.number}</Pagination.Item>
                                )
                            })}
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tasks
