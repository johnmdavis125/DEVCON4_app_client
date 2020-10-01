import React from 'react';

export default function LogOut(props) {
    return (
        <div>
            <h2>Log Out</h2>

            <form>
                <input type='submit' value='Log Out' onClick={props.handleLogOut} />
            </form>
        </div>
    );
};