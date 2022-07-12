import React, { Component, useState } from "react";
import {
  RegisterDiv,
  LoginTitleTag,
  LoginTitleContainer,
} from "./LoginComponents";

export function RegisterPage(props) {
  const [output, setOutput] = useState("");

  let handleRegistration = (event) => {
    event.preventDefault()
    props.apiService.user_create(event.target[0].value).then((response) => {
        if(response.hasOwnProperty("error")){
            setOutput(response.error)
        } else {
            setOutput(response.message)
        }
    })

  }

  return (
      <RegisterDiv>
        <LoginTitleContainer>
            <LoginTitleTag>Register</LoginTitleTag>

            <form onSubmit={handleRegistration}>
              <input type="text" placeholder={"Name"} />
              <input type="submit"/>
            </form>

        </LoginTitleContainer>
      </RegisterDiv>
  );
}