import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { CommonContext } from '../App';
import axios from 'axios';
import UndoIcon from '@mui/icons-material/Undo';

function RestoreAsset() {
    let commonContext = useContext(CommonContext);
    let [list, setList] = useState(true)
    let [query, setQuery] = useState("")

    let [deletedAssets, setDeletedAssets] = useState([])
    let [deletedId, setDeletedId] = useState()
    async function getDeletedAssetsList() {

        let res = await axios.get(`${commonContext.apiurl}/get-deleted-assets`);
        console.log(res.data)
        if (res.data.statusCode === 200) {
            console.log(' Deleted Assets Fetched Successfully')
            setDeletedAssets(res.data.users)

        }
    }
    async function handleUndoAsset(id) {
        setDeletedId(id)
        var undoAsset = window.confirm('Are u sure to undo??');
        if (undoAsset) {
            let res = await axios.put(`${commonContext.apiurl}/undo-asset/${id}`)
            if (res.data.statusCode === 200) {
                console.log('undo succcessfully')
                getDeletedAssetsList()
            }
        }
        

    }

    useEffect(() => {
        getDeletedAssetsList()
    }, [])
    return <>
        <div className='vendorCard'>
            <div className='container-fluid'>
                {
                    list ?
                        <div className='row d-flex'>

                            <div className='vendor-header'>
                                <h1>Restore Deleted Assets</h1>
                            </div>
                            <div className='vendor-body'>

                                <div className='vendor-body-header'>
                                    <input type='text' placeholder='Enter Ventor Name' onChange={(e) => { setQuery(e.target.value) }}></input>
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
                                                    <th>Current State</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {

                                                    deletedAssets.filter((user) =>
                                                        user.assetName.toLowerCase().includes(query) ||
                                                        user.productType.toLowerCase().includes(query) ||
                                                        user.productName.toLowerCase().includes(query) ||
                                                        user.vendorName.toLowerCase().includes(query) ||
                                                        user.state.toLowerCase().includes(query)
                                                    ).map((e, i) => {
                                                        return <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{e.assetName}</td>
                                                            <td>{e.productType}</td>
                                                            <td>{e.productName}</td>
                                                            <td>{e.vendorName}</td>
                                                            <td>{e.state}</td>
                                                            <td>
                                                                <UndoIcon onClick={() => { handleUndoAsset(e._id) }} style={{'color':'green'}}>Undo</UndoIcon>
                                                                {/* <Button onClick={() => { handleUndoAsset(e._id) }}>Undo</Button> */}
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

            </div>
        </div>
    </>
}

export default RestoreAsset
