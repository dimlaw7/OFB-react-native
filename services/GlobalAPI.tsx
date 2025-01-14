const axios = require("axios").default;

interface LoginData {
  email: string;
  pass: string;
}

const authenticateUser = (data: LoginData) =>
  axios.post("http://192.168.0.102:3000/api/v1/user/login", {
    email: data.email,
    pass: data.pass,
  });

export default {
  authenticateUser,
};
