import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import Show from '../../src/components/Show.js';

export default function Forums(){

const [questions, setQuestions] = useState([]); 
const [questionFormInputs, updateQuestionFormInputs] = useState({
userName: 'defaultName',
userImage: 'defaultUrl',
category: 'defaultCat',
topic: '',
body: ''
});  

// const [responses, setResponses] = useState([]);
// const [responseFormInputs, updateResponseFormInputs] = useState({
// userName: 'defaultName',
// userImage: 'defaultUrl',
// category: 'defaultCat',
// body: ''
// })

const getQuestions = async () => {
try{
    const response = await fetch('http://localhost:3001/api/questions'); 
    const qData = await response.json();
    setQuestions(qData)
}catch(error){
    console.error(error); 
};
};

// const getResponses = async () => {
// try{
//     const response = await fetch('http://localhost:3001/api/responses'); 
//     const rData = await response.json();
//     setResponses(rData)
// }catch(error){
//     console.error(error); 
// };
// };

useEffect(
() => {
    (
    async function (){
        await getQuestions();
    }
    )()
}, [questions])

// useEffect(
// () => {
//     (
//     async function (){
//         await getResponses();
//     }
//     )()
// }, [responses])

const handleQuestionChange = (event) => {
const updatedQuestionFormInputs = Object.assign({}, questionFormInputs, {[event.target.id]: event.target.value})
updateQuestionFormInputs(updatedQuestionFormInputs);
}

// const handleResponseChange = (event) => {
// const updatedResponseFormInputs = Object.assign({}, responseFormInputs, {[event.target.id]: event.target.value})
// updateResponseFormInputs(updatedResponseFormInputs);
// }

const handleQuestionSubmit = async (event) => {
event.preventDefault();
console.log(questionFormInputs);
try{
    const response = await axios.post('http://localhost:3001/api/questions', questionFormInputs);
    const createdQuestion = response.data
    console.log(`this is createdQuestion ${createdQuestion.body}`);
    await updateQuestionFormInputs({
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

// const handleResponseSubmit = async (event) => {
// event.preventDefault();
// console.log(responseFormInputs);
// try{
//     const response = await axios.post('http://localhost:3001/api/responses', responseFormInputs);
//     const createdResponse = response.data
//     console.log(`this is createdResponse ${createdResponse.body}`);
//     await updateResponseFormInputs({
//     userName: 'defaultName',
//     userImage: 'defaulturl',
//     category: 'defaultCat',
//     body: ''
//     });
//     await setResponses([createdResponse, ...responses])
// }catch(error){
//     console.error(error)
// };
// };

const handleQuestionDelete = async (event) => {
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

// const handleResponseDelete = async (event) => {
// event.preventDefault();
// event.persist();
// console.log(event);
// try {
// console.log(`look here ${event.target.id}`);
//     await axios.delete(`http://localhost:3001/api/responses/${event.target.id}`)
// } catch(error){
//     console.error(error)
// };
// };

const [questionUpdate, setQuestionUpdate] = useState({}) 

const handleClickUpdateQuestion = async (event) => {
    event.preventDefault();
    const response = await axios.get(`http://localhost:3001/api/questions/${event.target.id}`);
    await setQuestionUpdate({...response.data});

    
}

const handleQuestionUpdateChange = (event) => {
    const questionEdit = Object.assign({}, questionUpdate, {[event.target.id]: event.target.value})
    console.log(`this is questionEdit, ${questionEdit.topic}, ${questionEdit.body}`)
    setQuestionUpdate(questionEdit);

    console.log(`this is questionUpdate, which should now populate in the update form ${questionUpdate.topic}, ${questionUpdate.body}`)
}

const handleQuestionUpdateSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.put(`http://localhost:3001/api/questions/${event.target.id}`, {topic: questionUpdate.topic, body: questionUpdate.body});
    await setQuestionUpdate({});
    // await console.log(`this is questionUpdate ${questionUpdate.topic}, ${questionUpdate.body}`);
}

useEffect(
    () => {
    (
        async function (){
        await console.log(`this is questionUpdate from useEffect ${questionUpdate.topic}, ${questionUpdate.body}`);
        }
    )()
    }, [questionUpdate])

    
return (
<div className="App">

{Object.keys(questionUpdate) < 1 ? 
<div>
    <h1>This is the Forums component - questions form</h1>
    <form onSubmit={handleQuestionSubmit}>
        <h3>Post Your Question</h3>
        <label htmlFor='topic'>Topic</label>
        <input
        type='text'
        id='topic'
        onChange={handleQuestionChange}
        value={questionFormInputs.topic}
        /><br />
        <label htmlFor='body'>Question</label>
        <input
        type='text'
        id='body'
        onChange={handleQuestionChange}
        value={questionFormInputs.body}
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

                {/* <Link to={`/show`} data={question}>Show Link Test</Link> */}
                <Show q={question}/>

                <form onSubmit={handleClickUpdateQuestion} id={question._id}>
                <input type='submit' value='Update Question'/>
                </form>

                <form onSubmit={handleQuestionDelete} id={question._id}>
                <input type='submit' value='Delete Question'/>
                </form>
            </div>
            )
        })
        }
    </div>
    </div>
: 
<div>
    <h1>This is the Forums component - question update form</h1>
    <form onSubmit={handleQuestionUpdateSubmit} id={questionUpdate._id}>
        <h3>Post Your Updated Question</h3>
        <label htmlFor='topic'>Topic</label>
        <input
        type='text'
        id='topic'
        onChange={handleQuestionUpdateChange}
        defaultValue={questionUpdate.topic}
        /><br />
        <label htmlFor='body'>Question</label>
        <input
        type='text'
        id='body'
        onChange={handleQuestionUpdateChange}
        defaultValue={questionUpdate.body}
        /><br />
        <input type='submit' value='Post Updated Question' />
    </form>
</div>
}




    {/* <h1>This is the Forums component - Response form</h1>
    <form onSubmit={handleResponseSubmit}>
        <h3>Post Your Response</h3>
        <label htmlFor='body'>Response</label>
        <input
        type='text'
        id='body'
        onChange={handleResponseChange}
        value={responseFormInputs.body}
        /><br />
        <input type='submit' value='Post Response' />
    </form> */}

    {/* <div>
        {
        responses.map(res =>{
            return(
            <div key={res._id} style={{border: "1px solid red"}}>
                <p>{res.body}</p>
                <form onSubmit={handleResponseDelete} id={res._id}>
                <input type='submit' value='Delete Response'/>
                </form>
            </div>
            )
        })
        }
    </div> */}




</div>
);
}


