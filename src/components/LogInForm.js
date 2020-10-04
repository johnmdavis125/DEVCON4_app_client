import React from 'react';
import './Forms.css';

export default function LogInForm(props){
    return (
        <div>
            <h2>Log In</h2>

            <form className='myforms'>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input class='input is-small' type='email' id='email' name='email' onChange={props.handleInput} value={props.email} />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input class='input is-small' type='password' id='password' name='password' onChange={props.handleInput} value={props.password}/>
                </div>

                <input class='button is-primary' type='submit' value='Submit' onClick={props.handleLogIn} />
            </form>
        </div>
    );
};