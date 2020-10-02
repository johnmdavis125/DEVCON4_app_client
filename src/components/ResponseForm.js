import React, {useState, useEffect} from 'react';
import axios from 'axios';

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
            const response = await fetch('http://localhost:3001/api/responses'); 
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
            const response = await axios.post('http://localhost:3001/api/responses', responseFormInputs);
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
                await axios.delete(`http://localhost:3001/api/responses/${event.target.id}`)
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
            const response = await axios.get(`http://localhost:3001/api/responses/${event.target.id}`)
            const newVote = await response.data.votes + 1
            
            const resp = await axios.put(`http://localhost:3001/api/responses/${event.target.id}`, {votes: newVote});

        }catch(error){
            console.error(error)
        }
    }

    const downVote = async (event) => {
        event.preventDefault();
        event.persist(); 
        try {
            const response = await axios.get(`http://localhost:3001/api/responses/${event.target.id}`)
            const newVote = await response.data.votes - 1
            
            const resp = await axios.put(`http://localhost:3001/api/responses/${event.target.id}`, {votes: newVote});

        }catch(error){
            console.error(error)
        }
    }

    // useEffect(
    //     () => {
    //     (
    //         async function (){
    //         await console.log(`this is responseUpdate from useEffect ${responseUpdate.votes}, ${responseUpdate.body}`);
    //         await responseUpdate.votes++;
    //         await console.log(`this is responseUpdate.votes plus 1 ${responseUpdate.votes}`)
    //     }
    //     )()
    //     }, [responseUpdate])


    // const addVote = async (event) => {
    //     event.preventDefault();
    //     event.persist();
    //     try {
    //         const response = await axios.put(`http://localhost:3001/api/responses/${event.target.id}`, {votes: responseUpdate.votes});
    //         await setResponseUpdate({})
    //     }catch(error){
    //         console.error(error)
    //     }
    // }

    // const handleQuestionUpdateSubmit = async (event) => {
    //     event.preventDefault();
    //     const response = await axios.put(`http://localhost:3001/api/questions/${event.target.id}`, {topic: questionUpdate.topic, body: questionUpdate.body});
    //     await setQuestionUpdate({});
    
    // }





    return (
        <div style={{border: "1px solid green"}}>
            <button onClick={openResponseForm}>Post a Response</button>
            {responseFormStatus === true &&
            <>
                <h4>Response Form</h4>
                <button onClick={closeResponseForm}>Close Response Form</button>

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
                </form>
            </>
            }

            <div>
                {
                responses.map(res =>{
                    return(
                    <div key={res._id} style={{border: "1px solid red"}}>
                        {props.questionid === res.qid ?
                            <>
                            <p>{res.body}</p>
                            <p>Votes: {res.votes}</p>
                            <form onSubmit={upVote} id={res._id}>
                                <input type='submit' value='upvote'/>
                            </form>
                            <form onSubmit={downVote} id={res._id}>
                                <input type='submit' value='downvote'/>
                            </form>
                            <p>{res.qid}</p>
                            <form onSubmit={handleResponseDelete} id={res._id}>
                                <input type='submit' value='Delete Response'/>
                            </form>
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