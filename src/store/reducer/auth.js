import {AUTH_FAILED, AUTH_LOGIN, SORT_TODO, DELETE_TODO, GET_TODO, SAVE_TODO, UPDATE_TODO, AUTH_ERROR} from "../actions/auth";
const intialState = {
    isAuthenticated: false,
    user: null,
    ErrorMessage: null,
    todo: []
    
}

const authReducer = (state=intialState, {type,payload}) =>{


    switch(type){
        case AUTH_LOGIN:
            return{
                ...state,
                user: payload.data,
                isAuthenticated: payload.isAuthenticated,


            }
            case GET_TODO:
                
                return{
                    ...state,
                    todo: payload.data,
                    user: payload.user,
                    isAuthenticated: payload.isAuthenticated
    
                }
                case AUTH_ERROR:
                    
                    return{
                        ...state,
                        ErrorMessage: payload
        
                    }
                case SAVE_TODO:
                    
                    return{
                        ...state,
                        todo: payload.data,
                        user: payload.user,
                        isAuthenticated: payload.isAuthenticated
        
                    }
                    case UPDATE_TODO:
                        
                        return{
                            ...state,
                            todo: payload.data,
                            user: payload.user,
                            isAuthenticated: payload.isAuthenticated
            
                        }
                        case SORT_TODO:
                            
                            return{
                                ...state,
                                todo: payload.data,
                                user: payload.user.user,
                                isAuthenticated: payload.isAuthenticated
                
                            }
                    case DELETE_TODO:
                        
                        return{
                            ...state,
                            todo: payload.data,
                            isAuthenticated: payload.isAuthenticated
            
                        }
                case AUTH_FAILED:
                    return{
                        ...state,
                        isAuthenticated: false
                    }
            default:
            return state
    }

}



export default authReducer;