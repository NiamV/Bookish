import React from "react";
import { Container } from "reactstrap";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./UserLogin/LoginPage";
import { RegisterPage } from "./UserLogin/RegisterPage";
import { ApiService } from "./ApiService";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom"

export default function App() {
  const apiService = new ApiService()

  return (
    <div>
      <Container>
          <HomePage apiService={apiService} />
      </Container>

      <Container>
          <LoginPage apiService={apiService}/>
      </Container>

      <Container>
          <RegisterPage apiService={apiService}/>
      </Container>

      <BrowserRouter>
          <Route path="/login"  element={<LoginPage apiService={apiService}/>} />
      </BrowserRouter>

    </div>
  );
}
