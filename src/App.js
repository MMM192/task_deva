import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Optional CSS file for custom styling
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Demo from './view/Demo/index';
import Home from './view/Home/index';
import Table2 from './view/Home/Components/Table';



function App() {
  return (
    <div className="App">
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Malasidha</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Home">Home</Nav.Link>
              <Nav.Link href="/View">View</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
      <Router>
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<Demo />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/View" element={<Table2 />} />

          {/* <Route path="/demo" element={ <App />} /> */}
        </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
