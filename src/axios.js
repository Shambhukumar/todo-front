import axios from 'axios'

 const Axios = axios.create({
  baseURL: "https://sams-todo.herokuapp.com",
  withCredentials: true
})

export default Axios;