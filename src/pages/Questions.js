import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Show from '../../src/components/Show.js';

export default function Questions(props){
    
    const { userName, userImage } = props.currentUser

    const [questions, setQuestions] = useState([]); 
    const [questionFormInputs, updateQuestionFormInputs] = useState({
    userName: `${userName}`,
    userImage: `${userImage}`,
    category: '',
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
        
        if (questionFormInputs.category === ''){
            alert('Please select a language from the dropdown menu and try again');
        }else{

            try{
                const response = await axios.post('http://localhost:3001/api/questions', questionFormInputs);
                const createdQuestion = response.data
                console.log(`this is createdQuestion ${createdQuestion.body}`);
                await updateQuestionFormInputs({
                    userName: `${userName}`,
                    userImage: `${userImage}`,
                    category: '',
                    topic: '',
                    body: ''
                });
                await setQuestions([createdQuestion, ...questions])
            }catch(error){
                console.error(error)
            };
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

    const [filter, setFilter] = useState({
        language: ''
    })

    const handleFilterChange = (event) => {
        const updatedFilter = Object.assign({}, filter, {[event.target.id]: event.target.value})
        setFilter(updatedFilter);
    }


    return(
        <div style={{border: "1px solid gold"}}>
            {Object.keys(questionUpdate) < 1 ? 
            <div>
                <h3>This is the Questions Page</h3>
                <form onSubmit={handleQuestionSubmit}>
                    <h3>Post Your Question</h3>
                    <label htmlFor="category">Choose a language:</label>
                    <div className='select is-small'>
                    <select name="category" id="category" onChange={handleQuestionChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="javascript">Javascript</option>
                        <option value="ruby">Ruby</option>
                        <option value="sql">SQL/MQL</option>
                    </select>
                    </div><br />
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

                <h3>Filter Results</h3>
                    <label htmlFor="language">Choose a language:</label>
                    <div className='select is-small'>
                    <select name="language" id="language" onChange={handleFilterChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="javascript">Javascript</option>
                        <option value="ruby">Ruby</option>
                        <option value="sql">SQL/MQL</option>
                    </select>
                    </div><br />



                <div>
                    {
                    questions.map(question =>{
                        return(
                        <div key={question._id} style={{border: "1px solid red"}}>
                        
                        {
                            question.category === filter.language ?
                            <>
                            <h5>Category: {question.category}</h5>
                            <h6>Topic: {question.topic}</h6>
                            <p>{`${question.userName} asks: ${question.body}`}</p>
                            <img src={question.userImage} alt='url of user image'/>
                            <Show q={question}/>

                            <form onSubmit={handleClickUpdateQuestion} id={question._id}>
                            <input type='submit' value='Update Question'/>
                            </form>

                            <form onSubmit={handleQuestionDelete} id={question._id}>
                            <input type='submit' value='Delete Question'/>
                            </form>
                            </>
                            : ''
                        }
                        
                        </div>
                        )
                    })
                    }
                </div>
                </div>
            : 
            <div>
                <h1>This is the Questions Page - question update form</h1>
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