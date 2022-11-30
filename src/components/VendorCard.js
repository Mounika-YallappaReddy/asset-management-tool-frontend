import React, { useState,useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import countrydata from './CountryData.json';
import {CommonContext} from '../App';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function VendorCard() {
    let commonContext=useContext(CommonContext);
 
    // let [editbtndisabled,seteditbtndisabled]=useState(false)

    let [modal, setModal] = useState(false);
    let [list, setList] = useState(true)
    let [detail, setDetail] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true);
    
    //Vendor data 
    
      let [vendorName,setVendorName]=useState("");
      let [vendorEmail,setVendorEmail]=useState("")
      let [vendorMobile,setVendorMobile]=useState("")
      let [contactPerson,setContactPerson]=useState("")
      let [designation,setDesignation]=useState("") 
      let [country,setCountry]=useState("")  
      let [state,setState]=useState("")  
      let [city,setCity]=useState("") 
      let [pincode,setPincode]=useState("") 
      let [address,setAddress]=useState("")
      let [description,setDescription]=useState("")
      
      
    let [errmsg,setErrMsg]=useState("")
    let [isErrFound,setIsErrorFound]=useState(false)

       let [vendorsArray,setVendorsArray]=useState([]);
       let [vendorId,setVendorId]=useState()
    // const [countryId,setCountryId]=useState('');
    const [JsonState,setJsonState]=useState([])
    // const [stateId,setStateId]=useState('');
    // console.log(countrydata.country_name)

   //vendor edited detail data
   let [detailData,setDetailData]=useState({
    vendorName,
    vendorEmail,
    vendorMobile,
    contactPerson,
    designation,
    country,
    state,
    city,
    pincode,
    address,
    description
   })
   let [detailvendorName,setDetailVendorName]=useState("");
      let [detailvendorEmail,setDetailVendorEmail]=useState("")
      let [detailvendorMobile,setDetailVendorMobile]=useState("")
      let [detailcontactPerson,setDetailContactPerson]=useState("")
      let [detaildesignation,setDetailDesignation]=useState("") 
      let [detailcountry,setDetailCountry]=useState("")  
      let [detailstate,setDetailState]=useState("")  
      let [detailcity,setDetailCity]=useState("") 
      let [detailpincode,setDetailPincode]=useState("") 
      let [detailaddress,setDetailAddress]=useState("")
      let [detaildescription,setDetailDescription]=useState("")

      let [query,setQuery]=useState("")

    function handleEdit() {
        setList(false)
        setDetail(true)
    }
    function handleSave(){
        setList(true)
        setDetail(false)
    }
    const handleCountry=(e)=>{
        setCountry(e.target.value)
           const getcountryName=e.target.value;
           const getStatedata=countrydata.find(country=>country.country_name===getcountryName).states;
           setJsonState(getStatedata)

    }

//get vendors list
async function getVendorsList(){
    
    let res=await axios.get(`${commonContext.apiurl}/get-vendor`);
    console.log(res.data)
   if(res.data.statusCode===200){
        console.log('Vendors Fetched Successfully')
        setVendorsArray(res.data.vendors)
        console.log(vendorsArray)
    }
}   
useEffect(()=>{
getVendorsList()
},[])
//Add vendor
async function handleAddVendor(){
    console.log('adding vendor...')
    console.log(vendorName,
        vendorEmail,
        vendorMobile,
        contactPerson,
        designation,
        country,
        state,
        city,
        pincode,     
        address,
        description)
    let res=await axios.post(`${commonContext.apiurl}/add-vendor`,{
        vendorName,
        vendorEmail,
        vendorMobile,
        contactPerson,
        designation,
        country,
        state,
        city,
        pincode,     
        address,
        description
        })
      if(res.data.statusCode===200){
        // navigate('/login')
        console.log('Vendor added from front edd')
        getVendorsList()
        setIsErrorFound(false)
        setModal(false)
      }else{
        if(res.data.statusCode===400 || res.data.statusCode===500){
            setIsErrorFound(true)
            setErrMsg(res.data.message)
        }
    }
 }
//get vendor by id
async function handleEditVendor(id){
  
    // setVendorId(id)
    console.log(`${commonContext.apiurl}/get-vendor-by-id/${id}`)
    setList(false)
    setDetail(true)
    let res=await axios.get(`${commonContext.apiurl}/get-vendor-by-id/${id}`)
      if(res.data.statusCode===200){
        
        console.log(res.data)
        setVendorId(id);
    
       
        setVendorName(res.data.vendor.vendorName)
        setVendorEmail(res.data.vendor.vendorEmail)
        setVendorMobile(res.data.vendor.vendorMobile)
        setContactPerson(res.data.vendor.contactPerson)
        setDesignation(res.data.vendor.designation)
        setCountry(res.data.vendor.country)
        setState(res.data.vendor.state)
        setCity(res.data.vendor.city)
        setPincode(res.data.vendor.pincode)
        setAddress(res.data.vendor.address)
        setDescription(res.data.vendor.description)
       
       }
} 
//edit vendor by id
async function handleDetailSave(){
    console.log(`submitting edited data.......`)
    console.log(`${commonContext.apiurl}/edit-vendor/${vendorId}`)
    let res=await axios.put(`${commonContext.apiurl}/edit-vendor/${vendorId}`,{
      
        vendorName,
        vendorEmail,
        vendorMobile,
       contactPerson,
        designation,
        country,
       state,
        city,
        pincode,
        address,
        description
 

    })
   
    if(res.data.statusCode===200){
        console.log('Details edited successfully');
        console.log(detailvendorName);
        console.log(vendorName)
    }
}
//delete vendor by id
async function handleDeleteVendor(id){
    var deleteOne = window.confirm('Are u sure to delete??');
    if(deleteOne){
    let res=await axios.delete(`${commonContext.apiurl}/delete-vendor/${id}`)
    if(res.data.statusCode===200){
        console.log('deleted succcessfully')
        getVendorsList()
    }
}
}
function handleBack(){
    getVendorsList()
}
    return <>
        <div className='vendorCard'>
            <div className='container-fluid'>
                {
                    list ?
                        <div className='row d-flex'>

                            <div className='vendor-header'>
                                <Button onClick={() => { setModal(true) }}>ADD VENDOR</Button>
                            </div>
                            <div className='vendor-body'> 
                                <Modal show={modal} onHide={() => { setModal(false) }} size='lg' id='add-vendor-modal'>
                                    <Modal.Header id='add-vendor-header' closeButton>
                                        <Modal.Title id='add-vendor-title'>Add Vendor</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form className='d-flex justify-content-around flex-wrap'>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicName">
                                                <Form.Label>Vendor</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e)=>{setVendorName(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="email" onChange={(e)=>{setVendorEmail(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicMobile">
                                                <Form.Label>Mobile</Form.Label>
                                                <Form.Control type="number" onChange={(e)=>{setVendorMobile(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicPerson">
                                                <Form.Label>Contact Person</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e)=>{setContactPerson(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicDesignation">
                                                <Form.Label>Designation</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e)=>{setDesignation(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5">
                                                <Form.Label>Country</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Select onChange={(e)=>handleCountry(e)}>
                                                    <option>--Select Country--</option>
                                                    {
                                                      countrydata.map((getcountry,index)=>(
                                                      <option value={getcountry.country_name} key={index}>{getcountry.country_name}</option>
                                                      ))
                                                    }
                                                    
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5">
                                                <Form.Label>State</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Select onChange={(e)=>{setState(e.target.value)}}>
                                                    <option>--Select State--</option>
                                                    {
                                                      JsonState.map((getJsonState,index)=>(
                                                      <option value={getJsonState.state_name} key={index}>{getJsonState.state_name}</option>
                                                      ))
                                                    }
                                                    
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicCity">
                                                <Form.Label>City</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e)=>{setCity(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicPin">
                                                <Form.Label>Zip Code</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="number" onChange={(e)=>{setPincode(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicAddress">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control type="text" onChange={(e)=>{setAddress(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-11" controlId="formBasicDescription">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control type="text" onChange={(e)=>{setDescription(e.target.value)}}/>
                                            </Form.Group>

                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setModal(false) }}>Close</Button>
                                        <Button variant="primary" onClick={() => { ;handleAddVendor() }}>Save</Button>

                                    </Modal.Footer>
                                    {
                                isErrFound?
                                
                                <p style={{color:'red',marginLeft:'25%'}}>{errmsg}</p>:<></>
                            }
                                </Modal>
                                <div className='vendor-body-header'>
                                    <input type='text' placeholder='Search here....' onChange={(e)=>{setQuery(e.target.value)}}></input>
                                    <button>Search</button>
                                </div>
                                <div className='vendor-body-content'>
                                    <div className='vendors-list'>
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Vendor</th>
                                                    <th>Email</th>
                                                    <th>Contact Person</th>
                                                    <th>Designation</th>
                                                   
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    // vendorsArray.map((e,i)=>{
                                                        vendorsArray.filter((user)=>
                                                        user.vendorName.toLowerCase().includes(query) ||
                                                        user.vendorEmail.toLowerCase().includes(query) ||
                                                        user.contactPerson.toLowerCase().includes(query) ||
                                                        user.designation.toLowerCase().includes(query) 
                                                        ).map((e,i)=>{
                                                      return <tr key={i}>
                                                     <td>{i+1}</td>
                                                    <td>{e.vendorName}</td>
                                                    <td>{e.vendorEmail}</td>
                                                    <td>{e.contactPerson}</td>
                                                    <td>{e.designation}</td>
                                                   
                                                    <td className='d-flex' >
                                                        {/* <Button onClick={() => {handleEditVendor(e._id)}}>edit</Button> */}
                                                        <EditIcon onClick={() => {handleEditVendor(e._id)}} id='icon-edit-styling' style={{'color':'black','marginRight':'5px'}}/>
                                                        <DeleteIcon onClick={() => {handleDeleteVendor(e._id)}} style={{'color':'red'}}/>
                                                        {/* <Button onClick={() => {handleDeleteVendor(e._id)}}>delete</Button> */}
                                                        </td>
                                                      </tr>
                                                    })
                                                }
                                               
                                                
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className='vendors-pagination'></div>
                                </div>
                            </div>

                        </div> : <></>
                }
                {
                    detail?
                <div className='row d-flex'>
                    <div className='vendor-detail-header'>
                        <h1>Vendor  Detail</h1>
                    </div>
                    <div className='vendor-detail-body'>
                        <div className='d-flex vendor-detail-button justify-content-start'>
                        <Button onClick={() => { handleSave();handleBack() }}>Back to List</Button>
                        {
                            isDisabled?

                        <Button id='edit-btn' onClick={()=>{setIsDisabled(false)}}>Edit</Button>:<></>
}
                        </div>
                        
                        <div className='container-fluid'>
                            <div className='row'>
                                <Form>
                                    <div className='form-row d-flex justify-content-around'>
                                        <Form.Group className=" col-lg-3" controlId="formBasicName">
                                            <Form.Label>Vendor</Form.Label>
                                            <Form.Control type="text" value={vendorName} disabled={isDisabled} onChange={(e)=>{setVendorName(e.target.value)}}/>
                                        </Form.Group>
                                        <Form.Group className="col-lg-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" value={vendorEmail} disabled={isDisabled} onChange={(e)=>{setVendorEmail(e.target.value)}}/>
                                        </Form.Group>
                                        <Form.Group className=" col-lg-3" controlId="formBasicMobile">
                                            <Form.Label>Mobile</Form.Label>
                                            <Form.Control type="number" value={vendorMobile} disabled={isDisabled} onChange={(e)=>{setVendorMobile(e.target.value)}}/>
                                        </Form.Group>
                                    </div>
                                    <div className='form-row d-flex justify-content-around'>
                                    <Form.Group className=" col-lg-3" controlId="formBasiccontactPerson">
                                                <Form.Label>Contact Person</Form.Label>
                                                <Form.Control type="text" value={contactPerson} disabled={isDisabled} onChange={(e)=>{setContactPerson(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-lg-3" controlId="formBasicDesignation">
                                                <Form.Label>Designation</Form.Label>
                                                <Form.Control type="text"  value={designation} disabled={isDisabled} onChange={(e)=>{setDesignation(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-lg-3">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Select value={country} disabled={isDisabled} onChange={(e)=>{setCountry(e.target.value)}}>
                                                    <option>India</option>
                                                </Form.Select>
                                            </Form.Group>
                                    </div>
                                    <div className='form-row d-flex justify-content-around'>
                                    <Form.Group className="mb-3 col-lg-3">
                                                <Form.Label>State</Form.Label>
                                                <Form.Select value={state} disabled={isDisabled} onChange={(e)=>{setState(e.target.value)}}>
                                                    <option>Andhra Pradesh</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-lg-3">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control type="text" value={city} disabled={isDisabled} onChange={(e)=>{setCity(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-lg-3" controlId="formBasicPin">
                                                <Form.Label>Zip Code</Form.Label>
                                                <Form.Control type="text" value={pincode} disabled={isDisabled} onChange={(e)=>{setPincode(e.target.value)}}/>
                                            </Form.Group>
                                    </div>
                                    <div className='form-row d-flex flex-start'>
                                    <Form.Group className="mb-3 col-lg-3 form-margin" controlId="formBasicAddress">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control type="text" value={address} disabled={isDisabled} onChange={(e)=>{setAddress(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-lg-3 form-margin-new" controlId="formBasicDescription">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control type="text" value={description} disabled={isDisabled} onChange={(e)=>{setDescription(e.target.value)}}/>
                                            </Form.Group>
                                    </div>
                                    {
                                        isDisabled?
                                        <></>:
                                        <button onClick={()=>{setIsDisabled(true);handleDetailSave()}} id='save-btn'>Save</button>
                                    }
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>:<></>
}
            </div>
        </div>
    </>
}

export default VendorCard
