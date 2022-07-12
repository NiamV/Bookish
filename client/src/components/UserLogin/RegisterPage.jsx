import React, { Component, useState } from "react";
import {
  RegisterDiv,
  LoginTitleTag,
  LoginTitleContainer,
} from "./LoginComponents";

export function RegisterPage(props) {
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