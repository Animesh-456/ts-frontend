import React from 'react'
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

const AssignTask = () => {

    const navigate = useNavigate();
    const handlecancel = () => {
        // Redirect to another page
        navigate('/assign');
    }
    return (
        <div className='task-main-container'>
            <div className='task-child-container1'>
                <h1>Assign Task</h1>


                <a href='/assign' className='back-arrow-btn-container'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
                    </svg>
                </a>

                <a href='/profile' className='back-arrow-btn-container1'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="36" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                </a>
            </div>

            <div className='task-child-container2'>
                {/* <Row className="g-2">
                    <Col md>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Col>
                    <Col md>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Col>
                </Row> */}

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Task Title</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control as="textarea" rows={5} />
                </Form.Group>

                <div className='add-tsk-btn-container'>
                    <Button variant='success'>Assign Task</Button>
                    <Button onClick={handlecancel} variant='secondary'>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default AssignTask
