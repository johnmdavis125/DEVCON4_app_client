import React, {useState, useEffect} from 'react';

export default function Show(props){
    const [question, updateQuestion] = useState({}); 

    useEffect(()=>{
        (async ()=>{
            try{
                const response = await fetch('http:localhost:3001/api/questions/' + props.match.params.id); 
                const data = await response.json(); 
                data ? await updateQuestion(data) : updateQuestion({});
            }catch(error){
                console.error(error);
            }
        })();
    },[]);


    return (
        <div>
            {Object.keys(question).length > 0 ? (
                <div>
                    <h1>Question Show Page</h1>
                    <h2>Topic: {question.topic}</h2>
                    <h4>Question: {question.body}</h4> 
                </div>
            ) : (
                <h1>Question length is 0</h1>
            )}
        </div>
    )


}