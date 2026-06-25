import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaBookMedical } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
  return (
    <>
        <Navbar bg="primary" data-bs-theme="dark">
        <Container className='d-flex justify-content-center'>
          <Navbar.Brand className='fw-bold fs-2' onClick={() => navigate("/")} style={{ cursor: "pointer"}} >MediBuddy.com <FaBookMedical /></Navbar.Brand>
          {/* <Nav className="ms-auto">
            <Nav.Link className='fs-3' href="#home">Home</Nav.Link>
            <Nav.Link className='fs-3' href="#features">Features</Nav.Link>
            <Nav.Link className='fs-3' href="#pricing">Pricing</Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>
    </>
  )
}

export default Header