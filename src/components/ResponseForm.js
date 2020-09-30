import React, {useState, useEffect} from 'react';

export default function ResponseForm(props){

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

    return (
        <div style={{border: "1px solid green"}}>
            <button onClick={openResponseForm}>Post a Response</button>
            {responseFormStatus === true &&
            <>
                <h1>Response Form</h1>
                <button onClick={closeResponseForm}>Close Response Form</button>
                {/* <form onSubmit={handleResponseSubmit}>
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
            </>
            }
        </div>
    )
}