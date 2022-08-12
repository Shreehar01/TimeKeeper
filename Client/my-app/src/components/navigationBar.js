import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navigationBar.css"


const NavigationBar = () => {
    return (
        <>
          <Navbar bg="dark" variant="dark" fixed="top">
              <Navbar.Brand href="/">
                <img
                  alt=""
                  src="https://logopond.com/logos/f59a913a0195f499cc24337fae948e6c.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                TimeKeeper
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Logger</Nav.Link>
                <Nav.Link href="/entries">Entries</Nav.Link>
              </Nav>
          </Navbar>
          <Navbar expand="lg" variant="dark" bg="dark"   fixed="bottom">
          <Nav className="m-auto">
          <Nav.Link >Made with &#10084;&#65039; by people of The Boring Company</Nav.Link>
          </Nav>
      </Navbar>
        </>
      );
}

export default NavigationBar;