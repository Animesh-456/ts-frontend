import React, { useState } from 'react'
import common from '../helpers/common'
import Link from "react-router-dom";
import add from "../controller/employee/reg"
import { regschema } from '../validation/emp/empschema';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Signup = () => {

    const navigate = useNavigate();

    const [user, setuser] = useState({
        fname: "",
        lname: "",
        email: "",
        username: "",
        account_type: "Assigner",
        password: "",
    })

    const [confirmPassword, setconfirmPassword] = useState({
        confirm_pass: "Anim"
    })

    const [check, setcheck] = useState(false)

    const setprofile = common(setuser)
    const confirm_pass = common(setconfirmPassword)



    const handelsubmit = async () => {


        const { error } = regschema.validate(user)
        if (error) {
            //alert(`${error.message}`)
            toast.error(error.message)
            return
        }
        try {
            await add(user);
            await toast.success("Registered Successfully !")
            navigate("/login")
        } catch (error) {
            toast.error("Email/username already exists!")
        }

    }

    console.log("checkbox state:- ", check)
    console.log("user data is :-", user)

    console.log("Password confirmation", confirmPassword)



    return (


        <div className="form-cont2">
            <h2>Register to <span style={{ color: 'red' }}> T</span>ask<span style={{ color: 'red' }}>S</span>ync</h2>
            <form>
                <div className='f-l-name'>
                    {/* <div> */}
                    <div className='f-l-child'>
                        <label htmlFor="name">First Name</label>
                        <input placeholder='First name' value={user.fname} onChange={setprofile("fname")} type="text" id="fname" name="fname" />
                    </div>
                    {/* </div> */}
                    {/* <div> */}
                    <div className='f-l-child'>
                        <label htmlFor="name">Last Name</label>
                        <input placeholder='Last Name' value={user.lname} onChange={setprofile("lname")} type="text" id="lname" name="lname" />
                    </div>
                    {/* </div> */}
                </div>
                <label htmlFor="name">Email</label>
                <input placeholder='Email' value={user.email} onChange={setprofile("email")} type="email" id="email" name="email" />

                <label htmlFor="name">Username</label>
                <input placeholder='Username' value={user.username} onChange={setprofile("username")} type="text" id="username" name="username" />

                <label htmlFor="name">Type Of account</label>
                <select id="account-type" value={user.account_type} onChange={setprofile("account_type")}>
                    <option value="Assigner">Assigner</option>
                    <option value="Employee">Employee</option>
                </select>

                <label htmlFor="email">Password:</label>
                <input placeholder="Password" value={user.password} onChange={setprofile("password")} type="password" id="password" name="password" />

            </form>
            <button type="submit" onClick={handelsubmit}>Submit</button>
        </div>
    )
}

export default Signup
