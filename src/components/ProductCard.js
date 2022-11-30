import React, { useState,useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {CommonContext} from '../App';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function ProductCard() {
    let commonContext=useContext(CommonContext);


    let [modal, setModal] = useState(false);
    let [list, setList] = useState(true)
    let [detail, setDetail] = useState(false)
    const [isProductDisabled, setIsProductDisabled] = useState(true);

     let [productName,setProductName]=useState("");
     let [vendorName,setVendorName]=useState("");
     let [productType,setProductType]=useState("");
     let [productCategory,setProductCategory]=useState("");
     let [description,setDescription]=useState("");

     let [productCategoryArray,setProductCategoryArray]=useState([])
     let [productTypeArray,setProductTypeArray]=useState([])

     
    let [errmsg,setErrMsg]=useState("")
    let [isErrFound,setIsErrorFound]=useState(false)

     let[productsArray,setProductsArray]=useState([])
     let[productId,setProductId]=useState()
     let [query,setQuery]=useState("") 

    function handleEdit() {
        setList(false)
        setDetail(true)
    }
    function handleSave() {
        setList(true)
        setDetail(false)
    }
    async function fetchCategoryTypes(e){
        
        let res=await axios.get(`${commonContext.apiurl}/get-product-category-array`)
        if(res.data.statusCode===200){
            console.log(res.data)
            console.log('Product categories fetched successfully')
            setProductCategoryArray(res.data.productCatNames)
            // console.log(productCategoryArray);
            
            // const getcountryName=e.target.value;
        //    const getStatedata=countrydata.find(country=>country.country_name===getcountryName).states;
        //    setJsonState(getStatedata)
        }
    }

    

    async function fetchProductTypes(e){
       
        // console.log(productCategory)
        let res=await axios.get(`${commonContext.apiurl}/get-prodtype-by-category/${e}`)
        if(res.data.statusCode===200){
            // console.log(productCategory)
            setProductTypeArray(res.data.productTypes)
            console.log("Product types fetched successfully")
        }
    }
    async function handleAdd() {
        console.log('adding vendor...')
      let res=await axios.post(`${commonContext.apiurl}/add-product`,{
        productCategory,
        productType,
        productName,
        vendorName,
        description
      })
      if(res.data.statusCode===200){
        console.log('Product added successfully')
        fetchProductList()
        setIsErrorFound(false)
        setModal(false)
      }else{
        if(res.data.statusCode===400 || res.data.statusCode===500){
            setIsErrorFound(true)
            setErrMsg(res.data.message)
        }
    }
    }
    async function fetchProductList(){
        let res=await axios.get(`${commonContext.apiurl}/get-products`);
         console.log(res.data)
       if(res.data.statusCode===200){
        console.log('Products Fetched Successfully')
        setProductsArray(res.data.products)
      
    }
    }
    async function handleEditProduct(id){
        console.log(`${commonContext.apiurl}/get-product-by-id/${id}`)
        setList(false)
        setDetail(true)
     let res=await axios.get(`${commonContext.apiurl}/get-product-by-id/${id}`)
      if(res.data.statusCode===200){
        console.log(`product by id fetched`)
        console.log(res.data)
        console.log(res.data.product)
        setProductId(id);
        console.log(id)
        setProductName(res.data.product.productName)
        setVendorName(res.data.product.vendorName)
        setProductType(res.data.product.productType)
        setProductCategory(res.data.product.productCategory)
        setDescription(res.data.product.description)
        // console.log( productName,
        //     productType,
        //     productCategory,
        //     vendorName,
        //     description)
      }
    }
//-------

    //edit product by id
async function handleDetailSave(){
    // console.log(`submitting edited data.......`)
    // console.log(`${commonContext.apiurl}/edit-vendor/${vendorId}`)
    let res=await axios.put(`${commonContext.apiurl}/edit-product/${productId}`,{
        productName,
        productType,
        productCategory,
        vendorName,
        description
 })
   
    if(res.data.statusCode===200){
        console.log('Details edited successfully');
      }
}
//delete vendor by id
async function handleDeleteProduct(id){
    var deleteOne = window.confirm('Are u sure to delete??');
    if(deleteOne){
    let res=await axios.delete(`${commonContext.apiurl}/delete-product/${id}`)
    if(res.data.statusCode===200){
        console.log('deleted succcessfully')
        fetchProductList()
    }
}
}
function handleBack(){
    fetchProductList()
}
    useEffect(()=>{
        fetchCategoryTypes();
        fetchProductList()
    },[])
    return <>
        <div className='vendorCard'>
            <div className='container-fluid'>
                {
                    list ?
                        <div className='row d-flex'>

                            <div className='vendor-header'>
                                <Button onClick={() => { setModal(true) }}>ADD PRODUCT</Button>
                            </div>
                            <div className='vendor-body'>
                                <Modal show={modal} onHide={() => { setModal(false) }} size='lg' id='add-vendor-modal'>
                                    <Modal.Header id='add-vendor-header' closeButton>
                                        <Modal.Title id='add-vendor-title'>Add Product</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form className='d-flex justify-content-around flex-wrap'>
                                            <Form.Group className="mb-3 col-10" controlId="formBasicCategory">
                                                <Form.Label>Product Category</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Select onChange={(e)=>{setProductCategory(e.target.value);fetchProductTypes(e.target.value)}}>
                                                <option>--Select Product Category--</option>
                                                    {
                                                        productCategoryArray.map((e,i)=>{
                                                          return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-10">
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
                                            <Form.Group className="mb-3 col-10" controlId="formBasicName">
                                                <Form.Label>Product Name</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e)=>{setProductName(e.target.value);console.log(productName)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-10" controlId="formBasicvendor">
                                                <Form.Label>Vendor</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e)=>{setVendorName(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-1 col-10">
                                                 <Form.Label>Description</Form.Label>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-10">
                                            <FloatingLabel controlId="floatingTextarea" className="mb-3 col-12">
                                                <Form.Control as="textarea" onChange={(e)=>{setDescription(e.target.value)}}/>
                                            </FloatingLabel>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setModal(false) }}>Close</Button>
                                        <Button variant="primary" onClick={() => { handleAdd() }}>Save</Button>
                                    </Modal.Footer>
                                    {
                                isErrFound?
                                
                                <p style={{color:'red',marginLeft:'25%'}}>{errmsg}</p>:<></>
                            }
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
                                                    <th>S.No</th>
                                                    <th>Product Name</th>
                                                    <th>Product Type</th>
                                                    <th>Product Category</th>
                                                   
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               
                                                 {
                                                    // productsArray.map((e,i)=>{
                                                        productsArray.filter((user)=>
                                                        user.productName.toLowerCase().includes(query) ||
                                                        user.productType.toLowerCase().includes(query) ||
                                                        user.productCategory.toLowerCase().includes(query) 
                                                        
                                                        ).map((e,i)=>{
                                                      return <tr key={i}>
                                                     <td>{i+1}</td>
                                                    <td>{e.productName}</td>
                                                    <td>{e.productType}</td>
                                                    <td>{e.productCategory}</td>
                                                    
                                                    <td className='d-flex' >
                                                        {/* <Button onClick={() => {handleEditProduct(e._id)}}>edit</Button>
                                                        <Button onClick={() => {handleDeleteProduct(e._id)}}>delete</Button> */}
                                                         <EditIcon onClick={() => {handleEditProduct(e._id)}} id='icon-edit-styling' style={{'color':'black','marginRight':'5px'}}/>
                                                        <DeleteIcon onClick={() => {handleDeleteProduct(e._id)}} style={{'color':'red'}}/>
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
                    detail ?
                        <div className='row d-flex'>
                            <div className='vendor-detail-header'>
                                <h1>Product Detail</h1>
                            </div>
                            <div className='vendor-detail-body'>
                                <div className='d-flex vendor-detail-button justify-content-start'>
                                    <Button onClick={() => { handleSave();handleBack() }}>Back to List</Button>
                                    {
                                        isProductDisabled?
                                    <Button id='edit-btn' onClick={() => { setIsProductDisabled(false) }}>Edit</Button>:<></>
}
                                </div>

                                <div className='container-fluid'>
                                    <div className='row'>
                                        
                                        <Form className='d-flex justify-content-around flex-wrap'>
                                            <Form.Group className="mb-3 col-9" controlId="formBasicCategory">
                                                <Form.Label>Product Category</Form.Label>
                                                <option>--Select Product Category--</option>
                                                <Form.Select value={productCategory} disabled={isProductDisabled}  onChange={(e)=>{setProductCategory(e.target.value)}}>
                                                {
                                                        productCategoryArray.map((e,i)=>{
                                                          return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-9">
                                                <Form.Label>Product Type</Form.Label>
                                                <option>--Select Product Type--</option>
                                                <Form.Select value={productType} disabled={isProductDisabled} onChange={(e)=>{setProductType(e.target.value)}}>
                                                {
                                                        productTypeArray.map((e,i)=>{
                                                          return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-9" controlId="formBasicProduct">
                                                <Form.Label>Product Name</Form.Label>
                                                <Form.Control type="text" value={productName} disabled={isProductDisabled} onChange={(e)=>{setProductName(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-9" controlId="formBasicVendor">
                                                <Form.Label>Vendor</Form.Label>
                                                <Form.Control type="text" value={vendorName} disabled={isProductDisabled} onChange={(e)=>{setVendorName(e.target.value)}}/>
                                            </Form.Group>
                                            <Form.Group className="mb-1 col-9">
                                                 <Form.Label>Description</Form.Label>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-9">
                                            <FloatingLabel controlId="floatingTextarea" className="mb-3 col-12">
                                                <Form.Control as="textarea" value={description} disabled={isProductDisabled}  onChange={(e)=>{setDescription(e.target.value)}}/>
                                            </FloatingLabel>
                                            </Form.Group>
                                             {
                                                isProductDisabled?
                                                <></>:
                                                <Form.Group className='mb-2 col-5'>
                                                    <Button onClick={()=>{setIsProductDisabled(true);handleDetailSave()}} id='product-save-btn' >Save</Button>
                                                </Form.Group>
                                             }
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div> : <></>
                }
            </div>
        </div>
    </>
}

export default ProductCard
