import React from 'react';
import {
  NavLink
} from 'react-router-dom';

const Menu = () => (
  <ul className="nav nav-pills mb-3">
    <li className="nav-item">
      <NavLink exact to="/" className="nav-link" activeClassName="active">Channels</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/filters" className="nav-link" activeClassName="active">Filters</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/topics" className="nav-link" activeClassName="active">Topics</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/top" className="nav-link" activeClassName="active">Top 10</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/users" className="nav-link disabled" activeClassName="active">Users</NavLink>
    </li>

  </ul>
);

export default Menu
