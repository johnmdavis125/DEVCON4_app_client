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
    }, [questions])

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
      console.log(`this is createdQuestion ${createdQuestion.body}`);
      await updateFormInputs({
        userName: 'defaultName',
        userImage: 'defaulturl',
        category: 'defaultCat',
        topic: '',
        body: ''
      });
      await setQuestions([createdQuestion, ...questions])
    }catch(error){
      console.error(error)
    };
  };
  
  const handleDelete = async (event) => {
    event.preventDefault();
    event.persist();
    console.log(event);
    try {
    console.log(`look here ${event.target.id}`);
      await axios.delete(`http://localhost:3001/api/questions/${event.target.id}`)
    } catch(error){
      console.error(error)
    };
  };

    // const handleUpdateQuestion = async (event) => {
          //   event.preventDefault();
          //   const response = await axios.put(`http://localhost:3001/api/questions/${event.target._id}`, )
          // }
          // -> need state variable for updated form inputs to pass into the axios.put action -> gen form with default values first


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
                  <form onSubmit={handleDelete} id={question._id}>
                    <input type='submit' value='Delete Question'/>
                  </form>
                </div>
              )
            })
          }
        </div>

    </div>
  );
}


