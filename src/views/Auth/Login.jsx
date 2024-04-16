import React from 'react';
import LoginComponent from '../../components/LoginComponent/LoginComponent';
import { useState,useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  return (

    
    <div>
      <LoginComponent></LoginComponent>
    </div>
  );
}
 
export default Login;
