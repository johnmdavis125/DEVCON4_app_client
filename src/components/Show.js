import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ResponseForm from './ResponseForm';

export default function Show(props){
 
    const { _id, topic, body } = props.q

    const [myShownQuestion, setMyShownQuestion] = useState({});
    // const [responseFormStatus, setResponseFormStatus] = useState(false);

    const openShow = async (event) => {
        event.persist();
        try {
            const response = await axios.get(`http://localhost:3001/api/questions/${_id}`);
    
            await setMyShownQuestion({...myShownQuestion, ...response.data});
    
        }catch(error){
            console.error(error);
        };
      }

      const closeShow = () => {
        try {  
            setMyShownQuestion({});
        }catch(error){
            console.error(error);
        };
      }

    //   const openResponseForm = () => {
    //       try {
    //           setResponseFormStatus(true);
    //       }catch(error){
    //           console.error(error)
    //       };
    //   };

    return (
        <div style={{border: "1px solid blue"}}>
        {Object.keys(myShownQuestion).length < 1 ? 
            <button onClick={openShow}>Open Show Page</button>
        : 
        <>
            <h2>Show Page</h2>
            <h4>{_id}</h4>
            <h4>{topic}</h4>
            <h4>{body}</h4>  
            <button onClick={closeShow}>Close Show Page</button>

            <ResponseForm questionid={_id}/>
        </>
        }
        </div>
    )
}