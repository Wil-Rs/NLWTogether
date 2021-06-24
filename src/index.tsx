import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Music } from './components/Music';

import './services/firebase'
import './styles/global.scss'

ReactDOM.render(
  <React.StrictMode>
    <Music />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
