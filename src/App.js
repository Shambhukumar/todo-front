import {useEffect} from "react"
import './App.css';
import Login from "./Component/Login/Login";
import Todo from "./Component/Todo/Todo";
import {getTodo} from "./store/actions/auth";
import {connect} from "react-redux";

const App=(props)=> {

  useEffect(() => {
    props.getTodo()
  }, [props.isAuthenticated])
  

  return (
    <div>
     { props.isAuthenticated ? <Todo/> : <Login/>}
    </div>
  );
}

const mapStateToProps = (state) =>{
  return{
    user: state.user,
    isAuthenticated: state.user.isAuthenticated
  }
    
}

const mapDispatchToProps=(dispatch)=>{
  return{
     getTodo: ()=> getTodo(dispatch)
  }
 
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
