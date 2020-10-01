import React from 'react';

export default function LogInForm(props){
    return (
        <div>
            <h2>Log In</h2>

            <form>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' name='email' onChange={props.handleInput} value={props.email} />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='text' id='password' name='password' onChange={props.handleInput} value={props.password}/>
                </div>

                <input type='submit' value='Submit' onClick={props.handleLogIn} />
            </form>
        </div>
    );
};