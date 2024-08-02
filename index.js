import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const rootElement = document.getElementById(process.env.REACT_APP_ROOT_ELEMENT_ID || 'root');
ReactDOM.render(<App />, rootElement);