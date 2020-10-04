import React from 'react';
import './Forms.css';

export default function LogOut(props) {
    return (
        <div>
            <h2>Log Out</h2>

            <form className='myforms'>
                <input class='button is-primary' type='submit' value='Log Out' onClick={props.handleLogOut} />
            </form>
        </div>
    );
};