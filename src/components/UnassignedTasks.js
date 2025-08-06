import { useState } from 'react';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TaskModal from './TaskModal';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import toast from 'react-hot-toast';
import EditTaskModal from './EditTaskModal';
import { backendFileroute } from '../common/links';
const UnassignedTasks = (props) => {


    const handleClose = () => setLgShow(false);
    const handleShow = () => setLgShow(true);


    const [lgShow, setLgShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false)

    console.log("Unassigned task are :- ", props?.prop)

    const handleEdit = () => {
        setEditModalShow(true)
    }


    const handleEditModalClose = () => {
        setEditModalShow(false)
    }

    props?.prop?.files?.map((f) => {
        console.log("attachment files rae", f)
    })

    return (
        <>
            <TaskModal show={lgShow} onHide={handleClose} detail={props?.prop} />
            <EditTaskModal show={editModalShow} onHide={handleEditModalClose} detail={props?.prop} />
            <Card className='task-card'>
                <Card.Header as="h5">{props?.prop?.title}</Card.Header>
                <Card.Body>
                    {props?.prop?.status == 'complete' ? (
                        <>
                            <Card.Title><Badge style={{ fontSize: 'small' }} pill bg="success">
                                complete
                            </Badge></Card.Title>
                            <p>Date created : - {new Date(props?.prop?.createdAt).toUTCString()}</p>
                        </>
                    ) : (
                        <>
                            <Card.Title><Badge style={{ fontSize: 'small' }} pill bg="warning" text="dark">
                                pending
                            </Badge></Card.Title>
                            <p>Date created : - {new Date(props?.prop?.createdAt).toUTCString()}</p>
                        </>
                    )}
                    <Card.Text>
                        {props?.prop?.description}

                        {props?.prop?.files?.length && (
                            <p>Attachments: <br /> {props?.prop?.files?.map((f) => {
                                return (
                                    <>
                                        <a target='blank' href={`${backendFileroute}/${f}`}>{f}</a>
                                        <br />
                                    </>
                                )
                            })}</p>
                        )}



                    </Card.Text>

                    <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>
                        <Button variant="secondary" onClick={handleShow}>Details</Button>
                        {/* <Button variant="success">Assign Task</Button> */}
                        <Link to={`/assign/${props?.prop?._id}`}>
                            <Button variant="success">Assign Task</Button>
                        </Link>


                        <Button variant="outline-secondary" onClick={handleEdit}>Edit Task</Button>
                    </div>
                </Card.Body>
            </Card>
            <br />
        </>
    )
}

export default UnassignedTasks
