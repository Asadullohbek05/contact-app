import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Fragment>
    <ToastContainer autoClose={2000} draggable />
    <App />
  </Fragment>
);


