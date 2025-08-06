import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import login from '../controller/employee/login';
import common from '../helpers/common'
import { loginschema, regschema } from '../validation/emp/empschema';
import apiController from '../api/endpoints';
import toast from 'react-hot-toast';
const Login = () => {


  const [user, setuser] = useState({
    email: "",
    //account_type: "Assigner",
    password: "",
  })



  const [check, setcheck] = useState(false)

  const setprofile = common(setuser)



  const handelsubmit = async () => {


    const { error } = loginschema.validate(user)
    if (error) {
      toast.error(error.message)
      return
    }

    try {
      const d = await login(user)


      console.log(d?.data)
      await toast.success("Logged in!")
      window.location.href = "/dashboard"

    } catch (error) {
      toast.error("Invalid email/username !")
    }
  }


  console.log("checkbox state:- ", check)
  console.log("user data is :-", user)
  return (
    <>

      <div className="form-cont">

        <h2>Login to <span style={{ color: 'red' }}> T</span>ask<span style={{ color: 'red' }}>S</span>ync</h2>
        <form onSubmit={handelsubmit}>
          <label htmlFor="name">Email:</label>
          <input placeholder='Type your Email' type="email" value={user.email} onChange={setprofile("email")} id="email" name="email" />


          <label htmlFor="email">Password:</label>
          <input placeholder="Password" value={user.password} onChange={setprofile("password")} type="password" id="password" name="password" />


        </form>
        <a href='/forgetpassword'>Forgot password ?</a>
        <br /><br />
        <button onClick={handelsubmit}>Submit</button>
      </div>
    </>
  )
}

export default Login
