import { useState } from 'react';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TaskModal from './TaskModal';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { markdone } from '../api/endpoints';

import { useNavigate } from 'react-router-dom';
import { backendFileroute } from '../common/links';

const PendingTaks = (props) => {

    const navigate = useNavigate();
    const handleClose = () => setLgShow(false);
    const handleShow = () => setLgShow(true);


    const [lgShow, setLgShow] = useState(false);

    const handlesubmit = async (id) => {
        await markdone(id).then(async (d) => {
            await toast.success("Task marked done!")
            navigate('/dashboard')
        }).catch(error => {
            toast.error("Error Occured !")
        })
    }
    return (
        <>
            <TaskModal show={lgShow} onHide={handleClose} detail={props?.prop} />
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

                        <Button variant="success" onClick={() => handlesubmit(props?.prop?._id)}>Mark Done</Button>

                    </div>
                </Card.Body>
            </Card>
            <br />
        </>
    )
}

export default PendingTaks
