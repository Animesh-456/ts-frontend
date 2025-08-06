import { React, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getUser } from '../api/endpoints';
import toast from 'react-hot-toast';
import { updateemployee } from '../api/endpoints';
import apiController from '../api/endpoints';
import Hamburger from './Hamburger';


const Profile = () => {

    const navigate = useNavigate();

    const [empdetails, setempdetails] = useState({
        fname: "",
        lname: "",
        email: "",
        username: "",
        description: "",
        account_type: ""
    });

    useEffect(() => {

        const userdata = localStorage.getItem('empdetails');
        const token = JSON.parse(userdata);



        const fetchData = async () => {
            try {
                const data = await apiController.getUser(token);
                setempdetails(data.data.data)
                
            } catch (error) {
                toast.error(error)
            }
        };

        fetchData();
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setempdetails(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };


    console.log("empdetails", empdetails)




    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            await apiController.updateemployee(empdetails)

            await toast.success("Profile Updated!");

            navigate('/dashboard');

            // Optionally, redirect or show a success message
        } catch (error) {
            toast.error(error.message);
            // Optionally, show an error message to the user
        }
    };





    return (
        <div className='dashboard-main-container'>
            <Sidebar />
            <div className='assign-task-container'>
                <Hamburger />
                <div className='asgn'>
                    <div className='assign-child'>
                        <div>
                            <h4>Profile Details</h4>
                        </div>
                    </div>

                    <div className='assign-child2'>

                        <div>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name='fname' value={empdetails?.fname} onChange={handleChange} />
                            </Form.Group>
                        </div>

                        <div>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name='lname' value={empdetails?.lname} onChange={handleChange} />
                            </Form.Group>
                        </div>


                    </div>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control disabled readOnly value={empdetails?.email} type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Type of account</Form.Label>
                            <Form.Select disabled>
                                <option>{empdetails?.account_type}</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name='description' rows={3} value={empdetails?.description} onChange={handleChange} />
                        </Form.Group>



                    </Form>




                    <div className='assign-child'>
                        <div>
                            <Button variant='outline-primary' onClick={handleSubmit}>Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
