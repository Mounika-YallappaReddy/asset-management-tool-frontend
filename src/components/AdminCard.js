import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { CommonContext } from '../App';
import axios from 'axios';
import countrydata from './CountryData.json';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function AdminCard(props) {
    let commonContext = useContext(CommonContext);

    let [errmsg,setErrMsg]=useState("")
    let [isErrFound,setIsErrorFound]=useState(false)


    let [modal, setModal] = useState(false);
    let [list, setList] = useState(false)
    let [detail, setDetail] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true);
    let [managerList, setManagerList] = useState(false)
    let [managerDetail, setManagerDetail] = useState(false)
    let [employeeList, setEmployeeList] = useState(false)
    let [employeeDetail, setEmployeeDetail] = useState(false) 
    let [departmentList, setDepartmentList] = useState(false)
    let [departmentDetail, setDepartmentDetail] = useState(false)
    let [productList, setProductList] = useState(false)
    let [productDetail, setProductDetail] = useState(false)

    let [departmentName, setDepartmentName] = useState()
    let [contactName, setContactName] = useState()
    let [departmentEmail, setDepartmentEmail] = useState()
    let [departmentMobile, setDepartmentMobile] = useState()

    let [departmentsArray, setDepartmentsArray] = useState([]);
    let [departmentId, setDepartmentId] = useState()

    let [managerName, setManagerName] = useState()
    let [managerID, setManagerID] = useState()
    let [managerEmail, setManagerEmail] = useState()
    let [managerDepartmentName, setManagerDepartmentName] = useState()

    let [managersArray, setManagersArray] = useState([]);
    let [managersId, setManagersId] = useState()
    let [departmentNames, setDepartmentNames] = useState([])

    let [employeeName, setEmployeeName] = useState("")
    let [employeeEmail, setEmployeeEmail] = useState("")
    let [employeeID, setEmployeeID] = useState("")
    let [password, setPassword] = useState("")
    let [mobile, setMobile] = useState("")
    let [role, setRole] = useState("")
    let [employeeCountry, setEmployeeCountry] = useState("")
    let [employeeState, setEmployeeState] = useState("")
    let [employeeManager, setEmployeeManager] = useState("")

    let [employeesArray, setEmployeesArray] = useState([]);
    let [employeesId, setEmployeesId] = useState();
    let [managerNamesArray, setManagerNamesArray] = useState([])

    let [product_types, setProduct_types] = useState();
    let [product_Category, setProduct_Category] = useState();

    let [productTypessArray, setProductTypessArray] = useState([])
    let [productTypeId, setProductTypeId] = useState();
    let [productCategoryArray, setProductCategoryArray] = useState([])

    let [officeName, setOfficeName] = useState()
    let [addressLineFirst, setAddressLineFirst] = useState()
    let [addressLineLast, setAddressLineLast] = useState()
    let [locationCountry, setLocationCountry] = useState()
    let [locationState, setLocationState] = useState()
    let [locationPincode, setLocationPincode] = useState()
    let [locationContactPerson, setLocationContactPerson] = useState()
    let [locationContactEmail, setLocationContactEmail] = useState()
    let [locationContactMobile, setLocationContactMobile] = useState()

    let [locationArray, setLocationArray] = useState([]);
    let [locationId, setLocationId] = useState([])

    const [JsonState, setJsonState] = useState([])

    let [query,setQuery]=useState("")
    // console.log(props)
    function handleEdit() {
        setList(false)
        setDetail(true)
    }
    function handleSave() {
        setList(true)
        setDetail(false)
    }
    function onLocationTrigger() {
        props.adminlocationCallback(false);
        console.log(props.adminlocationCallback);
        setDetail(true)
    }
    function onLocationBack() {
        props.adminlocationCallback(true);
        console.log(props.adminlocationCallback);
        setDetail(false);
    }

    function onManagerTrigger() {
        props.adminmanagerCallback(false);
        setManagerDetail(true)
    }
    function onManagerBack() {
        props.adminmanagerCallback(true);

        setManagerDetail(false);
    }

    const handleCountry = (e) => {
        setLocationCountry(e.target.value)
        setEmployeeCountry(e.target.value)
        const getcountryName = e.target.value;
        const getStatedata = countrydata.find(country => country.country_name === getcountryName).states;
        setJsonState(getStatedata)

    }
    //Add department
    async function handleAddDepartment() {

        let res = await axios.post(`${commonContext.apiurl}/add-department`, {
            departmentName,
            contactName,
            departmentEmail,
            departmentMobile
        })
        if (res.data.statusCode === 200) {
            // navigate('/login')
            getDepartmentsList()
            console.log('Vendor added from front edd')
            setIsErrorFound(false)
        setModal(false)
        }else{
            if(res.data.statusCode===400 || res.data.statusCode===500){
                setIsErrorFound(true)
                setErrMsg(res.data.message)
            }
        }
    }
    //get department list
    async function getDepartmentsList() {

        let res = await axios.get(`${commonContext.apiurl}/get-departments`);
        console.log(res.data)
        if (res.data.statusCode === 200) {
            console.log('Deoartments Fetched Successfully')
            setDepartmentsArray(res.data.departments)
            // console.log(vendorsArray)
        }
    }
    //get department by id
    async function handleEditDepartment(id) {

        // setVendorId(id)
        console.log(`${commonContext.apiurl}/get-department-by-id/${id}`)
        // setList(false)
        // setDetail(true)
        let res = await axios.get(`${commonContext.apiurl}/get-department-by-id/${id}`)
        if (res.data.statusCode === 200) {

            console.log(res.data)
            setDepartmentId(id);

            console.log(id)
            setDepartmentName(res.data.department.departmentName)
            setContactName(res.data.department.contactName)
            setDepartmentEmail(res.data.department.departmentEmail)
            setDepartmentMobile(res.data.department.departmentEmail)

        }
    }
    //edit department by id
    async function handleDepartmentDetailSave() {
        console.log(`submitting edited data.......`)
        console.log(`${commonContext.apiurl}/edit-department/${departmentId}`)
        let res = await axios.put(`${commonContext.apiurl}/edit-department/${departmentId}`, {
            departmentName,
            contactName,
            departmentEmail,
            departmentMobile
        })

        if (res.data.statusCode === 200) {
            console.log('Details edited successfully');

        }
    }
    //delete department by id
    async function handleDeleteDepartment(id) {
        var deleteOne = window.confirm('Are u sure to delete??');
        if(deleteOne){
        let res = await axios.delete(`${commonContext.apiurl}/delete-department/${id}`)
        if (res.data.statusCode === 200) {
            console.log('deleted succcessfully')
            getDepartmentsList();
            fetchDepartmentNames();
            
        }
    }
    }
    function handleBack() {
        getDepartmentsList()
    }
    //Add Manager
    async function handleAddManager() {
        console.log('add manager button clicked')
        let res = await axios.post(`${commonContext.apiurl}/add-manager`, {
            managerName,
            managerID,
            managerEmail,
            managerDepartmentName
        })
        if (res.data.statusCode === 200) {
            console.log(`manager added successfully`)
            getManagersList()
            setIsErrorFound(false)
        setModal(false)
        }else{
            if(res.data.statusCode===400 || res.data.statusCode===500){
                setIsErrorFound(true)
                setErrMsg(res.data.message)
            }
        }
    }
    //get Managers list
    async function getManagersList() {

        let res = await axios.get(`${commonContext.apiurl}/get-managers`);
        console.log(res.data)
        if (res.data.statusCode === 200) {
            console.log('Deoartments Fetched Successfully')
            setManagersArray(res.data.managers)
            // console.log(vendorsArray)
        }
    }
    //get Managers by id
    async function handleEditManager(id) {

        // setVendorId(id)
        console.log(`${commonContext.apiurl}/get-manager-by-id/${id}`)
        // setList(false)
        // setDetail(true)
        let res = await axios.get(`${commonContext.apiurl}/get-manager-by-id/${id}`)
        if (res.data.statusCode === 200) {

            console.log(res.data)
            setManagersId(id);

            console.log(id)
            setManagerName(res.data.manager.managerName)
            setManagerID(res.data.manager.managerID)
            setManagerEmail(res.data.manager.managerEmail)
            setManagerDepartmentName(res.data.manager.managerDepartmentName)

        }
    }
    //edit Managers by id
    async function handleManagerDetailSave() {
        console.log(`submitting edited data.......`)
        console.log(`${commonContext.apiurl}/edit-department/${departmentId}`)
        let res = await axios.put(`${commonContext.apiurl}/edit-manager/${managersId}`, {
            managerName,
            managerEmail,
            managerID,
            managerDepartmentName
        })

        if (res.data.statusCode === 200) {
            console.log('Details edited successfully');
            getManagersList()
        }
    }
    //delete Managers by id
    async function handleDeleteManager(id) {
        var deleteOne = window.confirm('Are u sure to delete??');
        if(deleteOne){
        let res = await axios.delete(`${commonContext.apiurl}/delete-manager/${id}`)
        if (res.data.statusCode === 200) {
            console.log('deleted succcessfully')
            getManagersList();
            fetchManagerNames();
        }
    }
    }
    //get array of department Names
    async function fetchDepartmentNames() {

        let res = await axios.get(`${commonContext.apiurl}/get-department-names`)
        if (res.data.statusCode === 200) {
            console.log(res.data)
            console.log('Department Names fetched successfully')
            setDepartmentNames(res.data.departmentNames)

        }
    }

    //Add employee
    async function handleAddEmployee() {

        let res = await axios.post(`${commonContext.apiurl}/add-employee`, {
          employeeName,
          employeeEmail,
          employeeID,
          password,
          mobile,
          role,
          employeeCountry,
          employeeState,
          employeeManager
        })
        if (res.data.statusCode === 200) {
            // navigate('/login')
            getEmployeesList()
            console.log('location added from front edd')
            setIsErrorFound(false)
            setModal(false)
        }else{
            if(res.data.statusCode===400 || res.data.statusCode===500){
                setIsErrorFound(true)
                setErrMsg(res.data.message)
            }
        }
    }
    //get employee list
    async function getEmployeesList() {

        let res = await axios.get(`${commonContext.apiurl}/get-employee`);
        console.log(res.data)
        if (res.data.statusCode === 200) {
            console.log('Employee Fetched Successfully')
            setEmployeesArray(res.data.employees)
            // console.log(vendorsArray)
        }
    }
    //get employee by id
    async function handleEditEmployee(id) {

        // setVendorId(id)
        console.log(`${commonContext.apiurl}/get-employee-by-id/${id}`)
        // setList(false)
        // setDetail(true)
        let res = await axios.get(`${commonContext.apiurl}/get-employee-by-id/${id}`)
        if (res.data.statusCode === 200) {

            console.log(res.data)
            setEmployeesId(id);

            console.log(id)
            setEmployeeName(res.data.employee.employeeModel)
            setEmployeeEmail(res.data.employee.employeeEmail)
            setEmployeeID(res.data.employee.employeeID)
            setPassword(res.data.employee.password)
            setMobile(res.data.employee.mobile)
            setRole(res.data.employee.role)
             setEmployeeCountry(res.data.employee.employeeCountry)
             setEmployeeState(res.data.employee.employeeState)
            setEmployeeManager(res.data.employee.employeeManager)
        }
    }
    //edit employee by id
    async function handleEmployeeDetailSave() {
        console.log(`submitting edited data.......`)
        console.log(`${commonContext.apiurl}/edit-department/${departmentId}`)
        let res = await axios.put(`${commonContext.apiurl}/edit-employee/${employeesId}`, {
            employeeName,
            employeeEmail,
            employeeID,
            password,
            mobile,
            role,
            employeeCountry,
            employeeState,
            employeeManager
        })

        if (res.data.statusCode === 200) {
            console.log('Details edited successfully');
            getEmployeesList()
        }
    }
    //delete employee by id
    async function handleDeleteEmployee(id) {
        var deleteOne = window.confirm('Are u sure to delete??');
        if(deleteOne){
        let res = await axios.delete(`${commonContext.apiurl}/delete-employee/${id}`)
        if (res.data.statusCode === 200) {
            console.log('deleted succcessfully')
            getEmployeesList()
        }
    }
    }
    //fetch manager Names array
    async function fetchManagerNames() {
        // setManagerName(e.target.value)
        let res = await axios.get(`${commonContext.apiurl}/get-manager-names`)
        if (res.data.statusCode === 200) {
            console.log(res.data)
            console.log('Managers Names fetched successfully')
            setManagerNamesArray(res.data.managerNames)

        }
    }

    //Add productType
    async function handleAddProductType() {

        let res = await axios.post(`${commonContext.apiurl}/add-product-type`, {
            product_types,
            product_Category
        })
        if (res.data.statusCode === 200) {
            // navigate('/login')
            getProductTypeList()
            console.log('product type added from front edd')
            setIsErrorFound(false)
            setModal(false)
        }else{
            if(res.data.statusCode===400 || res.data.statusCode===500){
                setIsErrorFound(true)
                setErrMsg(res.data.message)
            }
        }
    }
    //get product type list
    async function getProductTypeList() {

        let res = await axios.get(`${commonContext.apiurl}/get-product-types`);
        console.log(res.data)
        if (res.data.statusCode === 200) {
            console.log('product types Fetched Successfully')
            setProductTypessArray(res.data.productTypes)
            // console.log(vendorsArray)
        }
    }
    //get product type by id
    async function handleEditProductType(id) {

        // setVendorId(id)
        console.log(`${commonContext.apiurl}/get-product-type-by-id/${id}`)
        // setList(false)
        // setDetail(true)
        let res = await axios.get(`${commonContext.apiurl}/get-product-type-by-id/${id}`)
        if (res.data.statusCode === 200) {

            console.log(res.data)
            setProductTypeId(id);

            setProduct_types(res.data.product.product_types);
            setProduct_Category(res.data.product.product_Category);

        }
    }
    //edit product type by id
    async function handleProductTypeDetailSave() {
        console.log(`submitting edited data.......`)
        console.log(`${commonContext.apiurl}/edit-department/${departmentId}`)
        let res = await axios.put(`${commonContext.apiurl}/edit-product-type/${productTypeId}`, {
            product_types,
            product_Category
        })

        if (res.data.statusCode === 200) {
            console.log('Details edited successfully');
            console.log(product_types,product_Category)
            getProductTypeList()
        }
    }
    //delete department by id
    async function handleDeleteProductType(id) {
        var deleteOne = window.confirm('Are u sure to delete??');
        if(deleteOne){
        let res = await axios.delete(`${commonContext.apiurl}/delete-product-type/${id}`)
        if (res.data.statusCode === 200) {
            console.log('deleted succcessfully')
            getProductTypeList()
        }
    }
    }
    //fetch product categories array
    async function fetchCategoryTypes() {

        let res = await axios.get(`${commonContext.apiurl}/get-product-category-array`)
        if (res.data.statusCode === 200) {
            console.log(res.data)
            console.log('Product categories fetched successfully')
            setProductCategoryArray(res.data.productCatNames)

        }
    }

    //Add location
    async function handleAddLocation() {

        let res = await axios.post(`${commonContext.apiurl}/add-location`, {
            officeName,
            addressLineFirst,
            addressLineLast,
            locationCountry,
            locationState,
            locationPincode,
            locationContactPerson,
            locationContactEmail,
            locationContactMobile
        })
        if (res.data.statusCode === 200) {
            // navigate('/login')
            getLocationList()
            console.log('location added from front edd')
            setIsErrorFound(false)
        setModal(false)
        }else{
            if(res.data.statusCode===400 || res.data.statusCode===500){
                setIsErrorFound(true)
                setErrMsg(res.data.message)
            }
        }
    }
    //get location list
    async function getLocationList() {

        let res = await axios.get(`${commonContext.apiurl}/get-locations`);
        console.log(res.data)
        if (res.data.statusCode === 200) {
            console.log('locations Fetched Successfully')
            setLocationArray(res.data.locations)
            // console.log(vendorsArray)
        }
    }
    //get location by id
    async function handleEditLocation(id) {

        // setVendorId(id)
        console.log(`${commonContext.apiurl}/get-location-by-id/${id}`)
        // setList(false)
        // setDetail(true)
        let res = await axios.get(`${commonContext.apiurl}/get-location-by-id/${id}`)
        if (res.data.statusCode === 200) {

            console.log(res.data)
            setLocationId(id);

            setOfficeName(res.data.location.officeName)
            setAddressLineFirst(res.data.location.addressLineFirst)
            setAddressLineLast(res.data.location.addressLineLast)
            setLocationCountry(res.data.location.locationCountry)
            setLocationState(res.data.location.locationState)
            setLocationPincode(res.data.location.locationPincode)
            setLocationContactPerson(res.data.location.locationContactPerson)
            setLocationContactEmail(res.data.location.locationContactEmail)
            setLocationContactMobile(res.data.location.locationContactMobile)
        }
    }
    //edit location by id
    async function handleLocationDetailSave() {
        console.log(`submitting edited data.......`)
        console.log(`${commonContext.apiurl}/edit-department/${departmentId}`)
        let res = await axios.put(`${commonContext.apiurl}/edit-location/${locationId}`, {
            officeName,
            addressLineFirst,
            addressLineLast,
            locationCountry,
            locationState,
            locationPincode,
            locationContactPerson,
            locationContactEmail,
            locationContactMobile
        })

        if (res.data.statusCode === 200) {
            console.log('Details edited successfully');
            getLocationList()
        }
    }
    //delete locationt by id
    async function handleDeleteLocation(id) {
        var deleteOne = window.confirm('Are u sure to delete??');
        if(deleteOne){
        let res = await axios.delete(`${commonContext.apiurl}/delete-location/${id}`)
        if (res.data.statusCode === 200) {
            console.log('deleted succcessfully')
            getLocationList()
        }
    }
    }
    useEffect(() => {
        getDepartmentsList();
        getManagersList();
        fetchDepartmentNames();
        fetchManagerNames();
        getEmployeesList();
        getProductTypeList();
        fetchCategoryTypes();
        getLocationList()
    }, [])
    return <>
        <div className='vendorCard'>
            <div className='container-fluid'>

                {
                    props.admin.location ?
                        <div className='row d-flex'>

                            <div className='vendor-header'>
                                <Button onClick={() => { setModal(true) }}>ADD LOCATION</Button>
                            </div>
                            <div className='vendor-body'>
                                <Modal show={modal} onHide={() => { setModal(false) }} size='lg' id='add-vendor-modal'>
                                    <Modal.Header id='add-vendor-header' closeButton>
                                        <Modal.Title id='add-vendor-title'>Add Location</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form className='d-flex justify-content-around flex-wrap'>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
                                                <Form.Label>Office Name</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setOfficeName(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
                                                <Form.Label>Address Line 1</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setAddressLineFirst(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
                                                <Form.Label>Address Line 2</Form.Label>
                                                <Form.Control type="text" onChange={(e) => { setAddressLineLast(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5">
                                                <Form.Label>Country</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Select onChange={(e) => handleCountry(e)}>
                                                    <option>--Select Country--</option>
                                                    {
                                                        countrydata.map((getcountry, index) => (
                                                            <option value={getcountry.country_name} key={index}>{getcountry.country_name}</option>
                                                        ))
                                                    }

                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5">
                                                <Form.Label>State</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Select onChange={(e) => { setLocationState(e.target.value) }}>
                                                    <option>--Select State--</option>
                                                    {
                                                        JsonState.map((getJsonState, index) => (
                                                            <option value={getJsonState.state_name} key={index}>{getJsonState.state_name}</option>
                                                        ))
                                                    }

                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
                                                <Form.Label>Zip Code</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setLocationPincode(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicMobile">
                                                <Form.Label>Contact Person Name</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setLocationContactPerson(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicMobile">
                                                <Form.Label>Contact Person Email</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="email" onChange={(e) => { setLocationContactEmail(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicMobile">
                                                <Form.Label>Contact Person Mobile</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setLocationContactMobile(e.target.value) }} />
                                            </Form.Group>
                              
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setModal(false) }}>Close</Button>
                                        <Button variant="primary" onClick={() => {  handleAddLocation() }}>Save</Button>
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
                                                    <th>#</th>
                                                    <th>Office Name</th>
                                                    <th>Address</th>
                                                    <th>Contact Person Name</th>
                                                    <th>Contact Person Email</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                    <td>Mark</td>
                                                    <td>Mark</td>
                                                    <td onClick={() => { onLocationTrigger() }}>@mdo</td>
                                                </tr> */}
                                                {

                                                    // locationArray.map((e, i) => {
                                                        locationArray.filter((user)=>
                                                        user.officeName.toLowerCase().includes(query) ||
                                                        user.addressLineFirst.toLowerCase().includes(query) ||
                                                        user.locationContactPerson.toLowerCase().includes(query) ||
                                                        user.locationContactEmail.toLowerCase().includes(query) 
                                                        ).map((e,i)=>{
                                                        return <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{e.officeName}</td>
                                                            <td>{e.addressLineFirst}</td>
                                                            <td>{e.locationContactPerson}</td>
                                                            <td>{e.locationContactEmail}</td>
                                                            <td>status</td>
                                                            <td className='d-flex' >
                                                                {/* <Button onClick={() => { onLocationTrigger(); handleEditLocation(e._id) }}>edit</Button>
                                                                <Button onClick={() => { handleDeleteLocation(e._id) }}>delete</Button> */}
                                                                 <EditIcon onClick={() => { onLocationTrigger(); handleEditLocation(e._id) }} id='icon-edit-styling' style={{'color':'black','marginRight':'5px'}}/>
                                                        <DeleteIcon onClick={() => { handleDeleteLocation(e._id) }} style={{'color':'red'}}/>
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
                                <h1 className='location-header-list'>Location Detail</h1>
                            </div>
                            <div className='vendor-detail-body'>
                                <div className='d-flex vendor-detail-button justify-content-start'>
                                    <Button onClick={() => { onLocationBack() }}>Back to List</Button>
                                    <Button id='edit-btn' onClick={() => { setIsDisabled(false) }}>Edit</Button>
                                </div>

                                <div className='container-fluid'>
                                    <div className='row'>
                                        <Form>
                                            <div className='form-row d-flex justify-content-around'>
                                                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                                                    <Form.Label>Office Name</Form.Label>
                                                    <Form.Control type="text" value={officeName} disabled={isDisabled} onChange={(e) => { setOfficeName(e.target.value) }} />
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                                                    <Form.Label>Address Line 1</Form.Label>
                                                    <Form.Control type="text" value={addressLineFirst} disabled={isDisabled} onChange={(e) => { setAddressLineFirst(e.target.value) }} />
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                                                    <Form.Label>Address Line 2</Form.Label>
                                                    <Form.Control type="text" value={addressLineLast} disabled={isDisabled} onChange={(e) => { setAddressLineLast(e.target.value) }} />
                                                </Form.Group>
                                            </div>

                                            <div className='form-row d-flex justify-content-around'>
                                                <Form.Group className="mb-3 col-lg-3">
                                                    <Form.Label>Country</Form.Label>
                                                    <Form.Select value={locationCountry} disabled={isDisabled} onChange={(e) => handleCountry(e)}>
                                                        <option>--Select Country--</option>
                                                        {
                                                            countrydata.map((getcountry, index) => (
                                                                <option value={getcountry.country_name} key={index}>{getcountry.country_name}</option>
                                                            ))
                                                        }

                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-lg-3">
                                                    <Form.Label>State</Form.Label>
                                                    <Form.Select value={locationState} disabled={isDisabled} onChange={(e) => { setLocationState(e.target.value) }}>
                                                        <option>--Select State--</option>
                                                        {
                                                            JsonState.map((getJsonState, index) => (
                                                                <option value={getJsonState.state_name} key={index}>{getJsonState.state_name}</option>
                                                            ))
                                                        }

                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-lg-3" controlId="formBasicPin">
                                                    <Form.Label>Zip Code</Form.Label>
                                                    <Form.Control type="number" value={locationPincode} disabled={isDisabled} onChange={(e) => { setLocationPincode(e.target.value) }} />
                                                </Form.Group>
                                            </div>
                                            <div className='form-row d-flex justify-content-around'>

                                                <Form.Group className="mb-3 col-lg-3" controlId="formBasicMobile">
                                                    <Form.Label>Contact Person Name</Form.Label>
                                                    <Form.Control type="text" value={locationContactPerson} disabled={isDisabled} onChange={(e) => { setLocationContactPerson(e.target.value) }} />
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-lg-3" controlId="formBasicMobile">
                                                    <Form.Label>Contact Person Email</Form.Label>
                                                    <Form.Control type="email" value={locationContactEmail} disabled={isDisabled} onChange={(e) => { setLocationContactEmail(e.target.value) }} />
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-lg-3" controlId="formBasicMobile">
                                                    <Form.Label>Contact Person Mobile</Form.Label>
                                                    <Form.Control type="email" value={locationContactMobile} disabled={isDisabled} onChange={(e) => { setLocationContactMobile(e.target.value) }} />
                                                </Form.Group>
                                            </div>

                                            {
                                                isDisabled ?
                                                    <></> :
                                                    <button onClick={() => { setIsDisabled(true); handleLocationDetailSave() }} id='save-btn'>Save</button>
                                            }
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div> : <></>
                }
                {
                    props.admin.manager ?
                        <div className='row d-flex'>

                            <div className='vendor-header'>
                                <Button onClick={() => { setModal(true) }}>ADD MANAGER</Button>
                            </div>
                            <div className='vendor-body'>
                                <Modal show={modal} onHide={() => { setModal(false) }} size='lg' id='add-vendor-modal'>
                                    <Modal.Header id='add-vendor-header' closeButton>
                                        <Modal.Title id='add-vendor-title'>Add Manager</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form className='d-flex justify-content-around flex-wrap'>
                                            <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                                                <Form.Label>Manager</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setManagerName(e.target.value) }} />
                                            </Form.Group>

                                            <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                                                <Form.Label>Manager ID</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setManagerID(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                                                <Form.Label>Manager Email</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="email" onChange={(e) => { setManagerEmail(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                                                <Form.Label>Department</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Select onChange={(e) => { setManagerDepartmentName(e.target.value) }}>
                                                    <option>--Select Department</option>
                                                    {
                                                        departmentNames.map((e, i) => {
                                                            return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>


                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setModal(false) }}>Close</Button>
                                        <Button variant="primary" onClick={() => {  handleAddManager() }}>Save</Button>
                                    </Modal.Footer>
                                    {
                                isErrFound?
                                
                                <p style={{color:'red',marginLeft:'25%'}}>{errmsg}</p>:<></>
                            }
                                </Modal>
                                <div className='vendor-body-header'>
                                    <input type='text' placeholder='Search here..' onChange={(e)=>{setQuery(e.target.value)}}></input>
                                    <button>Search</button>
                                </div>
                                <div className='vendor-body-content'>
                                    <div className='vendors-list'>
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Manager Name</th>
                                                    <th>Manager Email</th>
                                                    <th>Departemnt Name</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               
                                                {
                                                    // managersArray.map((e, i) => {
                                                        managersArray.filter((user)=>
                                                        user.managerName.toLowerCase().includes(query) ||
                                                        user.managerEmail.toLowerCase().includes(query) ||
                                                        user.managerDepartmentName.toLowerCase().includes(query) 
                                                      
                                                        ).map((e,i)=>{
                                                        return <tr key={i}>
                                                            <td>{i+1}</td>
                                                            <td>{e.managerName}</td>
                                                            <td>{e.managerEmail}</td>
                                                            <td>{e.managerDepartmentName}</td>

                                                            <td>Otto</td>
                                                            <td className='d-flex' >
                                                                {/* <Button onClick={() => { onManagerTrigger(); handleEditManager(e._id) }}>edit</Button>
                                                                <Button onClick={() => { handleDeleteManager(e._id) }}>delete</Button> */}

                                                                 <EditIcon onClick={() => { onManagerTrigger(); handleEditManager(e._id) }} id='icon-edit-styling' style={{'color':'black','marginRight':'5px'}}/>
                                                        <DeleteIcon  onClick={() => { handleDeleteManager(e._id) }} style={{'color':'red'}}/>
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
                    managerDetail ?
                        <div className='row d-flex'>
                            <div className='vendor-detail-header'>
                                <h1>Manager Detail</h1>
                            </div>
                            <div className='vendor-detail-body'>
                                <div className='d-flex vendor-detail-button justify-content-start'>
                                    <Button onClick={() => { onManagerBack(); handleBack() }}>Back to List</Button>
                                    <Button id='edit-btn' onClick={() => { setIsDisabled(false) }}>Edit</Button>
                                </div>

                                <div className='container-fluid'>
                                    <div className='row'>
                                        {/* <Form> */}
                                        {/* <div className='form-row d-flex justify-content-around'> */}
                                        <Form className='d-flex justify-content-around flex-wrap'>
                                            <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                                                <Form.Label>Manager</Form.Label>
                                                <Form.Control type="text" value={managerName} disabled={isDisabled} onChange={(e) => { setManagerName(e.target.value) }} />
                                            </Form.Group>

                                            <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                                                <Form.Label>Manager ID</Form.Label>
                                                <Form.Control type="text" value={managerID} disabled={isDisabled} onChange={(e) => { setManagerID(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                                                <Form.Label>Manager Email</Form.Label>
                                                <Form.Control type="email" value={managerEmail} disabled={isDisabled} onChange={(e) => { setManagerEmail(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                                                <Form.Label>Department</Form.Label>
                                                <Form.Select value={managerDepartmentName} disabled={isDisabled} onChange={(e) => { setManagerDepartmentName(e.target.value) }}>
                                                    {
                                                        departmentNames.map((e, i) => {
                                                            return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>
                                            {/* </div> */}
                                            {
                                                isDisabled ?
                                                    <></> :
                                                    <button onClick={() => { setIsDisabled(true); handleManagerDetailSave() }} id='save-btn'>Save</button>
                                            }
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div> : <></>
                }
                {
                    props.admin.employee ?
                        <div className='row d-flex'>

                            <div className='vendor-header'>
                                <Button onClick={() => { setModal(true) }}>ADD EMPLOYEE</Button>
                            </div>
                            <div className='vendor-body'>
                                <Modal show={modal} onHide={() => { setModal(false) }} size='lg' id='add-vendor-modal'>
                                    <Modal.Header id='add-vendor-header' closeButton>
                                        <Modal.Title id='add-vendor-title'>Add Employee</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form className='d-flex justify-content-around flex-wrap'>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicName">
                                                <Form.Label> Name</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setEmployeeName(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
                                                <Form.Label>Email</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setEmployeeEmail(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicID">
                                                <Form.Label>Employee ID</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setEmployeeID(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="password" onChange={(e) => { setPassword(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5" controlId="formBasicMobile">
                                                <Form.Label>Mobile</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setMobile(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-5">
                                                 <Form.Label>Role</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Select onChange={(e) => { setRole(e.target.value) }}>
                                                    <option>Developer</option>
                                                    <option>Programmer</option>
                                                </Form.Select>
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
                                            <Form.Group className="mb-3 col-5" controlId="formBasicPerson">
                                                <Form.Label>State</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                               
                                                <Form.Select onChange={(e)=>{setEmployeeState(e.target.value)}}>
                                                    <option>--Select State--</option>
                                                    {
                                                      JsonState.map((getJsonState,index)=>(
                                                      <option value={getJsonState.state_name} key={index}>{getJsonState.state_name}</option>
                                                      ))
                                                    }
                                                    
                                                </Form.Select>
                                            </Form.Group>
                                           
                                            <Form.Group className="mb-3 col-5">
                                                <Form.Label>Manager</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Select onChange={(e) => { setEmployeeManager(e.target.value) }}>
                                                    <option>--Select Manager--</option>
                                                    {
                                                        managerNamesArray.map((e, i) => {
                                                            return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                            </Form.Group>

                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setModal(false) }}>Close</Button>
                                        <Button variant="primary" onClick={() => { handleAddEmployee()}}>Save</Button>
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
                                                    <th>#</th>
                                                    <th>Employee Name</th>
                                                    <th>EMployee Email</th>
                                                    <th>Role</th>
                                                    <th>Manager</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                    <td>Mark</td>
                                                    <td>Mark</td>
                                                    <td onClick={() => {   props.adminemployeeCallback(false);setEmployeeDetail(true) }}>@mdo</td>
                                                </tr> */}
                                                {
                                                    // employeesArray.map((e, i) => {
                                                        employeesArray.filter((user)=>
                                                        user.employeeName.toLowerCase().includes(query) ||
                                                        user.employeeEmail.toLowerCase().includes(query) ||
                                                        user.role.toLowerCase().includes(query) ||
                                                        user.employeeManager.toLowerCase().includes(query) 
                                                      
                                                        ).map((e,i)=>{
                                                        return <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{e.employeeName}</td>
                                                            <td>{e.employeeEmail}</td>
                                                            <td>{e.role}</td>
                                                            <td>{e.employeeManager}</td>
                                                            <td>status</td>

                                                            <td className='d-flex' >
                                                                {/* <Button onClick={() => { handleEditEmployee(e._id); props.adminemployeeCallback(false); setEmployeeDetail(true) }}>edit</Button>
                                                                <Button onClick={() => { handleDeleteEmployee(e._id) }}>delete</Button> */}
                                                                 <EditIcon onClick={() => { handleEditEmployee(e._id); props.adminemployeeCallback(false); setEmployeeDetail(true) }} id='icon-edit-styling' style={{'color':'black','marginRight':'5px'}}/>
                                                        <DeleteIcon onClick={() => { handleDeleteEmployee(e._id) }} style={{'color':'red'}}/>
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
                    employeeDetail ?
                        <div className='row d-flex'>
                            <div className='vendor-detail-header'>
                                <h1  className='location-header-list'>Employee Detail</h1>
                            </div>
                            <div className='vendor-detail-body'>
                                <div className='d-flex vendor-detail-button justify-content-start'>
                                    <Button onClick={() => { props.adminemployeeCallback(true); setEmployeeDetail(false) }}>Back to List</Button>
                                    <Button id='edit-btn' onClick={() => { setIsDisabled(false) }}>Edit</Button>
                                </div>

                                <div className='container-fluid'>
                                    <div className='row'>
                                        <Form>
                                            <div className='form-row d-flex justify-content-around'>
                                                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                                                    <Form.Label>Employee Name</Form.Label>
                                                    <Form.Control type="text" value={employeeName} disabled={isDisabled} onChange={(e) => { setEmployeeName(e.target.value) }} />
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                                                    <Form.Label>Employee Email</Form.Label>
                                                    <Form.Control type="email" value={employeeEmail} disabled={isDisabled} onChange={(e) => { setEmployeeEmail(e.target.value) }} />
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-lg-3" controlId="formBasicEmail">
                                                    <Form.Label>Employee ID</Form.Label>
                                                    <Form.Control type="text" value={employeeID} disabled={isDisabled} onChange={(e) => { setEmployeeID(e.target.value) }} />
                                                </Form.Group>
                                            </div>

                                            <div className='form-row d-flex justify-content-around'>
                                                <Form.Group className="mb-3 col-lg-3" controlId="formBasicPin">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control type="password" value={password} disabled={isDisabled} onChange={(e) => { setPassword(e.target.value) }} />
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-lg-3" controlId="formBasicPin">
                                                    <Form.Label>Mobile</Form.Label>
                                                    <Form.Control type="number" value={mobile} disabled={isDisabled} onChange={(e) => { setMobile(e.target.value) }} />
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-lg-3">
                                                    <Form.Label>Role</Form.Label>
                                                    <Form.Select value={role} disabled={isDisabled} onChange={(e) => { setRole(e.target.value) }}>
                                                        <option>Developer</option>
                                                        <option>Programmer</option>
                                                    </Form.Select>
                                                </Form.Group>


                                            </div>

                                            <div className='form-row d-flex justify-content-around'>
                                            <Form.Group className="mb-3 col-lg-3">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Select value={employeeCountry} disabled={isDisabled} onChange={(e)=>handleCountry(e)}>
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
                                               
                                                <Form.Select value={employeeState} disabled={isDisabled} onChange={(e)=>{setEmployeeState(e.target.value)}}>
                                                    <option>--Select State--</option>
                                                    {
                                                      JsonState.map((getJsonState,index)=>(
                                                      <option value={getJsonState.state_name} key={index}>{getJsonState.state_name}</option>
                                                      ))
                                                    }
                                                    
                                                </Form.Select>
                                            </Form.Group>
                                                {/* <Form.Group className="mb-3 col-lg-3 form-margin-location-new">
                                                    <Form.Label>Location</Form.Label>
                                                    <Form.Select value={location} disabled={isDisabled} onChange={(e) => { setLocation(e.target.value) }}>
                                                        <option>Anantapur</option>
                                                        <option>jeypore</option>
                                                    </Form.Select>
                                                </Form.Group> */}
                                                <Form.Group className="mb-3 col-lg-3 form-margin-location-new">
                                                    <Form.Label>Manager</Form.Label>
                                                    <Form.Select value={employeeManager} disabled={isDisabled} onChange={(e) => { setEmployeeManager(e.target.value) }}>
                                                    {
                                                        managerNamesArray.map((e, i) => {
                                                            return <option value={e} key={i} >{e}</option>
                                                        })
                                                    }
                                                </Form.Select>
                                                </Form.Group>

                                            </div>
                                            {
                                                isDisabled ?
                                                    <></> :
                                                    <button onClick={() => { setIsDisabled(true); handleEmployeeDetailSave() }} id='save-btn'>Save</button>
                                            }
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div> : <></>
                }
                {
                    props.admin.department ?
                        <div className='row d-flex'>

                            <div className='vendor-header'>
                                <Button onClick={() => { setModal(true) }}>ADD DEPARTMENT</Button>
                            </div>
                            <div className='vendor-body'>
                                <Modal show={modal} onHide={() => { setModal(false) }} size='lg' id='add-vendor-modal'>
                                    <Modal.Header id='add-vendor-header' closeButton>
                                        <Modal.Title id='add-vendor-title'>Add Department</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form className='d-flex justify-content-around flex-wrap'>
                                            <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                                                <Form.Label>Department Name</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setDepartmentName(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                                                <Form.Label>Contact Person Name</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="email" onChange={(e) => { setContactName(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                                                <Form.Label>Contact Person Email</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setDepartmentEmail(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
                                                <Form.Label>Contact person Mobile</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setDepartmentMobile(e.target.value) }} />
                                            </Form.Group>


                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setModal(false) }}>Close</Button>
                                        <Button variant="primary" onClick={() => { handleAddDepartment() }}>Save</Button>
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
                                                    <th>#</th>
                                                    <th>Department Name</th>
                                                    <th>Contact Person Name</th>
                                                    <th>Contact Person Email</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>Otto</td>
                                                    <td>@mdo</td>
                                                    <td>Mark</td>
                                                    <td onClick={(e) => { props.admindepartmentCallback(false); setDepartmentDetail(true); handleEditDepartment(e) }}>@mdo</td>
                                                </tr> */}
                                                {
                                                    // departmentsArray.map((e, i) => {
                                                        departmentsArray.filter((user)=>
                                                        user.departmentName.toLowerCase().includes(query) ||
                                                        user.contactPerson.toLowerCase().includes(query) ||
                                                        user.departmentEmail.toLowerCase().includes(query) 
                                                        
                                                      
                                                        ).map((e,i)=>{
                                                        return <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{e.departmentName}</td>
                                                            <td>{e.contactName}</td>
                                                            <td>{e.departmentEmail}</td>
                                                            <td>status</td>

                                                            <td className='d-flex' >
                                                                {/* <Button onClick={() => { props.admindepartmentCallback(false); setDepartmentDetail(true); handleEditDepartment(e._id) }}>edit</Button>
                                                                <Button onClick={() => { handleDeleteDepartment(e._id) }}>delete</Button> */}
                                                                 <EditIcon  onClick={() => { props.admindepartmentCallback(false); setDepartmentDetail(true); handleEditDepartment(e._id) }} id='icon-edit-styling' style={{'color':'black','marginRight':'5px'}}/>
                                                        <DeleteIcon onClick={() => { handleDeleteDepartment(e._id) }} style={{'color':'red'}}/>
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
                    departmentDetail ?
                        <div className='row d-flex'>
                            <div className='vendor-detail-header'>
                                <h1>Department Detail</h1>
                            </div>
                            <div className='vendor-detail-body'>
                                <div className='d-flex vendor-detail-button justify-content-start'>
                                    <Button onClick={() => { props.admindepartmentCallback(true);; setDepartmentDetail(false); handleBack() }}>Back to List</Button>
                                    <Button id='edit-btn' onClick={() => { setIsDisabled(false) }}>Edit</Button>
                                </div>

                                <div className='container-fluid'>
                                    <div className='row'>
                                        <Form className='d-flex justify-content-around flex-wrap'>
                                            <Form.Group className="mb-1 col-9" controlId="formBasicEmail">
                                                <Form.Label>Department Name</Form.Label>
                                                <Form.Control type="text" value={departmentName} disabled={isDisabled} onChange={(e) => { setDepartmentName(e.target.value) }} />
                                            </Form.Group>

                                            <Form.Group className="mb-1 col-9" controlId="formBasicEmail">
                                                <Form.Label>Contact Person Name</Form.Label>
                                                <Form.Control type="text" value={contactName} disabled={isDisabled} onChange={(e) => { setContactName(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-1 col-9" controlId="formBasicMobile">
                                                <Form.Label>Contact Person Email</Form.Label>
                                                <Form.Control type="email" value={departmentEmail} disabled={isDisabled} onChange={(e) => { setDepartmentEmail(e.target.value) }} />
                                            </Form.Group>
                                            <Form.Group className="mb-1 col-9">
                                                <Form.Label>Contact Person Mobile</Form.Label>
                                                <Form.Control type="text" value={departmentMobile} disabled={isDisabled} onChange={(e) => { setDepartmentMobile(e.target.value) }} />
                                            </Form.Group>



                                            {
                                                isDisabled ?
                                                    <></> :
                                                    <button onClick={() => { setIsDisabled(true); handleDepartmentDetailSave() }} id='save-btn'>Save</button>
                                            }
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div> : <></>
                }
                {
                    props.admin.productType ?
                        <div className='row d-flex'>

                            <div className='vendor-header'>
                                <Button onClick={() => { setModal(true) }}>ADD PRODUCT TYPE</Button>
                            </div>
                            <div className='vendor-body'>
                                <Modal show={modal} onHide={() => { setModal(false) }} size='lg' id='add-vendor-modal'>
                                    <Modal.Header id='add-vendor-header' closeButton>
                                        <Modal.Title id='add-vendor-title'>Add Product Type</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group className="mb-3 col-10" controlId="formBasicCategory">
                                            <Form.Label>Product Category</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                            <Form.Select onChange={(e) => { setProduct_Category(e.target.value) }}>
                                                <option>--Select Product Category--</option>
                                                {
                                                    productCategoryArray.map((e, i) => {
                                                        return <option value={e} key={i} >{e}</option>
                                                    })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                        <Form className='d-flex justify-content-around flex-wrap'>
                                            <Form.Group className="mb-3 col-10" controlId="formBasicEmail">
                                                <Form.Label>Product Type</Form.Label><sup style={{color:'red',fontSize:'15px'}}>*</sup>
                                                <Form.Control type="text" onChange={(e) => { setProduct_types(e.target.value) }} />
                                            </Form.Group>


                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => { setModal(false) }}>Close</Button>
                                        <Button variant="primary" onClick={() => {  handleAddProductType() }}>Save</Button>
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
                                                    <th>#</th>
                                                    <th>Product Type</th>
                                                    <th>Product Category</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {

                                                    // productTypessArray.map((e, i) => {
                                                        productTypessArray.filter((user)=>
                                                        user.product_types.toLowerCase().includes(query) ||
                                                        user.product_Category.toLowerCase().includes(query) 
                                                        
                                                        
                                                      
                                                        ).map((e,i)=>{
                                                        return <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{e.product_types}</td>
                                                            <td>{e.product_Category}</td>

                                                            <td className='d-flex' >
                                                                {/* <Button onClick={() => { props.adminproducttypeCallback(false);; setProductDetail(true); handleEditProductType(e._id) }}>edit</Button>
                                                                <Button onClick={() => { handleDeleteProductType(e._id) }}>delete</Button> */}
                                                                 <EditIcon onClick={() => { props.adminproducttypeCallback(false);; setProductDetail(true); handleEditProductType(e._id) }} id='icon-edit-styling' style={{'color':'black','marginRight':'5px'}}/>
                                                        <DeleteIcon onClick={() => { handleDeleteProductType(e._id) }} style={{'color':'red'}}/>
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
                    productDetail ?
                        <div className='row d-flex'>
                            <div className='vendor-detail-header'>
                                <h1>Product Type Detail</h1>
                            </div>
                            <div className='vendor-detail-body'>
                                <div className='d-flex vendor-detail-button justify-content-start'>
                                    <Button onClick={() => { props.adminproducttypeCallback(true);; setProductDetail(false) }}>Back to List</Button>
                                    <Button id='edit-btn' onClick={() => { setIsDisabled(false) }}>Edit</Button>
                                </div>

                                <div className='container-fluid'>
                                    <div className='row'>
                                        <Form>
                                            <div className='form-row d-flex justify-content-around flex-wrap'>
                                                <Form.Group className="mb-3 col-5" controlId="formBasicCategory">
                                                    <Form.Label>Product Category</Form.Label>
                                                    <Form.Select value={product_Category} disabled={isDisabled} onChange={(e) => { setProduct_Category(e.target.value) }}>
                                                        {
                                                            productCategoryArray.map((e, i) => {
                                                                return <option value={e} key={i} >{e}</option>
                                                            })
                                                        }
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="mb-3 col-5" controlId="formBasicEmail">
                                                    <Form.Label>Product Type </Form.Label>
                                                    <Form.Control type="text" value={product_types} disabled={isDisabled} onChange={(e) => { setProduct_types(e.target.value) }} />
                                                </Form.Group>

                                             

                                            </div>
                                            <div>
                                            {
                                                isDisabled ?
                                                    <></> :
                                                    
                                                    <button onClick={() => { setIsDisabled(true); handleProductTypeDetailSave() }} id='save-btn'>Save</button>
                                            }
                                           </div>
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

export default AdminCard
