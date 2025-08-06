import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';

const Hamburger = () => {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showloginmodal, setShowloginmodal] = useState(false);

    const handleCloseLoginmodal = () => setShowloginmodal(false);
    const handleShowLoginmodal = () => setShowloginmodal(true);




    const userdata = JSON.parse(localStorage.getItem('empdetails'));


    const handleLogout = async () => {
        await setShow(false)
        window.location.href = "/"
        localStorage.removeItem("empdetails")
    }
    return (
        <div className='header'>
            <header class="header-content">
                <a href="/" className="logo2">
                    <span style={{ color: 'red' }}>T</span>ask<span style={{ color: 'red' }}>S</span>ync
                </a>

                <button type="button" className="hamburger">
                    {/* <RxHamburgerMenu className='menu-item' /> */}

                    <Button variant="light" size="sm" onClick={handleShow}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </Button>

                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title><h2 style={{ fontWeight: 'bold' }}><span style={{ color: 'red' }}>T</span>ask<span style={{ color: 'red' }}>S</span>ync</h2></Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className='lists'>
                                <ul>
                                    <li>
                                        <Link to='/' style={{ textDecoration: 'none', color: '#000' }}>
                                            <div className='li-div'>
                                                <div><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="red" className="bi bi-house" viewBox="0 0 16 16">
                                                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                                </svg></div>
                                                <div>Home</div>
                                            </div>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to='/dashboard' onClick={handleClose} style={{ textDecoration: 'none', color: '#000' }}>
                                            <div className='li-div'>
                                                <div><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="red" className="bi bi-person-vcard-fill" viewBox="0 0 16 16">
                                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5M9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8m1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5m-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96q.04-.245.04-.5M7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
                                                </svg></div>
                                                <div>Dashboard</div>
                                            </div>
                                        </Link>
                                    </li>


                                    {userdata?.account_type == 'Assigner' ? (
                                        <li>

                                            {/* Put condition here for employee or assigner later 👇 */}
                                            <Link to='/assign' onClick={handleClose} style={{ textDecoration: 'none', color: '#000' }}>
                                                <div className='li-div'>
                                                    <div><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="red" className="bi bi-list-task" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z" />
                                                        <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
                                                        <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z" />
                                                    </svg></div>
                                                    <div>Assign Task</div>
                                                </div>
                                            </Link>

                                        </li>

                                    ) : (

                                        <li>

                                            {/* Put condition here for employee or assigner later 👇 */}
                                            <Link to='/task' onClick={handleClose} style={{ textDecoration: 'none', color: '#000' }}>
                                                <div className='li-div'>
                                                    <div><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="red" className="bi bi-list-task" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z" />
                                                        <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z" />
                                                        <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z" />
                                                    </svg></div>
                                                    <div>My Tasks</div>
                                                </div>
                                            </Link>

                                        </li>
                                    )}





                                    <li>

                                        {/* Put condition here for employee or assigner later 👇 */}
                                        <Link to='/profile' onClick={handleClose} style={{ textDecoration: 'none', color: '#000' }}>
                                            <div className='li-div'>
                                                <div><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="red" className="bi bi-person-circle" viewBox="0 0 16 16">
                                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                                </svg></div>
                                                <div>My Profile</div>
                                            </div>
                                        </Link>

                                    </li>

                                    {/* Add more links here later 👇 */}



                                </ul>

                                {userdata ? (
                                    <Button className='btn-logout' variant="danger" size="lg" onClick={handleLogout}>

                                        <div className='li-div'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#fff" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                            </svg>
                                            <div>Logout</div>
                                        </div>

                                    </Button>
                                ) : (

                                    <Button className='btn-logout' variant="danger" size="lg" onClick={() => navigate("/login")}>

                                        <div className='li-div'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#fff" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                                <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                                            </svg>
                                            <div>Login</div>
                                        </div>

                                    </Button>
                                )}
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                    {/* <img src="./navigation-menu.svg" alt="menu-item" class="menu-item"> */}
                </button>
            </header>
        </div>
    )
}

export default Hamburger
