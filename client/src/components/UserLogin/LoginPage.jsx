import React, { useState, useContext } from "react";
import {
    LoginDiv,
    LoginTitleTag,
    LoginTitleContainer, LoginFormContainer, UserBooksContainer,
} from "./LoginComponents";
import {apiContext, loginContext} from "../App";
import { Link, Navigate } from "react-router-dom"
import {Nav} from "reactstrap";

export function LoginPage(props) {
  // const [user, setUser] = useState(null);
  const [output, setOutput] = useState("");

  const apiService = useContext(apiContext)
  const loginService = useContext(loginContext)

    const [reroute, setReroute] = useState(<p></p>)

    let handleLogin = (event) => {
    event.preventDefault()
    apiService.isUser(event.target[0].value).then((response) => {
        if(response.result){
            loginService.user = event.target[0].value
            setOutput("")
            setReroute(<Navigate to={"/user"} replace={true} />)
        } else {
            setOutput("User does not exist, please register")
        }
    })

  }

  return (
      <LoginDiv>
        <LoginTitleContainer>
            <LoginTitleTag>Login</LoginTitleTag>
            <p>Please enter your library card number:</p>
        </LoginTitleContainer>

        <LoginFormContainer>
            <form onSubmit={handleLogin}>
              <input type="text" placeholder={"Library Card Number"} />
              <input type="submit"/>
            </form>

            {reroute}

            <p>{output}</p>

            <button><Link to={"/register"}>Register</Link></button>
        </LoginFormContainer>

        <UserBooksContainer>
            <button><Link to={"/"}>Back Home</Link></button>
        </UserBooksContainer>



      </LoginDiv>
  );
}