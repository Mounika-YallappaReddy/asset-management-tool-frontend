import React, { useState ,useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import DashboardCard from './DashboardCard';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import VendorCard from './VendorCard';
import ProductCard from './ProductCard';
import AssetCard from './AssetCard';
import ReportCard from './ReportCard';
import AdminCard from './AdminCard';
import RestoreAsset from './RestoreAsset';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import LaptopIcon from '@mui/icons-material/Laptop';
import AddIcon from '@mui/icons-material/Add';
import {CommonContext} from '../App';
import axios from 'axios';

function DashboardNew() {
  let commonContext=useContext(CommonContext);
  let navigate=useNavigate()

  let [dashboardComp, setDashboardComp] = useState(true)
  let [vendorComp, setVendorComp] = useState(false)
  let [productComp, setProductComp] = useState(false)
  // let [assetComp, setAssetComp] = useState(false);
  let [list,setList]=useState(true)
  let [reportComp,setReportComp]=useState(false);
  let [adminComp,setAdminComp]=useState(false);
  let [restoreComp,setRestoreComp]=useState(false);

 let [adminDisable,setAdminDisable]=useState(false)
 let [assetDisable,setAssetDisable]=useState(false)

 let [userFirstName,setUserFirstName]=useState("")
 let [userLastName,setUserLastName]=useState("")

  let [data,setData]=useState({
    add:false,
    list:false,
    assigned:false
  })
  let [admin,setAdmin]=useState({
    location:false,
    manager:false,
    employee:false,
    department:false,
    productType:false
  })
  let handleCallback = (childData) =>{
    setData({list: childData})
}
let adminlocationCallback = (childData) =>{
  setAdmin({location: childData})
}
let adminmanagerCallback = (childData) =>{
  setAdmin({manager: childData})
}
let adminemployeeCallback = (childData) =>{
  setAdmin({employee:childData})
}
let admindepartmentCallback = (childData) =>{
  setAdmin({department: childData})
}
let adminproducttypeCallback = (childData) =>{
  setAdmin({productType: childData})
}

 function handleLogout(){
  navigate('/login')
  localStorage.clear()
 }

 async function getUserDetails(){
    let userEmail=localStorage.getItem('userEmail')
  let res=await axios.post(`${commonContext.apiurl}/get-users/${userEmail}`);
  console.log(res.data)
 if(res.data.statusCode===200){
      console.log('employee details Fetched Successfully')
      setUserFirstName(res.data.users.userFirstName)
      setUserLastName(res.data.users.userLastName)
      console.log(res.data.users.userFirstName)
  }
}

useEffect(()=>{
  getUserDetails()
},[])

  return <>
    <section className='dashboardNew'>
      <div className='container-fluid'>
        <div className='row d-flex'>
          <div className='left-nav col-2'>
            <h1>AMT</h1>
            <ul>
              <li onClick={() => { setVendorComp(false); setProductComp(false);setList(false); setDashboardComp(true);setReportComp(false);setAdminComp(false);setRestoreComp(false) }}><HomeIcon className='home-icon'/>Dashboard</li>
              <li onClick={() => { setVendorComp(true); setProductComp(false);setList(false); setDashboardComp(false);setReportComp(false);setAdminComp(false);setRestoreComp(false) }}><PeopleIcon className='home-icon'/>Vendors</li>
              <li onClick={() => {  setDashboardComp(false); setVendorComp(false) ;setList(false);setProductComp(true);setReportComp(false);setAdminComp(false);setRestoreComp(false)}}><LaptopIcon className='home-icon'/>Products</li>
              <li className='assets-dropdown'><SettingsIcon className='home-icon'/>Assets
              { 
                assetDisable?
              <RemoveIcon className='add-icon' onClick={()=>{setAssetDisable(!assetDisable);setList(true);setDashboardComp(false); setVendorComp(false) ;setData({add:false,list:true,assigned:false});setProductComp(false);setReportComp(false);setAdminComp(false);setRestoreComp(false)}}/>:
              <AddIcon className='add-icon' onClick={()=>{setAssetDisable(!assetDisable);setList(true);setDashboardComp(false); setVendorComp(false) ;setData({add:false,list:true,assigned:false});setProductComp(false);setReportComp(false);setAdminComp(false);setRestoreComp(false)}}/>
}
              </li>
              {
                assetDisable?
              <div className='assets'>
                <ul>
                  <li  onClick={() => {  setDashboardComp(false); setVendorComp(false) ;setList(true);setProductComp(false);setReportComp(false);setAdminComp(false);setRestoreComp(false);setData({add:true,list:false,assigned:false})}}>Add</li>
                  <li onClick={() => {  setDashboardComp(false); setVendorComp(false) ;setList(true);setProductComp(false);setReportComp(false);setAdminComp(false);setRestoreComp(false);setData({add:false,list:true,assigned:false})}}>List</li>
                  <li onClick={() => {  setDashboardComp(false); setVendorComp(false) ;setList(true);setProductComp(false);setReportComp(false);setAdminComp(false);setRestoreComp(false);setData({add:false,list:false,assigned:true})}}>Assigned Assets</li>
                </ul>
              </div>:<></>
}
              {/* <li  onClick={() => { setVendorComp(false); setProductComp(false);setList(false); setDashboardComp(false);setReportComp(true);setAdminComp(false) ;setRestoreComp(false);}}>Reports</li> */}
              <li><PersonIcon className='home-icon'/>Admin{
                adminDisable?
              <RemoveIcon className='add-icon' onClick={()=>{setAdminDisable(!adminDisable);setList(false);setDashboardComp(false); setVendorComp(false) ;setAdmin({location:true,manager:false,employee:false,department:false,productType:false});setProductComp(false);setReportComp(false);setAdminComp(true);setRestoreComp(false)}}/>:
              <AddIcon className='add-icon' onClick={()=>{setAdminDisable(!adminDisable);setList(false);setDashboardComp(false); setVendorComp(false) ;setAdmin({location:true,manager:false,employee:false,department:false,productType:false});setProductComp(false);setReportComp(false);setAdminComp(true);setRestoreComp(false)}}/>
}
              </li>
              {
                adminDisable?
              <div className='admin'>
                <ul>
                  <li onClick={() => {  setDashboardComp(false); setVendorComp(false) ;setList(false);setProductComp(false);setReportComp(false);setAdminComp(true);setRestoreComp(false);setAdmin({location:true,manager:false,employee:false,department:false,productType:false})}}>Add Location</li>
                  <li onClick={() => {  setDashboardComp(false); setVendorComp(false) ;setList(false);setProductComp(false);setReportComp(false);setAdminComp(true);setRestoreComp(false);setAdmin({location:false,manager:true,employee:false,department:false,productType:false})}}>Managers</li>
                  <li onClick={() => {  setDashboardComp(false); setVendorComp(false) ;setList(false);setProductComp(false);setReportComp(false);setAdminComp(true);setRestoreComp(false);setAdmin({location:false,manager:false,employee:true,department:false,productType:false})}}>Employees</li>
                  <li onClick={() => {  setDashboardComp(false); setVendorComp(false) ;setList(false);setProductComp(false);setReportComp(false);setAdminComp(true);setRestoreComp(false);setAdmin({location:false,manager:false,employee:false,department:true,productType:false})}}>Department</li>
                  <li onClick={() => {  setDashboardComp(false); setVendorComp(false) ;setList(false);setProductComp(false);setReportComp(false);setAdminComp(true);setRestoreComp(false);setAdmin({location:false,manager:false,employee:false,department:false,productType:true})}}>Product Type</li>
                </ul>
              </div>:<></>
}
              {/* <li onClick={() => { setVendorComp(false); setProductComp(false);setList(false); setDashboardComp(false);setReportComp(false);setAdminComp(false);setRestoreComp(false);setFaqComp(true) }}>FAQ</li> */}
              <li onClick={() => { setVendorComp(false); setProductComp(false);setList(false); setDashboardComp(false);setReportComp(false);setAdminComp(false);setRestoreComp(true)}}><DeleteIcon className='home-icon'/>Restore Deleted Asset</li>
              <li onClick={() => {  setDashboardComp(false); setVendorComp(false) ;setList(false);setProductComp(false);setReportComp(false);setAdminComp(false);setRestoreComp(false);setAdmin({location:false,manager:false,employee:false,department:false,productType:false});handleLogout()}}><LogoutIcon className='home-icon'/>Logout</li>
            </ul>
          </div>
          <div className='right-nav col-10'>
            <div className='container-fluid'>
              <div className='row d-flex flex-column'>
                <div className='right-nav-header'>
                  <h2>{userFirstName} {userLastName}</h2>
                </div>
                <div className='right-nav-body'>
                  <div className='container-fluid'>
                    <div className='row'>
                      {
                        dashboardComp ?
                          <DashboardCard /> : <></>
                      }
                      {
                        vendorComp ?
                          <VendorCard /> : <></>
                      }
                      {
                        productComp ?
                          <ProductCard /> : <></>
                      }{
                        list?
                      <AssetCard data={data} parentCallback = {handleCallback}/>:<></>
                        }
                        {
                        reportComp?
                      <ReportCard/>:<></>
                        }
                        {
                        adminComp?
                      <AdminCard admin={admin} adminlocationCallback = {adminlocationCallback} adminmanagerCallback = {adminmanagerCallback} adminemployeeCallback = {adminemployeeCallback} admindepartmentCallback = {admindepartmentCallback} adminproducttypeCallback = {adminproducttypeCallback}/>:<></>
                        }
                         {
                        restoreComp?
                      <RestoreAsset/>:<></>
                        }
                        
                        
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default DashboardNew
