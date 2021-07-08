const axios = require("axios");

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    /* other custom settings */
});

module.exports = axiosInstance;
