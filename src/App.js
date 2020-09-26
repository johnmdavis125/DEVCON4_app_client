import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

export default function App() {
  const [questions, setQuestions] = useState([]); 
  const [formInputs, updateFormInputs] = useState({
    userName: 'defaultName',
    userImage: 'defaultUrl',
    category: 'defaultCat',
    topic: '',
    body: ''
  });  
  
  const getQuestions = async () => {
    try{
      const response = await fetch('http://localhost:3001/api/questions'); 
      const data = await response.json();
      setQuestions(data)
    }catch(error){
      console.error(error); 
    };
  };

  useEffect(
    () => {
      (
        async function (){
          await getQuestions();
        }
      )()
    }, [])

  const handleChange = (event) => {
    const updatedFormInputs = Object.assign({}, formInputs, {[event.target.id]: event.target.value})
    updateFormInputs(updatedFormInputs);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formInputs);
    try{
      const response = await axios.post('http://localhost:3001/api/questions', formInputs);
      const createdQuestion = response.data
      console.log(`this is createdQuestion ${createdQuestion}`);
      await updateFormInputs({
        userName: '',
        userImage: '',
        category: '',
        topic: '',
        body: ''
      });
      await setQuestions([createdQuestion, ...questions])
    }catch(error){
      console.error(error)
    };
  };

  return (
    <div className="App">
      <h1>This is the app component</h1>
        <form onSubmit={handleSubmit}>
          <h3>Post Your Question</h3>
          <label htmlFor='topic'>Topic</label>
          <input
          type='text'
          id='topic'
          onChange={handleChange}
          value={formInputs.topic}
          /><br />
          <label htmlFor='body'>Question</label>
          <input
          type='text'
          id='body'
          onChange={handleChange}
          value={formInputs.body}
          /><br />
          <input type='submit' value='Post Question' />
        </form>

        <div>
          {
            questions.map(question =>{
              return(
                <div key={question._id} style={{border: "1px solid red"}}>
                  <h6>{question.topic}</h6>
                  <p>{question.body}</p>
                </div>
              )
            })
          }
        </div>

    </div>
  );
}


