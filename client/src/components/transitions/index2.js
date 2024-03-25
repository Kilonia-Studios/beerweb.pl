import React from 'react';
import ReactDOM from 'react-dom';
import '../../styles/index.css';
import reportWebVitals from '../../tests/reportWebVitals';
import RatingForm from "../common/ratingForm";
import LogoutButton from "../common/button/logout";

const root = document.getElementById('root');
var buttondiv= document.createElement('buttondiv');
ReactDOM.render(
     <React.StrictMode>
        <RatingForm/>
        <LogoutButton />
      </React.StrictMode>,
      buttondiv
    );
root.appendChild(buttondiv);

reportWebVitals();
