import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyles } from './components/GlobalStyle';
import {BrowserRouter} from "react-router-dom"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <GlobalStyles/>
    <App />
  </BrowserRouter>
);

