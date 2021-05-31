import React from 'react';
import {
  Link
} from "react-router-dom";
import styles from './css/Nav.module.css';

export default function Nav({ links }) {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container">
        <span className={styles.header + " navbar-brand mb-0 h1"}>Seijo</span>
        <ul className="navbar-nav">
          {
            links.map((link, index) => 
              <li key={index} className="nav-item">
                <Link className="nav-link" to={link.path}>{link.name}</Link>
              </li>
            )
          }
        </ul>
      </div>
    </nav>
  );
}