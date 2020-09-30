import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Show from '../../src/components/Show.js';

export default function QuestionForm(props){
    
    const [questions, setQuestions] = useState([]); 
    const [questionFormInputs, updateQuestionFormInputs] = useState({
    userName: 'defaultName',
    userImage: 'defaultUrl',
    category: 'defaultCat',
    topic: '',
    body: ''
    }); 
    
    const getQuestions = async () => {
        try{
            const response = await fetch('http://localhost:3001/api/questions'); 
            const qData = await response.json();
            setQuestions(qData)
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

    const handleQuestionChange = (event) => {
        const updatedQuestionFormInputs = Object.assign({}, questionFormInputs, {[event.target.id]: event.target.value})
        updateQuestionFormInputs(updatedQuestionFormInputs);
        }

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
    
    }
    
    useEffect(
        () => {
        (
            async function (){
            await console.log(`this is questionUpdate from useEffect ${questionUpdate.topic}, ${questionUpdate.body}`);
            }
        )()
        }, [questionUpdate])




    return(
        <div style={{border: "1px solid gold"}}>
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
        </div>
    )
}