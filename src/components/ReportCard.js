import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function ReportCard() {

  return <>
    <div className='dashboard-cards'>
      <div className='container-fluid'>
        <h1 className='report-card-header'>Reports</h1>
        <div className='row'>



          <Card style={{ width: '18rem', height: '80%', margin: '1%', backgroundColor: '#ffcccc' }}>
            <Card.Body>
              <Card.Title className='mb-3'>Export Assets</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">U can export data here</Card.Subtitle>
              <ListGroup variant="flush" style={{ width: '18rem' }} className='report-export'>
                
                <ListGroup.Item>Export Data</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', height: '80%', margin: '1%', backgroundColor: '#ffe0b3' }}>
            <Card.Body>
              <Card.Title className='mb-3'>Export Vendors</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">U can export data here</Card.Subtitle>
              <ListGroup variant="flush" style={{ width: '18rem' }} className='report-export'>
                
                <ListGroup.Item>Export Data</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', height: '80%', margin: '1%', backgroundColor: '#cceeff' }}>
            <Card.Body>
              <Card.Title className='mb-3'>Assigned Assets</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">U can export data here</Card.Subtitle>
              <ListGroup variant="flush" style={{ width: '18rem' }} className='report-export'>
                
                <ListGroup.Item>Export Data</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

        </div>
        <div className='row'>
          <Card style={{ width: '18rem', height: '80%', margin: '1%', backgroundColor: '#ccffcc' }}>
            <Card.Body>
              <Card.Title className='mb-3'>IT Members</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">U can export data here</Card.Subtitle>
              <ListGroup variant="flush" style={{ width: '18rem' }} className='report-export'>
                
                <ListGroup.Item>Export Data</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', height: '80%', margin: '1%', backgroundColor: '#ffc6b3' }}>
            <Card.Body>
              <Card.Title className='mb-3'>Employees</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">U can export data here</Card.Subtitle>
              <ListGroup variant="flush" style={{ width: '18rem' }} className='report-export'>
                
                <ListGroup.Item>Export Data</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', height: '80%', margin: '1%', backgroundColor: '#ffffb3' }}>
            <Card.Body>
              <Card.Title className='mb-3'>Departments</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">U can export data here</Card.Subtitle>
              <ListGroup variant="flush" style={{ width: '18rem' }} className='report-export'>
                
                <ListGroup.Item>Export Data</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

        </div>
        <div className='row'>
          <Card style={{ width: '18rem', height: '80%', margin: '1%', backgroundColor: '#e5e5cc' }}>
            <Card.Body>
              <Card.Title className='mb-3'>Product Types</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">U can export data here</Card.Subtitle>
              <ListGroup variant="flush" style={{ width: '18rem' }} className='report-export'>
                
                <ListGroup.Item>Export Data</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem', height: '80%', margin: '1%', backgroundColor: '#ecc6d9' }}>
            <Card.Body>
              <Card.Title className='mb-3'>Products</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">U can export data here</Card.Subtitle>
              <ListGroup variant="flush" style={{ width: '18rem' }} className='report-export'>
                
                <ListGroup.Item>Export Data</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

        </div>
      </div>
    </div>
  </>
}

export default ReportCard
