import React, { useState,useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import countrydata from './CountryData.json';
import {CommonContext} from '../App';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function AssetCard(props) {
    let commonContext=useContext(CommonContext);

    let [list, setList] = useState(false)
    let [detail, setDetail] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false);
    let [modal, setModal] = useState(false);
    let [addAsset,setAddAsset]=useState(false);
    let [assignedAssets,setAssignedAssets]=useState(false)
    let [assetAssignedStatus,setAssetAssignedStatus]=useState(true)
    
    let [query,setQuery]=useState("")

    let [assetName,setAssetName]=useState("")
    let [productName,setProductName]=useState("")
    let [productType,setProductType]=useState("")
    let [productCategory,setProductCategory]=useState("")
    let [vendorName,setVendorName]=useState("")
    let [serialNumber,setSerialNumber]=useState("")
    let [price,setPrice]=useState("")
    let [purchaseDate,setPurchaseDate]=useState("")
    let [expiryDate,setExpiryDate]=useState("")
    let [description,setDescription]=useState("")
    let [assignedTo,setAssignedTo]=useState("")
    let [country,setCountry]=useState("")
    let [state,setState]=useState("")

    const [JsonState,setJsonState]=useState([])
     let [productCategoryArray,setProductCategoryArray]=useState([])
     let [productTypeArray,setProductTypeArray]=useState([]);
     let [vendorNamesArray,setVendorNamesArray]=useState([]);
     let [assetsArray,setAssetsArray]=useState([]);
     let [assignedAssetsArray,setAssignedAssetsArray]=useState([]);

     let [assetId,setAssetId]=useState()
    let [assetEmployeeID,setAssetEmployeeID]=useState()
     let [employeesArray,setEmployeesArray]=useState([])

     let [assignColumn,setAssignColumn]=useState(true)

     
    let [errmsg,setErrMsg]=useState("")
    let [isErrFound,setIsErrorFound]=useState(false)

    console.log(props)
    function handleEdit() {
        setList(false)
        setDetail(true)
        props.data(list);
    }
    function handleSave(){
        setList(true)
        setDetail(false)
        props.parentCallback(true);

    }
    function onTrigger(){
        props.parentCallback(false);
        console.log(props);
        setDetail(true)
    }
    function onTriggerBack(){
        props.parentCallback(true);
        console.log(props);
        setDetail(false)
    }
    const handleCountry=(e)=>{
        setCountry(e.target.value)
           const getcountryName=e.target.value;
           const getStatedata=countrydata.find(country=>country.country_name===getcountryName).states;
           setJsonState(getStatedata)

    }
    async function fetchCategoryTypes(e){
        
        let res=await axios.get(`${commonContext.apiurl}/get-product-category-array`)
        if(res.data.statusCode===200){
            console.log(res.data)
            console.log('Product categories fetched successfully')
            setProductCategoryArray(res.data.productCatNames)
          
        }
    }
    async function fetchProductTypes(e){
        console.log('fetch product types function called')
        console.log(e)
        console.log(productCategory)
        // setProductCategory(e.target.value)
        // console.log(productCategory)
        let res=await axios.get(`${commonContext.apiurl}/get-prodtype-by-category/${e}`)
        if(res.data.statusCode===200){
            // console.log(productCategory)
            setProductTypeArray(res.data.productTypes)
            console.log("Product types fetched successfully")
        }
    }
    async function fetchvendorNames(){
        
        let res=await axios.get(`${commonContext.apiurl}/get-vendor-names`)
        if(res.data.statusCode===200){
            console.log(res.data)
            console.log('Vendors fetched successfully')
            setVendorNamesArray(res.data.vendorNames)
          
        }
    }
    async function handleAddAsset(){
        let res=await axios.post(`${commonContext.apiurl}/add-asset`,{
            assetName,
            productName,
            productType,
            productCategory,
            vendorName,
            serialNumber,
            price,
            purchaseDate,
            expiryDate,
            description,
           
            country,
            state,
            })
          if(res.data.statusCode===200){
            // navigate('/login')
            console.log('Asset added from front edd')
         getAssetsList()
         setIsErrorFound(false)
        //  setModal(false)
          }else{
        if(res.data.statusCode===400 || res.data.statusCode===500){
            setIsErrorFound(true)
            setErrMsg(res.data.message)
        }
    }
    }
    async function getAssetsList(){
    
        let res=await axios.get(`${commonContext.apiurl}/get-all-assets`);
        console.log(res.data)
       if(res.data.statusCode===200){
            console.log('Assets Fetched Successfully')
            setAssetsArray(res.data.users)
           
        }
    }
 
    async function handleEditAsset(id){
  
        // setVendorId(id)
        console.log(`${commonContext.apiurl}/get-asset-by-id/${id}`)
        setList(false)
        setDetail(true)
        let res=await axios.get(`${commonContext.apiurl}/get-asset-by-id/${id}`)
          if(res.data.statusCode===200){
            
            console.log(res.data)
            setAssetId(id);
        
           
            setAssetName(res.data.assets.assetName)
            setProductName(res.data.assets.productName)
            setProductType(res.data.assets.productType)
            setProductCategory(res.data.assets.productCategory)
            setCountry(res.data.assets.country)
            setState(res.data.assets.state)
            setSerialNumber(res.data.assets.serialNumber)
            setPrice(res.data.assets.price)
            setPurchaseDate(res.data.assets.purchaseDate)
            setExpiryDate(res.data.assets.expiryDate)
            setAssignedTo(res.data.assets.assignedTo)
            setDescription(res.data.assets.description)
           
           }
    } 
    async function handleDetailSave(){
        console.log(`submitting edited data.......`)
        console.log(`${commonContext.apiurl}/edit-asset/${assetId}`)
        let res=await axios.put(`${commonContext.apiurl}/edit-asset/${assetId}`,{
          assetName,
          productName,
          productType,
          productCategory,
          vendorName,
          serialNumber,
          price,
          purchaseDate,
          expiryDate,
          description,
          assignedTo,
          country,
          state
        })
       
        if(res.data.statusCode===200){
            console.log('Details edited successfully');
            
        }
    }
    async function getAssignedAssetsList(){
    
        let res=await axios.get(`${commonContext.apiurl}/get-assigned-assets`);
        console.log(res.data)
       if(res.data.statusCode===200){
            console.log('Assets Fetched Successfully')
            setAssignedAssetsArray(res.data.assignedassets)
           
        }
    }
    async function getEmployeesbyState(id){
        console.log(id)
        console.log(`get employees by state function called`)
        // setAssetEmployeeID(id)
        let res=await axios.get(`${commonContext.apiurl}/get-employee-by-state/${id}`)
        if(res.data.statusCode===200){
            setEmployeesArray(res.data.employeeNames)
            console.log('EMployees by state fetchd successfully')
        }
    }
    async function getAssetID(id){
        setAssetEmployeeID(id)
    }
    async function handleEditEmployeeAsset(){
  console.log(`${commonContext.apiurl}/re-assign-asset/${assetEmployeeID}`)
        
        let res=await axios.put(`${commonContext.apiurl}/re-assign-asset/${assetEmployeeID}`,{
            assignedTo
        })
          if(res.data.statusCode===200){
            getAssignedAssetsList()
         
         getAssetsList()
         
           
           }
    } 
    //delete vendor by id
    async function handleDeleteAsset(id){
        var undoAsset = window.confirm('Are u sure to delete??');
        if (undoAsset) {
            let res=await axios.put(`${commonContext.apiurl}/delete-asset/${id}`)
        if(res.data.statusCode===200){
            console.log('deleted succcessfully')
            getAssetsList();
        }
            }
        }
       
    function handleBack(){
        getAssetsList();
    }
   
    useEffect(()=>{
        fetchCategoryTypes();
        fetchvendorNames();
        getAssetsList();
        getAssignedAssetsList()
        
    },[])
  return <>
   <div className='vendorCard'>
            <div className='container-fluid'>
                {
                    props.data.list?
                        <div className='row d-flex'>

                            <div className='vendor-header'>
                                {/* <Button onClick={() => { setModal(true) }}>ADD VENDOR</Button> */}
                                <h1 className='asset-header-list'>Assets List</h1>
                            </div>
                            <div className='vendor-body'>
                                <Modal show={modal} onHide={() => { setModal(false) }} size='lg' id='add-vendor-modal'>
                                    <Modal.Header id='add-vendor-header' closeButton>
                                        <Modal.Title id='add-vendor-title'>Assign Asset</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form className='d-flex justify-content-around flex-wrap'>
                                            
                                            <Form.Group className="mb-3 col-5">
                                                <Form.Label>Employees</Form.Label>
                                                <Form.Select onChange={(e)=>{setAssignedTo(e.target.value)}}>
                                                    <option>--Select Employee--</option>
                                                    {
                                                        employeesArray.map((e,i)=>{
                                                            return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                    
                                                    <option>Premika</option>
                                                    <option>Mounika</option>
                                                </Form.Select>
                                            </Form.Group>
                                           

                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setModal(false) }}>Close</Button>
                                        <Button variant="primary" onClick={() => { setModal(false);handleEditEmployeeAsset() }}>Save</Button>
                                    </Modal.Footer>
                                </Modal>
                                <div className='vendor-body-header'>
                                    <input type='text' placeholder='Search here...' onChange={(e)=>{setQuery(e.target.value)}}></input>
                                    <button>Search</button>
                                </div>
                                <div className='vendor-body-content'>
                                    <div className='vendors-list'>
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Asset Name</th>
                                                    <th>Product Type</th>
                                                    <th>Product</th>
                                                    <th>Vendor</th>
                                                    <th>Assigned To</th>
                                                    {
                                                    assignColumn ?
                                                    <th>Assign</th>:<></>
                                                    }
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               
                                                {
                                                //    assetsArray.map((e,i)=>{
                                                    assetsArray.filter((user)=>
                                                    user.assetName.toLowerCase().includes(query) ||
                                                    user.productType.toLowerCase().includes(query) ||
                                                    user.productName.toLowerCase().includes(query) ||
                                                    user.vendorName.toLowerCase().includes(query) 
                                                    // user.assignedTo.toLowerCase().includes(query) 
                                                    ).map((e,i)=>{
                                                      return <tr key={i}>
                                                     <td>{i+1}</td>
                                                    <td>{e.assetName}</td>
                                                    <td>{e.productType}</td>
                                                    <td>{e.productName}</td>
                                                    <td>{e.vendorName}</td>
                                                    <td>{e.assignedTo}</td>
                                                    { 
                                                    assignColumn?
                                                    <td onClick={() => { setModal(true);getEmployeesbyState(e.state);getAssetID(e._id); }}>Assign</td>:<></>
                                                   }
                                                    <td className='d-flex' >
                                                        {/* <Button onClick={() => {onTrigger();handleEditAsset(e._id)}}>edit</Button>
                                                        <Button onClick={() => {handleDeleteAsset(e._id)}}>delete</Button> */}
                                                        
                                                        <EditIcon onClick={() => {onTrigger();handleEditAsset(e._id)}} id='icon-edit-styling' style={{'color':'black','marginRight':'5px'}}/>
                                                        <DeleteIcon onClick={() => {handleDeleteAsset(e._id)}} style={{'color':'red'}}/>
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
                        <h1>Asset Detail</h1>
                    </div>
                    <div className='vendor-detail-body'>
                        <div className='d-flex vendor-detail-button justify-content-start'>
                        <Button onClick={() => { onTriggerBack();handleBack() }}>Back to List</Button>
                        {
                            isDisabled?
                        <Button id='edit-btn' onClick={()=>{setIsDisabled(false)}}>Edit</Button>:<></>
                          }
                        </div>
                        
                        <div className='container-fluid'>
                            <div className='row'>
                                <Form>
                                    <div className='form-row d-flex justify-content-around'>
                                    <Form.Group className="mb-3 col-lg-3">
                                                <Form.Label>Product Category</Form.Label>
                                                <Form.Select value={productCategory} disabled={isDisabled} onChange={(e)=>{fetchProductTypes(e);setProductCategory(e.target.value)}}>
                                                    {
                                                        productCategoryArray.map((e,i)=>{
                                                          return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-lg-3">
                                                <Form.Label>Product Type</Form.Label>
                                                <Form.Select value={productType} disabled={isDisabled} onChange={(e)=>{setProductType(e.target.value)}}>
                                                {
                                                        productTypeArray.map((e,i)=>{
                                                          return <option value={e} key={i}>{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className=" col-lg-3" controlId="formBasicPerson">
                                                <Form.Label>Product</Form.Label>
                                                <Form.Control type="text" value={productName} disabled={isDisabled} onChange={(e)=>{setProductName(e.target.value)}}/>
                                            </Form.Group>
                                           
                                    </div>
                                    <div className='form-row d-flex justify-content-around'>
                                    <Form.Group className="mb-3 col-lg-3">
                                                <Form.Label>Vendor</Form.Label>
                                                <Form.Select value={vendorName} disabled={isDisabled} onChange={(e)=>{setVendorName(e.target.value)}}>
                                                    {
                                                        vendorNamesArray.map((e,i)=>{
                                                          return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-lg-3">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Select value={country} disabled={isDisabled} onChange={(e)=>handleCountry(e)}>
                                                    <option>--Select Country--</option>
                                                    {
                                                      countrydata.map((getcountry,index)=>(
                                                      <option value={getcountry.country_name} key={index}>{getcountry.country_name}</option>
                                                      ))
                                                    }
                                                    
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className=" col-lg-3" controlId="formBasicPerson">
                                                <Form.Label>State</Form.Label>
                                               
                                                <Form.Select value={state} disabled={isDisabled}  onChange={(e)=>{setState(e.target.value)}}>
                                                    <option>--Select State--</option>
                                                    {
                                                      JsonState.map((getJsonState,index)=>(
                                                      <option value={getJsonState.state_name} key={index}>{getJsonState.state_name}</option>
                                                      ))
                                                    }
                                                    
                                                </Form.Select>
                                            </Form.Group>
                                            
                                            
                                    </div>
                                    <div className='form-row d-flex justify-content-around'>
                                    <Form.Group className=" col-lg-3" controlId="formBasicPerson">
                                                <Form.Label>Asset Name</Form.Label>
                                                <Form.Control type="text" value={assetName} disabled={isDisabled} onChange={(e)=>{setAssetName(e.target.value)}}/>
                                            </Form.Group>
                                    <Form.Group className=" col-lg-3" controlId="formBasicPerson">
                                                <Form.Label>Seial Number</Form.Label>
                                                <Form.Control type="text" value={serialNumber} disabled={isDisabled} onChange={(e)=>{setSerialNumber(e.target.value)}}/>
                                            </Form.Group>
                                   
                                    <Form.Group className=" col-lg-3" controlId="formBasicPerson">
                                                <Form.Label>Price</Form.Label>
                                                <Form.Control type="text" value={price} disabled={isDisabled} onChange={(e)=>{setPrice(e.target.value)}}/>
                                            </Form.Group>
                                           
                                            
                                    </div>
                                    <div className='form-row d-flex justify-content-around'>
                                    <Form.Group className="mb-3 col-lg-3" controlId="formBasicDesignation">
                                                <Form.Label>Purchase Date</Form.Label>
                                                <Form.Control type="date" value={purchaseDate} disabled={isDisabled} onChange={(e)=>{setPurchaseDate(e.target.value)}}/>
                                            </Form.Group>
                                    <Form.Group className="mb-3 col-lg-3" controlId="formBasicDesignation">
                                                <Form.Label>Expiry Date</Form.Label>
                                                <Form.Control type="date" value={expiryDate} disabled={isDisabled} onChange={(e)=>{setExpiryDate(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-1 col-lg-3">
                                                 <Form.Label>Description</Form.Label>
                                                 <FloatingLabel controlId="floatingTextarea" className="mb-3 col-12">
                                                <Form.Control as="textarea" value={description} disabled={isDisabled} onChange={(e)=>{setDescription(e.target.value)}}/>
                                            </FloatingLabel>
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
                {
                    props.data.add? <div className='row d-flex'>
                    <div className='vendor-detail-header'>
                        <h1>Add Asset</h1>
                    </div>
                    <div className='vendor-detail-body'>
                        {/* <div className='d-flex vendor-detail-button justify-content-start'>
                        <Button onClick={() => { handleSave() }}>Back to List</Button>
                        <Button id='edit-btn' onClick={()=>{setIsDisabled(false)}}>Edit</Button>
                        </div> */}
                        
                        <div className='container-fluid'>
                            <div className='row'>
                                <Form>
                                    <div className='form-row d-flex justify-content-around'>
                                    <Form.Group className="mb-3 col-lg-3">
                                                <Form.Label>Product Category</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Select onChange={(e)=>{setProductCategory(e.target.value);fetchProductTypes(e.target.value)}}>
                                                    <option>--Select category--</option>
                                                    {
                                                        productCategoryArray.map((e,i)=>{
                                                          return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-lg-3">
                                                <Form.Label>Product Type</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Select onChange={(e)=>{setProductType(e.target.value)}}>
                                                <option>--Select Product Type--</option>
                                                {
                                                        productTypeArray.map((e,i)=>{
                                                          return <option value={e} key={i}>{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className=" col-lg-3" controlId="formBasicPerson">
                                                <Form.Label>Product</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e)=>{setProductName(e.target.value)}}/>
                                            </Form.Group>
                                           
                                    </div>
                                    <div className='form-row d-flex justify-content-around'>
                                    <Form.Group className="mb-3 col-lg-3">
                                                <Form.Label>Vendor</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Select onChange={(e)=>{setVendorName(e.target.value)}}>
                                                <option>--Select Vendor--</option>
                                                    {
                                                        vendorNamesArray.map((e,i)=>{
                                                          return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-lg-3">
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
                                            <Form.Group className=" col-lg-3" controlId="formBasicPerson">
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
                                           
                                    </div>
                                    <div className='form-row d-flex justify-content-around'>
                                    
                                            <Form.Group className=" col-lg-3" controlId="formBasicPerson">
                                                <Form.Label>Asset Name</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e)=>{setAssetName(e.target.value)}}/>
                                            </Form.Group>
                                    <Form.Group className=" col-lg-3" controlId="formBasicPerson">
                                                <Form.Label>Seial Number</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e)=>{setSerialNumber(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className=" col-lg-3" controlId="formBasicPerson">
                                                <Form.Label>Price</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e)=>{setPrice(e.target.value)}}/>
                                            </Form.Group>
                                            
                                    </div>
                                    <div className='form-row d-flex justify-content-around'>
                                    
                                            <Form.Group className="mb-3 col-lg-3" controlId="formBasicDesignation">
                                                <Form.Label>Purchase Date</Form.Label>
                                                <Form.Control type="date" onChange={(e)=>{setPurchaseDate(e.target.value)}}/>
                                            </Form.Group>
                                           <Form.Group className="mb-3 col-lg-3" controlId="formBasicDesignation">
                                                <Form.Label>Expiry Date</Form.Label>
                                                <Form.Control type="date" onChange={(e)=>{setExpiryDate(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-1 col-lg-3">
                                                 <Form.Label>Description</Form.Label>
                                                 <FloatingLabel controlId="floatingTextarea" className="mb-3 col-12">
                                                <Form.Control as="textarea" onChange={(e)=>{setDescription(e.target.value)}}/>
                                            </FloatingLabel>
                                            </Form.Group>
                                            
                                    </div>
                                    
                                  <button onClick={() => { handleSave();handleAddAsset() }} id='save-btn'>Add</button>
                                  {
                                isErrFound?
                                
                                <p style={{color:'red',marginLeft:'25%'}}>{errmsg}</p>:<></>
                            }
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>:<></>
                }
                {
                    props.data.assigned?
                        <div className='row d-flex'>

                            <div className='vendor-header'>
                                {/* <Button onClick={() => { setModal(true) }}>ADD VENDOR</Button> */}
                                <h1 className='asset-header-list'>Assigned Assets</h1>
                            </div>
                            <div className='vendor-body'>
                                <Modal show={modal} onHide={() => { setModal(false) }} size='lg' id='add-vendor-modal'>
                                    <Modal.Header id='add-vendor-header' closeButton>
                                        <Modal.Title id='add-vendor-title'>Re-Assign Asset</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form className='d-flex justify-content-around flex-wrap'>
                                            
                                            <Form.Group className="mb-3 col-5">
                                                <Form.Label>User</Form.Label>
                                                <Form.Select onChange={(e)=>{setAssignedTo(e.target.value)}}>
                                                    <option>--Select Employee--</option>
                                                    {
                                                        employeesArray.map((e,i)=>{
                                                            return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                    {/* <option>Mounika</option>
                                                    <option>Premika</option> */}
                                                </Form.Select>
                                            </Form.Group>
                                           

                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setModal(false) }}>Close</Button>
                                        <Button variant="primary" onClick={() => { setModal(false);handleEditEmployeeAsset() }}>Save</Button>
                                    </Modal.Footer>
                                </Modal>
                                <div className='vendor-body-header'>
                                    <input type='text' placeholder='Search here...' onChange={(e)=>{setQuery(e.target.value)}}></input>
                                    <button>Search</button>
                                </div>
                                <div className='vendor-body-content'>
                                    <div className='vendors-list'>
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Asset Name</th>
                                                    <th>Product Type</th>
                                                    <th>Product</th>
                                                    <th>Vendor</th>
                                                    
                                                    <th>Assigned To</th>
                                                    <th>Re-Assign</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                              
                                                {
                                                //    assignedAssetsArray.map((e,i)=>{
                                                    assignedAssetsArray.filter((user)=>
                                                    user.assetName.toLowerCase().includes(query) ||
                                                    user.productType.toLowerCase().includes(query) ||
                                                    user.productName.toLowerCase().includes(query) ||
                                                    user.vendorName.toLowerCase().includes(query) 
                                                    ).map((e,i)=>{
                                                      return <tr key={i}>
                                                     <td>{i+1}</td>
                                                    <td>{e.assetName}</td>
                                                    <td>{e.productType}</td>
                                                    <td>{e.productName}</td>
                                                    <td>{e.vendorName}</td>
                                                    <td>{e.assignedTo}</td>
                                                    <td onClick={() => { setModal(true);getEmployeesbyState(e.state);getAssetID(e._id)  }}>Re-assign</td>
                                                    
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
            </div>
        </div>
  </>
}

export default AssetCard
