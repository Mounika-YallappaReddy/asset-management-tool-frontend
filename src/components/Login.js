import React,{ useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'
import { CommonContext } from '../App';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Login() {
    let commonContext = useContext(CommonContext);
    let navigate=useNavigate();
  
    let [userEmail,setUserEmail]=useState("")
    let [userPassword,setUserPassword]=useState("")

    let [errmsg,setErrMsg]=useState("")
    let [isErrFound,setIsErrorFound]=useState(false)
   
    async function handleLogin(){
        let res = await axios.post(`${commonContext.apiurl}/login`, {
           userEmail,
           userPassword 
        })
        if(res.data.statusCode===200){
            console.log("user login successful")
            navigate('/dashboard-new')
            localStorage.setItem('userEmail',userEmail)
        }else{
            if(res.data.statusCode===400 || res.data.statusCode===500){
                setIsErrorFound(true)
                setErrMsg(res.data.message)
            }
        }
    }

    async function redirectEmail(){
        navigate('/email')
    }
    
    async function redirectRegister(){
        console.log("butoj")
         navigate('/register')
    }
    return <>
        <section className='login-page'>
            <div className='container-fluid d-flex justify-content-center align-items-center'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-sm-12 col-md-6 col-lg-4 left-content'>
                        
                        <h1>Asset Managemement Tool</h1>
                        <h3>An Efficient Way to Asset Maintainane</h3>
                        <p>Simplified way of monitoring the activities provided by service providers and operations generated from their ativities</p>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6 right-content'>
                        <h1 >AMT</h1>
                        <div className='login-form d-flex justify-content-center align-items-center'>
                        <Form>
                            <h2>SIGN IN</h2>
                            <p>Please Sign in with Admin Information</p>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setUserEmail(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" onChange={(e)=>{setUserPassword(e.target.value)}}/>
                            </Form.Group>
                          
                            <Form.Group>
                                <a href='' className='forgot-pass' style={{"color":"#e6e6e6"}}  onClick={()=>{redirectEmail()}}>Forgot Password?</a>
                                <Link to='/register' className='register-user' style={{"color":"#e6e6e6"}} onClick={()=>{redirectRegister()}}>New User?</Link>
                            </Form.Group>
                            <Button variant="primary" onClick={()=>{handleLogin()}} className='login-btn'>LOGIN</Button>
                            {
                                isErrFound?
                                <p style={{color:'red',marginLeft:'25%'}}>{errmsg}</p>:<></>
                            }
                        </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Login
