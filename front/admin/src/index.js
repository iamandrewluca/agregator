import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

window.$ = window.jQuery = require('jquery/dist/jquery.slim.min');
window.Popper = require('popper.js');

window.Util = require('exports-loader?Util!bootstrap/js/dist/util'); // eslint-disable-line
window.Collapse = require('exports-loader?Collapse!bootstrap/js/dist/collapse'); // eslint-disable-line

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
