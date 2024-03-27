import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

console.log('baseUrl:', baseUrl); // Add this line for debugging

export const Register = async (firstName, lastName, email, password, phone) => {
    return await axios.post(`${baseUrl}/users/register`, {
        firstName,
        lastName,
        email,
        password,
        phone
    });
};

export const Login = async (email, password) => {
    return await axios.post(`${baseUrl}/users/login`, {
        email,
        password
    });
};
