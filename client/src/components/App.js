import React from "react";
import { Container } from "reactstrap";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./UserLogin/LoginPage";
import { ApiService } from "./ApiService";

export default function App() {
  const apiService = new ApiService()

  return (
    <div>
      <Container>
          <HomePage apiService={apiService} />
      </Container>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      

      <Container>
          <LoginPage apiService={apiService}/>
      </Container>
    </div>
  );
}
