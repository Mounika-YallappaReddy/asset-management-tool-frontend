import React,{useEffect, useState,useContext} from 'react';
import Card from 'react-bootstrap/Card';
import {CommonContext} from '../App';
import axios from 'axios';

function DashboardCard() {
  let commonContext=useContext(CommonContext);
let [assetsCount,setAssetsCount]=useState()
let [assignedAssetsCount,setAssignedAssetsCount]=useState()
let [unassignedAssetsCount,setUnassignedAssetsCount]=useState()
let [vendorsCount,setVendorsCount]=useState()
let [locationsCount,setLocationsCount]=useState()
let [productsCount,setProductsCount]=useState()
let [employeesCount,setEmployeesCount]=useState()
let [totalAssetsCount,setTotalAssetsCount]=useState()

async function getassetscount(){
  let res=await axios.get(`${commonContext.apiurl}/get-assets-count`)
  if(res.data.statusCode===200){
    setAssetsCount(res.data.assets)
  }
}
async function getassignedassetscount(){
  let res=await axios.get(`${commonContext.apiurl}/get-assigned-assets-count`)
  if(res.data.statusCode===200){
    setAssignedAssetsCount(res.data.assignedassets)
  }
}
async function getunassignedassetscount(){
  let res=await axios.get(`${commonContext.apiurl}/get-unassigned-assets-count`)
  if(res.data.statusCode===200){
    setUnassignedAssetsCount(res.data.unassignedassets)
  }
}
async function getvendorscount(){
  let res=await axios.get(`${commonContext.apiurl}/get-vendor-count`)
  if(res.data.statusCode===200){
    setVendorsCount(res.data.vendors)
  }
}
async function getproductscount(){
  let res=await axios.get(`${commonContext.apiurl}/get-products-count`)
  if(res.data.statusCode===200){
    setProductsCount(res.data.products)
  }
}
async function getemployeescount(){
  let res=await axios.get(`${commonContext.apiurl}/get-employee-count`)
  if(res.data.statusCode===200){
    setEmployeesCount(res.data.employees)
  }
}
async function getlocationscount(){
  let res=await axios.get(`${commonContext.apiurl}/get-locations-count`)
  if(res.data.statusCode===200){
    setLocationsCount(res.data.locations)
  }
}
async function getassetstotalprice(){
  let res=await axios.get(`${commonContext.apiurl}/get-assets-price`)
  if(res.data.statusCode===200){
    console.log(res.data)
    console.log(res.data.assets)
    console.log(res.data.assets[0].TotalPrice)
    setTotalAssetsCount(res.data.assets[0].TotalPrice)
  }
}

useEffect(()=>{
  getassetscount()
  getassignedassetscount()
  getunassignedassetscount()
  getvendorscount()
  getproductscount()
  getemployeescount()
  getlocationscount()
  getassetstotalprice()
},[])
  return <>
  <div className='dashboard-cards'>
                        <div className='container-fluid'>
                          <div className='row'>
                            <Card style={{ width: '18rem',height:'90%',margin:'1%',backgroundColor:'#ffcccc' }}>
                              <Card.Body>
                                <Card.Title>Assets</Card.Title>
                                {/* <Card.Subtitle className="mb-2 text-muted">Count:0</Card.Subtitle> */}
                                <h1 >{assetsCount}</h1>
                              </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem',height:'90%',margin:'1%',backgroundColor:'#ffe0b3' }}>
                              <Card.Body>
                                <Card.Title>Assigned Assets</Card.Title>
                                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                <h1>{assignedAssetsCount}</h1>
                              </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem',height:'90%',margin:'1%',backgroundColor:'#cceeff' }}>
                              <Card.Body>
                                <Card.Title>Unassigned Assets</Card.Title>
                                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                <h1>{unassignedAssetsCount}</h1>
                              </Card.Body>
                            </Card>
                           
                          </div>
                          <div className='row'>
                          <Card style={{ width: '18rem',height:'90%',margin:'1%',backgroundColor:'#ccffcc' }}>
                              <Card.Body>
                                <Card.Title>Vendors</Card.Title>
                                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                <h1>{vendorsCount}</h1>
                              </Card.Body>
                            </Card>
                          <Card style={{ width: '18rem',height:'90%',margin:'1%',backgroundColor:'#ffc6b3' }}>
                              <Card.Body>
                                <Card.Title>Locations</Card.Title>
                                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                <h1>{locationsCount}</h1>
                              </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem',height:'90%',margin:'1%',backgroundColor:'#ffffcc' }}>
                              <Card.Body>
                                <Card.Title>Products</Card.Title>
                                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                <h1>{productsCount}</h1>
                              </Card.Body>
                            </Card>
                            
                          </div>
                          <div className='row'>
                          <Card style={{ width: '18rem',height:'90%',margin:'1%',backgroundColor:'#e5e5cc' }}>
                              <Card.Body>
                                <Card.Title>Employees</Card.Title>
                                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                <h1>{employeesCount}</h1>
                              </Card.Body>
                            </Card>
                            <Card style={{ width: '18rem',height:'90%',margin:'1%',backgroundColor:'#ecc6d9'}}>
                              <Card.Body>
                                <Card.Title>Total Asset Cost</Card.Title>
                                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                                <h1>{totalAssetsCount}</h1>
                              </Card.Body>
                            </Card>
                         
                          </div>
                        </div>
                      </div>
                      </>
}

export default DashboardCard
