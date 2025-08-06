import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import login from '../controller/employee/login';
import common from '../helpers/common'
import { loginschema, regschema } from '../validation/emp/empschema';
import apiController from '../api/endpoints';
import toast from 'react-hot-toast';

const Resetpassword = () => {


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const combinedString = searchParams.get('email');
    const [param_email, param_token] = combinedString.split('?token=');

    const [user, setuser] = useState({
        password: ""
    })



    const [check, setcheck] = useState(false)

    const setprofile = common(setuser)

    const handelsubmit = async () => {
        if (!user.password) {
            toast.error("Password not allowed to be empty !")
            return
        }

        let body = {
            email: param_email,
            token: param_token,
            password: user.password
        }
        try {
            const d = await apiController.resetpassword(body)
            console.log(d?.data)
            await toast.success("password updated!")
            window.location.href = "/login"
        } catch (error) {
            toast.error("Token expired")
        }

    }


    console.log("param email ", param_email)
    console.log("param token", param_token)




    return (
        <>


            <div className="form-cont">

                <h2><span style={{ color: 'red' }}> T</span>ask<span style={{ color: 'red' }}>S</span>ync reset password</h2>
                <form onSubmit={handelsubmit}>
                    <label htmlFor="name">Email:</label>
                    <input placeholder='Username or Email' type="email" value={param_email} readOnly id="email" name="email" />


                    <label htmlFor="email">New Password:</label>
                    <input placeholder="Type new password" value={user.password} onChange={setprofile("password")} type="password" id="password" name="password" />


                </form>

                <button onClick={handelsubmit}>Submit</button>
            </div>
        </>
    )
}

export default Resetpassword
