import axios from 'axios';

// API 文件 https://course-ec-api.hexschool.io/document?javascript#frontend-login

// User 相關的 api
const userRequest = axios.create({
  baseURL: 'https://course-ec-api.hexschool.io/api/auth/',
});

export const apiUserLogin = (data) => userRequest.post('login', data);
export const apiUserLogout = (data) => userRequest.post('logout', data);
export const apiUserCheck = (data) => userRequest.post('check', data);
