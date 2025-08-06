import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import login from '../controller/employee/login';
import common from '../helpers/common'
import { loginschema, regschema } from '../validation/emp/empschema';
import apiController from '../api/endpoints';
import toast from 'react-hot-toast';

const ForgetPassword = () => {

    const [user, setuser] = useState({
        email: "",
    })



    const [check, setcheck] = useState(false)

    const setprofile = common(setuser)



    const handelsubmit = async () => {
        if (!user.email) {
            toast.error("Email not allowed to be empty !")
            return
        }
        try {
            const d = await apiController.resetpasswordlink(user)
            console.log(d?.data)
            await toast.success("Link sent to email")
            window.location.href = "/"
        } catch (error) {
            toast.error(error.message)
        }

    }


    console.log("checkbox state:- ", check)
    console.log("user data is :-", user)
    return (
        <>
            {/* <div className='log-container'>
            <div className='form-box'>
              <div className="top">
                <h2>Don't have an account? <Link to="/signup" onclick="register()">Sign Up</Link></h2>
                <h3>Login</h3>
              </div>
    
              <div className="input-box">
                <input type="text" className="input-field" placeholder="Username or Email" />
                <i className="bx bx-user"></i>
              </div>
    
              <div className="input-box">
                <input type="password" className="input-field" placeholder="Password" />
                <i className="bx bx-user"></i>
              </div>
    
              <div className='login-submit-container'>
                <button className='login-btn'>Login</button>
              </div>
            </div>
          </div> */}

            {/* <div className='login-cont'>
            <div className='box-log'>
              <div className='top'>
                <h3>Login <span style={{ color: 'red' }}> T</span>ask<span style={{ color: 'red' }}>S</span>ync</h3>
              </div>
    
    
              <div className='top2'>
                <div className="input-box">
                  <input type="text" className="input-field" placeholder="Username or Email" />
    
                </div>
                <div className="input-box">
                  <input type="password" className="input-field" placeholder="Password" />
    
                </div>
                <div className='log-btn-cont'>
                  <button className='log-btn'>Login</button>
                </div>
              </div>
    
    
            </div>
          </div> */}


            <div className="form-cont">
                <h2>Forgot Password  <span style={{ color: 'red' }}> T</span>ask<span style={{ color: 'red' }}>S</span>ync</h2>
                <form onSubmit={handelsubmit}>
                    <label htmlFor="name">Email:</label>
                    <input placeholder='Please type the Email' type="email" value={user.email} onChange={setprofile("email")} id="email" name="email" />
                </form>

                <button onClick={handelsubmit}>Send Verification Link</button>
            </div>
        </>
    )
}

export default ForgetPassword
