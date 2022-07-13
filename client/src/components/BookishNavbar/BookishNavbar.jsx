import React, {useContext, useState} from "react"
import "./BookishNavbar.css"
import {loginContext, apiContext} from "../App";
import { Link, Navigate } from "react-router-dom"

export function BookishHeader(props) {
  const loginService = useContext(loginContext)
  let loginNavBar;

  const [username, setUsername] = useState("")

  const apiService = useContext(apiContext)

  apiService.user_name(loginService.user).then((response) => {
      //console.log(response)
      setUsername(response.user_name)
  })

  if(loginService.user == null){
    loginNavBar = (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
    )
  } else {
      loginNavBar = (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
              <Link to="/user">User: {username} </Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      )
  }



  return (
    <nav className="navigation">
      <a href="/" className="bookish">
        Bookish
      </a>
      <div
        className="navigation-menu">
          {loginNavBar}
      </div>
    </nav>
  );
}
