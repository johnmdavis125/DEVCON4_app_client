import React from 'react';

export default function LogInForm(props){
    return (
        <div>
            <h2>Log In</h2>

            <form>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' onChange={props.handleInput} />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='text' name='password' onChange={props.handleInput} />
                </div>

                <input type='submit' value='Submit' onClick={props.handleLogIn} />
            </form>
        </div>
    );
};