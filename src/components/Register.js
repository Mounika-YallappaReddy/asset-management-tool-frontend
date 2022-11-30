import React,{ useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CommonContext } from '../App';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Register() {
    let commonContext = useContext(CommonContext);
    let navigate=useNavigate()

    let [userFirstName,setUserFirstName]=useState("")
    let [userLastName,setUserLastName]=useState("")
    let [userEmail,setUserEmail]=useState("")
    let [userMobile,setUserMobile]=useState("")
    let [userPassword,setUserPassword]=useState("")

    let [errmsg,setErrMsg]=useState("")
    let [isErrFound,setIsErrorFound]=useState(false)
   

    async function handleRegister(){
        let res = await axios.post(`${commonContext.apiurl}/signup`, {
           userFirstName,
           userLastName,
           userEmail,
           userMobile,
           userPassword
        })
        if(res.data.statusCode===200){
            console.log("user registered successfully")
            navigate('/login')
        }else{
            if(res.data.statusCode===400 || res.data.statusCode===500){
                setIsErrorFound(true)
                setErrMsg(res.data.message)
            }
        }
    }

  return <>
  <section className='register-page'>
  <div className='container-fluid d-flex justify-content-center align-items-center'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-sm-12 col-md-6 col-lg-4 left-content d-flex align-items-center'>
                      <div className='register-left-content'>
                        <h3>Welcome to . . . .</h3>
                        <h1>Asset Managemement Tool</h1>
                        <h3>An Efficient Way to Asset Maintainane</h3>
                        </div>
                    </div>
                    <div className='col-sm-12 col-md-6 col-lg-6 right-content'>
                        <h1 >AMT</h1>
                        <div className='login-form d-flex justify-content-center align-items-center'>
                        <Form>
                            <h2 className='register-header'>SIGN UP</h2>
                           
                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                <Form.Control type="text" placeholder="Enter First Name" onChange={(e)=>{setUserFirstName(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Control type="text" placeholder="Enter Last Name" onChange={(e)=>{setUserLastName(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter Email" onChange={(e)=>{setUserEmail(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicMobile">
                                <Form.Control type="number" placeholder="Enter Mobile Number" onChange={(e)=>{setUserMobile(e.target.value)}}/>
                             </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" onChange={(e)=>{setUserPassword(e.target.value)}}/>
                            </Form.Group>
                            
                           <Button variant="primary" onClick={()=>{handleRegister()}} className='login-btn'>REGISTER</Button>
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

export default Register
