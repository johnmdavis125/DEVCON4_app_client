import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Show from '../../src/components/Show.js';
import '../../src/components/Forms.css';

export default function Questions(props){
    // const { email, password, isLoggedIn } = props.state

    const [questions, setQuestions] = useState([]); 
    const [questionFormInputs, updateQuestionFormInputs] = useState({
    // userName: `${props.state.email}`,
    userName: 'userName',
    userImage: 'images/default.png',
    category: '',
    topic: '',
    body: ''
    }); 
    
    const getQuestions = async () => {
        try{
            const response = await fetch('https://devcon4-front.herokuapp.com/api/questions'); 
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
                console.log(`look here ${questionFormInputs.userName}, ${questionFormInputs.userImage}`)
                const response = await axios.post('https://devcon4-front.herokuapp.com/api/questions', questionFormInputs);
                const createdQuestion = response.data
                console.log(`this is createdQuestion ${createdQuestion.body}`);
                await updateQuestionFormInputs({
                    userName: `${props.state.email}`,
                    userImage: 'images/default.png',
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
            await axios.delete(`https://devcon4-front.herokuapp.com/api/questions/${event.target.id}`)
        } catch(error){
            console.error(error)
        };
        };

    const [questionUpdate, setQuestionUpdate] = useState({}) 

    const handleClickUpdateQuestion = async (event) => {
        event.preventDefault();
        const response = await axios.get(`https://devcon4-front.herokuapp.com/api/questions/${event.target.id}`);
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
        const response = await axios.put(`https://devcon4-front.herokuapp.com/api/questions/${event.target.id}`, {topic: questionUpdate.topic, body: questionUpdate.body});
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
        <div style={{backgroundColor: 'rgba(21, 90, 133, 0.394)'}}>
            {Object.keys(questionUpdate) < 1 ? 
            <div>
                <h2 style={{paddingTop: '30px'}}>Submit A Question</h2>
                <form className='myforms' onSubmit={handleQuestionSubmit}>
                    <label htmlFor="category">Choose a language:</label>
                    <div className='select is-small'>
                    <select style={{marginLeft: '10px'}} name="category" id="category" onChange={handleQuestionChange}>
                        <option value="">--Please choose an option--</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="javascript">Javascript</option>
                        <option value="ruby">Ruby</option>
                        <option value="sql">SQL/MQL</option>
                    </select>
                    </div><br />
                    <p>Current User: {props.state.email}</p>
                    <label htmlFor='topic'>Topic</label>
                    <input class='input is-small'
                    type='text'
                    id='topic'
                    onChange={handleQuestionChange}
                    value={questionFormInputs.topic}
                    /><br />
                    <label htmlFor='body'>Question</label>
                    <input class='input is-small'
                    type='text'
                    id='body'
                    onChange={handleQuestionChange}
                    value={questionFormInputs.body}
                    /><br />
                    <input style={{marginTop: '10px'}} class='button is-dark' type='submit' value='Post Question' />
                </form>

                <h2>Filter Results</h2>
                    <label style={{marginLeft: '20px'}} htmlFor="language">Choose a language:</label>
                    <div className='select is-small'>
                        <select style={{marginLeft: '10px'}} name="language" id="language" onChange={handleFilterChange}>
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
                        <div key={question._id}>
                        
                        {
                            question.category === filter.language ?
                            <>
                            <div style={{boxShadow: '1px 1px 10px 1px rgba(10,10,10,1)', borderRadius: '2px', margin: '10px'}} className='card'>
                                <div style={{paddingBottom: '0'}} className='card-content'>
                                    <div className='media'>
                                        <div className='media-left'>
                                            <figure className='image is-48x48'>
                                                <img src={question.userImage} alt='user image'/>
                                            </figure>
                                        </div>
                                        <div className='media-content'>
                                            <p className='title is-4'>{question.topic}</p>
                                            <p className='subtitle is-6'>{`${question.userName} asks: ${question.body}`}</p>
                                            <div className='subtitle is-6'>
                                                <Show q={question}/>
                                            </div>
                                        </div>
                                    </div>
                                    <footer className='card-footer'>
                                        <form style={{margin: '0', padding: '0'}}className='card-footer-item' onSubmit={handleClickUpdateQuestion} id={question._id}>
                                            <input className='button is-dark' type='submit' value='Update Question'/>
                                        </form>
                                        <form className='card-footer-item' onSubmit={handleQuestionDelete} id={question._id}>
                                            <input className='button is-dark' type='submit' value='Delete Question'/>
                                        </form>
                                    </footer>
                                </div>
                            </div>
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