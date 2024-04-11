import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = document.getElementById('root');

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  root
);

reportWebVitals();