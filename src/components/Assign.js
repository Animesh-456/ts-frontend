import { React, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Form from 'react-bootstrap/Form';
import AssignedTasks from './AssignedTasks';
import Pagination from 'react-bootstrap/Pagination';
import UnassignedTasks from './UnassignedTasks';
import { viewTasksUnassigned, viewTasksAssigned } from '../api/endpoints'
import apiController from '../api/endpoints';
import toast from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';
import empty from '../assets/empty.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import Hamburger from './Hamburger';



import { number } from 'joi';
const Assign = () => {

    const navigate = useNavigate();



    // Get the current location object, including query parameters
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




    const [selectValue, setSelectValue] = useState('Unassigned');

    // Event handler to update the select value
    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);
        goToPage(1)
    };




    // Logic


    const [unassignedTask, setunassignedTask] = useState([]);
    const [assigned, setassigned] = useState([]);
    const [totalPages, settotalPages] = useState(0);


    useEffect(() => {
        const userdata = localStorage.getItem('empdetails');
        console.log("userdata", JSON.parse(userdata)?.id)


        const fetchData = async () => {
            try {
                const result = await apiController.viewTasksUnassigned(JSON.parse(userdata)?.id, pageNumber);

                if (result.data?.tks[0]?.task?.length) {
                    setunassignedTask(result.data?.tks)
                    settotalPages(result?.data?.TotalPages)
                } else {
                    setunassignedTask(null)
                }

            } catch (error) {
                toast.error(error)
            }
        };

        fetchData();


        const fetchData2 = async () => {
            try {
                const result = await apiController.viewTasksAssigned(JSON.parse(userdata)?.id, pageNumber);

                if (result.data?.tks[0]?.task?.length) {
                    setassigned(result.data?.tks)
                    //settotalPages(d?.data?.TotalPages)
                } else {
                    setassigned(null)
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

                                <option value="Unassigned">
                                    Unassigned
                                </option>


                                <option value="Assigned">
                                    Assigned
                                </option>


                            </select>
                        </div>
                    </div>

                    <div className='assign-child'>

                        {selectValue == "Unassigned" ? (
                            <div>
                                {unassignedTask?.length ? unassignedTask[0]?.task.map((l, index) => {
                                    return (
                                        <UnassignedTasks prop={l} />
                                    )
                                }) : unassignedTask != null && (
                                    <div className='assign-child2'>
                                        <div><Spinner animation="border" variant="success" /></div>
                                        <div>Loading...</div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                {assigned?.length ? assigned[0]?.task.map((l, index) => {
                                    return (
                                        <AssignedTasks prop={l} />
                                    )
                                }) : assigned != null && (
                                    <div className='assign-child2'>
                                        <div><Spinner animation="border" variant="success" /></div>
                                        <div>  Loading...</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {selectValue == 'Unassigned' && unassignedTask == null && (
                        <div className='empty-bin-container'>
                            <img style={{ height: '300px', width: '300px' }} src={empty} />
                            <h6>Oops ! No Unassigned Tasks Found</h6>
                        </div>
                    )}



                    {selectValue == 'Assigned' && assigned == null && (
                        <div className='empty-bin-container'>
                            <img style={{ height: '300px', width: '300px' }} src={empty} />
                            <h6>Oops ! No Assigned Tasks Found</h6>
                        </div>
                    )}




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

export default Assign
