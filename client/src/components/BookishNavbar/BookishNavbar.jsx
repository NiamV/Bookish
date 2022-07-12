import React from "react"
import "./BookishNavbar.css"

export function BookishHeader(props) {
  return (
    <nav className="navigation">
      <a href="/" className="bookish">
        Bookish
      </a>
      <div
        className="navigation-menu">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/admin">Admin</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
