import React from "react";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./UserLogin/LoginPage";
import { RegisterPage } from "./UserLogin/RegisterPage";
import { ApiService } from "./ApiService";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom"
import {UserPage} from "./UserLogin/UserPage";

export const apiContext = React.createContext(new ApiService())
export const loginContext = React.createContext({user: null})


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
