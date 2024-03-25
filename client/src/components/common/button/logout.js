import React from 'react';
import {GoogleLogout} from 'react-google-login'
import {clientId} from './../../../../config'

function Logout()
{
    const onSuccess = (res) => {
        console.log("LOGOUT SUCCESS");
        window.location.href = 'http://localhost:3000/';

    }
    return (
        <div id="signInButton">
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}

            />
        </div>
    )
}
export default Logout;