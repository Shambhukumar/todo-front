import Axios from "../../axios";
export const AUTH_LOGIN = "AUTH_LOGIN"; 
export const AUTH_LOGOUT = "AUTH_LOGOUT"; 
export const GET_TODO = "GET_TODO";
export const AUTH_FAILED = "AUTH_FAILED";
export const SAVE_TODO = "SAVE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const SORT_TODO = "SORT_TODO";
export const AUTH_ERROR = "AUTH_ERROR"


export const authLogin = async(email,password, dispatch) =>{
    try{
    const res = await Axios.post("user",{
        email,
        password
    })
    console.log(res)
   return dispatch({type: AUTH_LOGIN, payload: res.data})
}catch(e){
    if(e.response.status === 401){
        return dispatch({type: AUTH_ERROR, payload: "Password is Wrong Try Again!!!"})
    }
}
}

export const getTodo = async(dispatch)=>{
    try{
    const res = await Axios.get("/getdata")
    console.log(res)
    return dispatch({type: GET_TODO, payload: res.data})
    }catch(e){
        console.log("inside error")
     return dispatch({type: AUTH_FAILED, payload: null})
    }
    
}

export const saveTodo = async(content,priority,dispatch)=>{
    const res = await Axios.post("/savedata",{
        content,
        priority
    })
    console.log(res)
    return dispatch({type: SAVE_TODO, payload: res.data})
    
}

export const updateTodo = async(content, priority,id,dispatch)=>{
    const res = await Axios.patch("/updatetodo",{
        content,
        priority,
        id
    })
    console.log(res)
    return dispatch({type: UPDATE_TODO, payload: res.data})
}

export const sortTodo = async(obj,dispatch)=>{
    try{
    const res = await Axios.post("/getsort",{
        obj
    })
    console.log(res)
    return dispatch({type: SORT_TODO, payload: res.data})
    }catch(e){
        console.log("inside error")
     return dispatch({type: AUTH_FAILED, payload: null})
    }
    
}

export const deleteTodo = async(id,dispatch)=>{
    const res = await Axios.post("/deletetodo",{
        id
    })
    console.log(res)
    return dispatch({type: DELETE_TODO, payload: res.data})
}

export const logout = async()=>{
    await Axios.get("/user/logout")
}