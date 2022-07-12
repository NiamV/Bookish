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

      <Container>
          <RegisterPage apiService={apiService}/>
      </Container>

      <BrowserRouter>
          <Routes>
              <Route path="/login"  element={<LoginPage apiService={apiService}/>} />
          </Routes>
      </BrowserRouter>

    </div>
  );
}
