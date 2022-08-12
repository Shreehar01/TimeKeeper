import React from 'react'
import NavigationBar from './navigationBar.js'; 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const entries = () => {
  return (
    <>
    <NavigationBar />
    <Card className="bg-dark text-white text-center" style={{marginTop: "80px"}}>
      <Card.Img src="https://campnesher.org/wp-content/uploads/sites/7/2020/09/Under-Construction-Sign.png" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>Entry Detail</Card.Title>
      </Card.ImgOverlay>
    </Card>
    </>
  )
}

export default entries