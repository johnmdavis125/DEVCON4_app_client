import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import Navbar from '../src/components/Navbar.js';
import Questions from './pages/Questions.js';
import SignUpForm from '../src/components/SignUpForm.js';
import LogOut from '../src/components/LogOut.js';
import LogInForm from '../src/components/LogInForm.js';


export default function App(props){
  const [state, setState] = useState({
    email: '',
    password: '',
    isLoggedIn: false
  })

  const [currentUser, updateCurrentUser] = useState({
    userName: 'test name',
    userImage: 'test'
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]); 

  // const setUser = (loggedInUser, img) => {
  //   updateCurrentUser({
  //     userName: loggedInUser,
  //     userImage: img
  //   })
  //   console.log(`this is currentUser ${currentUser}, ${currentUser.userName}, ${currentUser.userImage}`)
  // }

  // const handleQuestionChange = (event) => {
  //   const updatedQuestionFormInputs = Object.assign({}, questionFormInputs, {[event.target.id]: event.target.value})
  //   updateQuestionFormInputs(updatedQuestionFormInputs);
  //   }





  const handleLogOut = () => {
    setState({
      email: '',
      password: '',
      isLoggedIn: false,
    });
    localStorage.clear();
  }

  const handleInput = (event) => {
    const updatedSignUpFormInputs = Object.assign({}, state, {[event.target.id]: event.target.value})
    setState(updatedSignUpFormInputs);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users/signup', {
        email: state.email,
        password: state.password,
      });
      console.log(response);
      localStorage.token = response.data.token;
      setIsLoggedIn(true);
    } catch(error){
      console.log(error); 
    }
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        email: state.email,
        password: state.password,
      });
      localStorage.token = response.data.token;
      setIsLoggedIn(true);

      console.log(`${state.email} just logged in`)
      // const user = state.email
      // const img = 'images/default.png'
      const newUser = {
        userName: `${state.email}`,
        userImage: 'images/default.png'
      }
      await updateCurrentUser({...currentUser, ...newUser});
      await console.log(`this is currentUser ${currentUser}, ${currentUser.userName}, ${currentUser.userImage}`)
    } catch(error){
      console.log(error);
    }
  };

  return(
 
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <div className='body'>
        <Switch>
          <Route
            path='/signup'
            render={(props) => {
              return (
                <SignUpForm
                  state={state}
                  handleInput={handleInput}
                  handleSignUp={handleSignUp}
                />
              );
            }}
          />
          <Route
            path='/logout'
            render={(props) => {
              return (
                <LogOut
                  isLoggedIn={isLoggedIn}
                  handleLogOut={handleLogOut}
                />
              );
            }}
          />
          <Route
            path='/login'
            render={(props) => {
              return (
                <LogInForm
                  state={state}
                  handleInput={handleInput}
                  handleLogIn={handleLogIn}
                />
              );
            }}
          />
          <Route
            path='/questions'
            render={(props) => {
              return (
                <Questions currentUser={currentUser} />
              )
            }}
          />
          <Route
            path='/home'
            render={(props) => {
              return (
                <Home />
              )
            }}
          />
          <Route
            path='/profile'
            render={(props) => {
              return (
                <Profile />
              )
            }}
          />
        </Switch>
      </div>
    </div>
 
 
    // <>
    // <Router>
    //   <Navbar isLoggedIn={isLoggedIn} />
    //   <Switch>
    //     <Route path='/' exact component={Home}/>
    //     <Route path='/questions' exact component={Questions}/>
    //     <Route path='/profile' exact component={Profile}/>
    //   </Switch>
    // </Router>
    // </>
  )
};

