import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ResponseForm from './ResponseForm';


export default function Show(props){
 
    const { _id, userName, userImage, category, topic, body } = props.q

    const [myShownQuestion, setMyShownQuestion] = useState({});
    // const [responseFormStatus, setResponseFormStatus] = useState(false);

    const openShow = async (event) => {
        event.persist();
        try {
            const response = await axios.get(`https://devcon4-front.herokuapp.com/api/questions/${_id}`);
    
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
        <div>
        {Object.keys(myShownQuestion).length < 1 ? 
            <button className='button is-info' onClick={openShow}>View Responses</button>
        : 
        <>
            <div className='card'>
                <div style={{paddingBottom: '0'}} className='card-content'>
                    <div className='media-content'>
                        <p className='title is-4'>{topic}</p>
                        {/* <p className='subtitle is-4'>{_id}</p> */}
                        <p className='subtitle is-6'>{`${userName} asks: ${body}`}</p>
                        <div className='subtitle is-6'>
                            <button className='button is-info is-small' onClick={closeShow}>Close Show Page</button>
                        </div>
                    </div>
                </div>
                <footer className='card-footer'>
                    <ResponseForm questionid={_id}/>
                </footer>


            </div>
{/* 
            <h4>{_id}</h4>
            <h4>{userName}</h4>
            <h4>{userImage}</h4>
            <h4>{category}</h4>
            <h4>{topic}</h4>
            <h4>{body}</h4> */}
            {/* <button onClick={closeShow}>Close Show Page</button> */}

            {/* <ResponseForm questionid={_id}/> */}
        </>
        }
        </div>
    )
}