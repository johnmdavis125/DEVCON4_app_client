import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import Navbar from '../src/components/Navbar.js';
import Questions from './pages/Questions.js';


export default function App(props){
  return(
    <>
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/questions' exact component={Questions}/>
        <Route path='/profile' exact component={Profile}/>
      </Switch>
    </Router>
    </>
  )
};

