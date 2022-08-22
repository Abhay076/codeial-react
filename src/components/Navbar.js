import React from 'react';
import { Link } from 'react-router-dom';
function Navbar(props) {
  return (
    <nav className="nav">
      <div className="left-div">
        <Link to="/">
          <img
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="search-container">
        <img
          className="search-icon"
          src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
          alt="search-icon"
        />
        <input placeholder="Search" />

        <div className="search-results">
          <ul>
            <li className="search-results-row">
              <img
                src="https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1661068334~hmac=df652c14502263acfe6f24e1a308826a"
                alt="user-dp"
              />
              <span>John Doe</span>
            </li>
            <li className="search-results-row">
              <img
                src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1661068243~hmac=91fa670a2a8ee3afaa2c220a1571c637"
                alt="user-dp"
              />
              <span>John Doe</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-nav">
        <div className="user">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
            alt="user-dp"
            id="user-dp"
          />
          <span>John Doe</span>
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/logout">Log out</Link>
            </li>
            <li>
              <Link to="signup">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
