import './Login.scss';
import Axios from "../../axios";
import {authLogin} from "../../store/actions/auth";
import {connect} from "react-redux";

const Login=(props)=> {

  const login = async(e) =>{
    e.preventDefault()
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    props.Login(email,password)
    console.log(props.user)

  }
  return (
    <div className="Login">
      
    <form className="Login-form" onSubmit={(e)=> login(e) }>
    <span>Todo List</span>
    {props.user.ErrorMessage && <div className="Login-form-error">{props.user.ErrorMessage}</div>}
    <div className="Login-form-input">
    <label>Email</label>
    <input id="email" type="email" required/>
    </div>
    <div className="Login-form-input">
    <label>Password</label>
    <input id="password" type="password" required/>
    </div>
    <button className="Login-form-button">
      Login or Registor
    </button>
    </form>
    </div>
  );
}

const mapStateToProps = (state) =>{
  return{
    user: state.user
  }
    
}

const mapDispatchToProps=(dispatch)=>{
  return{
     Login: (email,password)=> authLogin(email,password,dispatch)
  }
 
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
