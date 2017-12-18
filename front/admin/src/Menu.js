import React from 'react';
import {
  NavLink
} from 'react-router-dom';

const Menu = () => (
  <ul className="nav nav-pills mb-3">
    <li className="nav-item">
      <NavLink exact to="/" className="nav-link" activeClassName="active">Sources</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/filters" className="nav-link" activeClassName="active">Filters</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/topics" className="nav-link" activeClassName="active">Topics &times; 3</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/top" className="nav-link" activeClassName="active">Top 10</NavLink>
    </li>
    <li className="nav-item">
      <a href="#users" className="nav-link disabled">Users</a>
    </li>

  </ul>
);

export default Menu
