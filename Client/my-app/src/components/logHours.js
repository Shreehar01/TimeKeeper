import React from 'react'
import NavigationBar from './navigationBar.js'; 
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {RiDeleteBin7Line} from 'react-icons/ri';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


// Toggle Switch Styling
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  // Alert Styling
  const Alert = React.forwardRef(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

// Main function
const LogHours = () => {
    const [formFields, setFormFields] = useState([{ hour: '', task: '', checkedVal: "off"},])
    const [open, setOpen] = React.useState(false);
    const handleFormChange = (event, index) => {
      let data = [...formFields];
      if (event.target.value === "on" || event.target.value === "off") {
          data[index][event.target.name] = data[index][event.target.name] === "on" ? "off" : "on" 
      } else {
          data[index][event.target.name] = event.target.value;
      }
      setFormFields(data);
      console.log(formFields)
    }

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    
      
    // Getting today's date
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    var formattedToday = yyyy + '/' + mm + '/' + dd;

    const submit = (e) => {
      e.preventDefault();
      console.log("Submit", formFields)
      fetch('http://localhost:5000/entry/createEntry', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({dateValue: formattedToday, formValues: formFields})
        }).then((response) => response.json())
        .then((data) => {
          if (data.status === "complete"){
            setFormFields([{hour: '', task: '', checkedVal: 'off'}])
            handleClick()
          } else {
            console.log("Error in saving the entry")
          }
        })
    }
  
    const addFields = () => {
      let object = {
        hour: '',
        task: '',
        checkedVal: ''
      }
  
      setFormFields([...formFields, object])
    }
  
    const removeFields = (index) => {
      let data = [...formFields];
      data.splice(index, 1)
      setFormFields(data)
    }
    
    
    return (
    <>
        <NavigationBar />
        <br />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully submitted the daily entry!
        </Alert>
      </Snackbar>
        <Container style={{marginTop: "60px"}}>
        <Card className="text-center">
            <Card.Header as="h5">Daily Entry</Card.Header>
                <Card.Body>
                    <Card.Title style={{marginBottom: "20px"}}>Date: {formattedToday}</Card.Title>
                    <Button onClick={addFields} variant="outline-dark">Add More</Button> &nbsp;&nbsp;
                    <Card.Text style={{marginTop: "25px"}}>
                            <form onSubmit={submit}>
                        {formFields.map((form, index) => {
                        return (
                            <div key={index}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Row>
                                    <Col xs={3} md={3} lg={3}>
                                    <Form.Control onChange={event => handleFormChange(event, index)} name='hour' type="text" placeholder="Hours" value={form.hour} />                                    
                                    </Col>
                                    <Col xs={5} md={7} lg={7}>
                                    <Form.Control onChange={event => handleFormChange(event, index)} name='task' type="text" placeholder="Task" value={form.task}/>                                    
                                    </Col>
                                    <Col xs={4} md={2} lg={2}>
                                        <Button variant="outline-danger" onClick={() => removeFields(index)}><RiDeleteBin7Line /></Button>
                                        &nbsp;&nbsp;&nbsp;
                                        <FormControlLabel
                                            control={<IOSSwitch sx={{ m: 1 }} />}
                                            label=""
                                            onChange={event => handleFormChange(event, index)}
                                            checked = {form.checkedVal === "on" ? true : false}
                                            name = "checkedVal"
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            </div>
                        )
                        })} 
                    </form>
                    </Card.Text>
                    <Button onClick={submit} variant="outline-dark">Submit</Button>
                </Card.Body>
            </Card>
        </Container>
    </>
  )
}

export default LogHours