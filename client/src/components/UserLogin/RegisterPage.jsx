import React, { Component, useState, useContext } from "react";
import {
  RegisterDiv,
  LoginTitleTag,
  LoginTitleContainer,
} from "./LoginComponents";
import {apiContext} from "../App";
import {Link} from "react-router-dom";
import {BookishHeader} from "../BookishNavbar/BookishNavbar";

export function RegisterPage(props) {
  const [output, setOutput] = useState("");

  const apiService = useContext(apiContext)

  let handleRegistration = (event) => {
    event.preventDefault()
    apiService.user_create(event.target[0].value).then((response) => {
        if(response.hasOwnProperty("error")){
            setOutput(response.error)
        } else {
            setOutput(response.message)
        }
    })

  }

  return (
      <RegisterDiv>
        <BookishHeader />
        <LoginTitleContainer>
            <LoginTitleTag>Register</LoginTitleTag>

            <form onSubmit={handleRegistration}>
              <input type="text" placeholder={"Name"} />
              <input type="submit"/>
            </form>

            <p>{output}</p>

            <button><Link to={"/login"}>Back to Login Page</Link></button>

        </LoginTitleContainer>
      </RegisterDiv>
  );
}