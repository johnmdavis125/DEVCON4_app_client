import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import Forums from './pages/Forums.js';
import Navbar from '../src/components/Navbar.js';


export default function App(props){
  return(
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/questions' exact component={Forums}/>
        <Route path='/profile' exact component={Profile}/>
      </Switch>
    </Router>
    </>
  )
};

