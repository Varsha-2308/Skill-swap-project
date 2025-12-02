// src/api/auth.js
import api from "./axios";

 

export const registerApi = (data) => {
  return api.post("/api/auth/register", data);  // POST http://localhost:8080/api/auth/register
};

export const loginApi = (data) => {
  return api.post("/api/auth/login", data);     // POST http://localhost:8080/api/auth/login
};