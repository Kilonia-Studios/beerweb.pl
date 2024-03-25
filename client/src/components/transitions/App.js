import React, { useEffect } from 'react';
import '../../styles/App.css';
import LoginButton from "../common/button/login";
import ErrorBoundary from '../common/errorBoundary';
import { gapi } from 'gapi-script';
import {clientId} from './../../../config'

function App() {
  useEffect(()=>{
    function start() {
      gapi.client.init({
        clientId:clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2',start);
  }, []);
  
  return (
    <ErrorBoundary>
      <div className="App">
        <LoginButton/>
      </div>
    </ErrorBoundary>

  );
}

export default App;
