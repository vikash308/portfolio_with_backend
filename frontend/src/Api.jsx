let IS_PROD = false;

const server = IS_PROD
  ? "https://portfolio-j1sm.onrender.com"
  : "http://localhost:3000";



  import axios from "axios";

  axios.defaults.withCredentials = true;

export default server;