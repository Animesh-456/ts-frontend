import { useState } from 'react';
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { editTask, deleteTask } from '../api/endpoints';
import apiController from '../api/endpoints';
const EditTaskModal = ({ show, onHide, detail }) => {

    const navigate = useNavigate();




    console.log("task modal details are:-", detail)


    const [taskDetails, settaskDetails] = useState({
        id: detail?._id,
        title: detail?.title || "",
        description: detail?.description || "",
    })


    const handleChange = (event) => {
        const { name, value } = event.target;
        settaskDetails(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };


    const handlesubmit = async () => {

        try {
            const result = await apiController.editTask(taskDetails)

            await toast.success("Task Updated !")
            await navigate('/assign')
            await onHide(onHide)

        } catch (error) {
            toast.error(error)
        }

    }


    const handledelete = async () => {

        try {
            const result = await apiController.deleteTask(taskDetails)
            await toast.success("Task deleted!")
            await navigate('/assign')
            await onHide(onHide)

        } catch (error) {
            toast.error(error)
        }
    }


    return (

        <Modal
            size="lg"
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >

            <Modal.Header closeButton>
                <Modal.Title>Task ID - {detail?._id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name='title'
                            type="text"
                            value={taskDetails?.title}
                            onChange={handleChange}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control
                            name='description'
                            value={taskDetails?.description}
                            onChange={handleChange}
                            as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handledelete}>
                    Delete Task
                </Button>
                <Button variant="success" onClick={handlesubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default EditTaskModal
