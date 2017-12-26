import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './reducers'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

window.jQuery = window.$ = require('jquery/dist/jquery.slim.min');
window.Popper = require('popper.js');
window.Util = require('exports-loader?Util!bootstrap/js/dist/util'); // eslint-disable-line
window.Collapse = require('exports-loader?Collapse!bootstrap/js/dist/collapse'); // eslint-disable-line

let basename = process.env.NODE_ENV === 'development'
  ? '/'
  : '/admin/';

render(
  <Provider store={store}>
    <Router basename={basename}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
