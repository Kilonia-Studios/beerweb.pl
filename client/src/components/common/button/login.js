import React from 'react';
import {GoogleLogin} from 'react-google-login'
import {clientId} from './../../../../config'
function sendIdToken(googleUser)
{
    var idToken = googleUser.getAuthResponse().id_token;
    console.log('Odebrany token ID:', idToken);

    var data = {
        idToken: idToken
      };
    
    fetch('http://localhost:3000/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('NETWORK ERROR: ' + response.statusText);
      }
      return response.json();
    })
    .then(responseData => {
      if(responseData.success===true)
      {
        window.location.href =responseData.message;
      }
    })
    .catch(error => {
      console.error('ERROR:', error);
    });
}
function Login()
{
    const onSuccess = (googleUser) => {
        console.log("LOGIN SUCCESS", googleUser.profileObj);
        sendIdToken(googleUser);
    }
    
    const onFailure = (googleUser) => {
        console.log("LOGIN FAIL", googleUser);
    }
    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}
export default Login;