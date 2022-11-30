import React,{ useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CommonContext } from '../App';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Forgotpass() {
    let commonContext = useContext(CommonContext);
    let navigate=useNavigate();

    let [errmsg,setErrMsg]=useState("")
    let [isErrFound,setIsErrorFound]=useState(false)
   
    let [userPassword,setUserPassword]=useState("");
    let [userConfirmPassword,setUserConfirmPassword]=useState("")

    

    async function handleUpdate(){
        console.log('called')
        let email=localStorage.getItem('userEmail')
        let res = await axios.put(`${commonContext.apiurl}/forgot-passm/${email}`, {
           userPassword,
           userConfirmPassword
         })
         if(res.data.statusCode===200){
            console.log("updated")
            console.log(res.data)
            navigate('/login');
            localStorage.clear()
         }else{
            if(res.data.statusCode===400 || res.data.statusCode===500){
                setIsErrorFound(true)
                setErrMsg(res.data.message)
            }
        }
    }

  return <>
  <section className='email-page forgot-page'>
  <div className='container-fluid d-flex justify-content-center align-items-center'>
     <div className='row d-flex justify-content-center'>
         <div className='col-sm-9 col-md-6 col-lg-4 email-form'>
             <Form>
             <Form.Group>
                 <h1 >AMT</h1>
                 <h2>Reset password</h2>
                 <p>Enter your new password below,we're just being extra safe</p>
             </Form.Group>
             <Form.Group className="mb-3" controlId="formBasicPassword">
                     <Form.Control type="password" placeholder="Enter Password" onChange={(e)=>{setUserPassword(e.target.value)}}/>
             </Form.Group>

             <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                     <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>{setUserConfirmPassword(e.target.value)}}/>
             </Form.Group>

             <Button variant="primary" onClick={()=>{handleUpdate()}} className='email-btn'>UPDATE</Button>
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

export default Forgotpass
