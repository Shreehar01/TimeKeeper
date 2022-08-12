import React from 'react';
import {Container} from '@material-ui/core';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LogHours from './components/logHours';       
import entriesContainer from './components/entries';     

const App = () => (
       <BrowserRouter>
       {/* Navigation Bar could have been placed here */}
        <Container maxwidth = "lg">
            <Switch>
                <Route path = "/" exact component = {LogHours} />
                <Route path = "/entries" exact component = {entriesContainer} />    
            </Switch>
        </Container>
       </BrowserRouter>
       
  );


export default App;