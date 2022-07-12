import React from "react";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage apiService={apiService} />} />
          <Route path="/register" element={<RegisterPage apiService={apiService} />} />
          <Route path="/login" element={<LoginPage apiService={apiService} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
