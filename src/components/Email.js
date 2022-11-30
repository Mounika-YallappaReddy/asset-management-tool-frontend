import React,{ useState, useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CommonContext } from '../App';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Email() {
    let commonContext = useContext(CommonContext);
    let navigate=useNavigate();

    let [userEmail,setUserEmail]=useState("")
    
    let [errmsg,setErrMsg]=useState("")
    let [isErrFound,setIsErrorFound]=useState(false)

   async function handleEmail(){
    if(userEmail!=""){
       await localStorage.setItem('userEmail',userEmail)
        navigate('/forgot-pass')
    }else{
        setIsErrorFound(true)
        setErrMsg("Email Id shouldn't be empty")  
    }
    }
    return <>
        <section className='email-page'>
             <div className='container-fluid d-flex justify-content-center align-items-center'>
                <div className='row d-flex justify-content-center'>
                    <div className='col-sm-9 col-md-6 col-lg-4 email-form'>
                        <Form>
                        <Form.Group>
                            <h1 >AMT</h1>
                            <h2>Forgot your password?</h2>
                            <p>Don't worry!! Enter the Registered Email ID</p>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter Email" onChange={(e)=>{setUserEmail(e.target.value)}}/>
                        </Form.Group>

                        <Button variant="primary"  className='email-btn' onClick={()=>{handleEmail()}}>CONTINUE</Button>
                        </Form>
                        {
                                isErrFound?
                                <p style={{color:'red',marginLeft:'25%'}}>{errmsg}</p>:<></>
                            }
                    </div>
                </div>
             </div>
        </section>
        </>
}

export default Email
