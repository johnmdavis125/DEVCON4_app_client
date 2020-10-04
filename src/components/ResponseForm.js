import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Forms.css';

export default function ResponseForm(props){

    const [responses, setResponses] = useState([]);
    const [responseFormInputs, updateResponseFormInputs] = useState({
    userName: 'defaultName',
    userImage: 'defaultUrl',
    category: 'defaultCat',
    qid: `${props.questionid}`,
    body: '',
    votes: 0
    })

    const getResponses = async () => {
        try{
            const response = await fetch('https://devcon-back.herokuapp.com/api/responses'); 
            const rData = await response.json();
            setResponses(rData)
        }catch(error){
            console.error(error); 
        };
        };

    useEffect(
        () => {
            (
            async function (){
                await getResponses();
            }
            )()
        }, [responses])

    const handleResponseChange = (event) => {
        const updatedResponseFormInputs = Object.assign({}, responseFormInputs, {[event.target.id]: event.target.value})
        updateResponseFormInputs(updatedResponseFormInputs);
        }

    const handleResponseSubmit = async (event) => {
        event.preventDefault();
        console.log(responseFormInputs);
        try{
            const response = await axios.post('https://cors-anywhere.herokuapp.com/https://devcon4-back.herokuapp.com/api/responses', responseFormInputs);
            const createdResponse = response.data
            console.log(`this is createdResponse ${createdResponse.body}`);
            await updateResponseFormInputs({
            userName: 'defaultName',
            userImage: 'defaulturl',
            category: 'defaultCat',
            body: '',
            votes: 0
            });
            await setResponses([createdResponse, ...responses])
            await closeResponseForm(); 
        }catch(error){
            console.error(error)
        };
        };

        const handleResponseDelete = async (event) => {
            event.preventDefault();
            event.persist();
            console.log(event);
            try {
            console.log(`look here ${event.target.id}`);
                await axios.delete(`https://cors-anywhere.herokuapp.com/https://devcon4-back.herokuapp.com/api/responses/${event.target.id}`)
            } catch(error){
                console.error(error)
            };
            };

    const [responseFormStatus, setResponseFormStatus] = useState(false);
    const openResponseForm = () => {
        try {
            setResponseFormStatus(true);
        }catch(error){
            console.error(error)
        };
    };
    const closeResponseForm = () => {
        try {
            setResponseFormStatus(false);
        }catch(error){
            console.error(error)
        }
    }

    const upVote = async (event) => {
        event.preventDefault();
        event.persist(); 
        try {
            const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://devcon4-back.herokuapp.com/api/responses/${event.target.id}`)
            const newVote = await response.data.votes + 1
            
            const resp = await axios.put(`https://cors-anywhere.herokuapp.com/https://devcon4-back.herokuapp.com/api/responses/${event.target.id}`, {votes: newVote});

        }catch(error){
            console.error(error)
        }
    }

    const downVote = async (event) => {
        event.preventDefault();
        event.persist(); 
        try {
            const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://devcon4-back.herokuapp.com/api/responses/${event.target.id}`)
            const newVote = await response.data.votes - 1
            
            const resp = await axios.put(`https://cors-anywhere.herokuapp.com/https://devcon4-back.herokuapp.com/api/responses/${event.target.id}`, {votes: newVote});

        }catch(error){
            console.error(error)
        }
    }



    return (
        <div>
            {
            responseFormStatus === false ? 
                <button style={{margin: '25px'}} className='button is-primary' onClick={openResponseForm}>Post a Response</button>
            // {responseFormStatus === true &&
            :
            <>
                {/* <div className='card'>
                    <div style={{paddingBottom: '0'}} className='card-content'>
                        <div className='media-content'>
                            <p className='title is-4'></p>'
                        </div>
                    </div>
                </div> */}
                
                
                <h2>Response Form</h2>
                <button className='button is-primary' onClick={closeResponseForm}>Close Response Form</button>

                <form style={{boxShadow: '1px 1px 10px 1px rgba(10,10,10,1)', borderRadius: '2px', padding: '30px'}} className='myforms' onSubmit={handleResponseSubmit}>
                    <label htmlFor='body'>Response</label>
                    <input className='input is-small'
                    type='text'
                    id='body'
                    onChange={handleResponseChange}
                    value={responseFormInputs.body}
                    /><br />
                    <input className='button is-primary' type='submit' value='Post Response' />
                </form>
            </>
            }

            <div>
                {
                responses.map(res =>{
                    return(
                    <div key={res._id}>
                        {props.questionid === res.qid ?
                            <>
                            {/* run sorting algorithm - most likes first */}
                            
                            <div style={{boxShadow: '1px 1px 10px 1px rgba(10,10,10,1)', borderRadius: '2px'}}>
                                <div style={{paddingBottom: '0', backgroundColor: 'rgba(21, 90, 133, 0.394)'}} className='card-content'>
                                    <div className='media'>
                                        <div className='media-left'>
                                            <figure className='image is-48x48'>
                                                <img src='images/default.png' alt='user image'/>
                                            </figure>
                                        </div>
                                        <div className='media-content'>
                                            <p className='title is-4'>UserName</p>
                                            <p className='subtitle is-6'>{res.body}</p>
                                            <p className='subtitle is-6'>{`Votes: ${res.votes}`}</p><br />
                                        </div>
                                    </div>
                                </div>
                                <footer className='card-footer'>
                                    <div style={{display: 'flex', flexDirection: 'column'}}className='card-footer-item'>
                                        <form onSubmit={upVote} id={res._id}>
                                            <input className='button is-success is-small' type='submit' value='upvote'/>
                                        </form>
                                        <form onSubmit={downVote} id={res._id}>
                                            <input className='button is-danger is-small' type='submit' value='downvote'/>
                                        </form>
                                    </div>
                                    <div className='card-footer-item'>
                                        <form onSubmit={handleResponseDelete} id={res._id}>
                                            <input className='button is-dark is-small' type='submit' value='Delete Response'/>
                                        </form>
                                    </div>
                                </footer>
                            </div>
                                                        
                            {/* <p>{res.body}</p>
                            <p>Votes: {res.votes}</p>
                            <form onSubmit={upVote} id={res._id}>
                                <input className='button is-success' type='submit' value='upvote'/>
                            </form>
                            <form onSubmit={downVote} id={res._id}>
                                <input className='button is-danger' type='submit' value='downvote'/>
                            </form>
                            <p>{res.qid}</p>
                            <form onSubmit={handleResponseDelete} id={res._id}>
                                <input type='submit' value='Delete Response'/>
                            </form> */}
                            </>
                        : ''
                            // <p>{res._id} does not match {res.qid}</p>
                    }
                        
                    </div>
                    )
                })
                }
                {/* responses.map(res =>{
                    return(
                    <div key={res._id} style={{border: "1px solid red"}}>
                        <p>{res.body}</p>
                        <p>{res.qid}</p>
                        <form onSubmit={handleResponseDelete} id={res._id}>
                        <input type='submit' value='Delete Response'/>
                        </form>
                    </div>
                    )
                })
                } */}
            </div>


        </div>
    )
}