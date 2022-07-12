import React, { useState } from "react";
import { Container } from "reactstrap";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./UserLogin/LoginPage";
import { RegisterPage } from "./UserLogin/RegisterPage";
import { ApiService } from "./ApiService";

export default function App() {
  const apiService = new ApiService()
  const [state, setState] = useState(BLANK_STATE);

  let healthCheck = () => {
    apiService.healthCheck().then((status) => {
      initialize(status);
    });
  };

  let books = () => {
    apiService.books().then((status) => {
      initialize(status);
    });
  };

  let initialize = (status) => {
    setState(status);
  };

  if (state === BLANK_STATE) {
    healthCheck()
  }

  return (
    <div>
      <Container>
          <HomePage apiService={apiService} okStatus={state.status} />
      </Container>

      <Container>
          <LoginPage apiService={apiService}/>
      </Container>

      <Container>
          <RegisterPage apiService={apiService}/>
      </Container>
    </div>
  );
}

const BLANK_STATE = {
  status: ""
};
