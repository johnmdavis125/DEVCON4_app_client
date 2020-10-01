import React, { useState } from 'react';

export default function SignUpForm(props) {
      return (
        <div>
            <h2>Sign Up</h2>

            <form>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' name='email' onChange={props.handleInput} value={props.email} />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='text' id='password' name='password' onChange={props.handleInput} value={props.password} />
                </div>

                <input type='submit' value='Submit' onClick={props.handleSignUp} />
            </form>
        </div>
    );
};