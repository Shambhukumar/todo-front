import React, { useState } from 'react';
import "./Todo.scss";
import { saveTodo, deleteTodo, updateTodo,logout,sortTodo } from "../../store/actions/auth";
import { connect } from "react-redux";
const Todo = (props) => {
    const [val, setVal] = useState("");
    const [edit, setEdit] = useState("");
    const [sortdate,setSortDate] = useState(false);
    const [priority, setPriority] = useState(false);
    const addToList = (e) => {
        e.preventDefault();
        const content = document.getElementById("Add-item").value;
        const priority = document.getElementById("Add-priority").value;
        props.saveTodo(content, priority)
    }
    const updateToList = (e,id) =>{
        e.preventDefault();
        const content = document.getElementById("Update-item").value;
        const priority = document.getElementById("Update-priority").value;
        props.updateTodo(content,priority,id)
        setEdit("")
    }
    const logout = () => {
        props.logout();
        window.location.reload()

    }
    const sort = (val)=>{
       let obj;
       if(val === "date"){
           obj={ "date": sortdate ? 1 : -1};
           setPriority(false) 
           setSortDate(!sortdate)
       }
       if(val === "priority"){
           obj={"priority": priority ? 1 : -1}
           setSortDate(false)
           setPriority(!priority)
       }   
        props.sortTodo(obj)
    }

    const UpdateComp = (props) => {
        const { func, content, priority, btn } = props;
        return (
            <form className="Todo-add" onSubmit={(e) => func(e)}>
                <div className="Todo-add-input">
                    <input id={`${btn}-item`} placeholder="Please add you item here" defaultValue={content} type="text" required />
                    <select name="Priority" id={`${btn}-priority`}>
                        {priority === "1" ? <option value="1" selected>High</option> : <option value="1">High</option>}
                        {priority === "2" ? <option value="2" selected>Mediam</option> : <option value="2">Mediam</option>}
                        {priority === "3" ? <option value="3" selected>Low</option> : <option value="3">Low</option>}
                        
                    </select>
                </div>
                <button type="submit" className={`Todo-add-${btn}`}>
                    {btn}
                </button>
            </form>)
    }
    return (
        <div className="Todo">
            <div className="Todo-mini">
                   <h4>Hi, {props.user.user.email}</h4>  <button onClick={() => logout()}>Logout</button>
                </div>
            <div className="Todo-Head">
                <h2>Todo List</h2>
            <UpdateComp func={addToList} btn="Add"/>
            </div>
            <div className="Todo-sort"><div onClick={()=> sort("date")}>Date<span className={sortdate ? "Todo-sort-down" : "Todo-sort-up"}></span></div> <div onClick={()=> sort("priority")}>Priority<span className={priority ? "Todo-sort-down" : "Todo-sort-up"}></span></div></div>
            <ul className="Todo-list">
              
                {props.user.todo.length >0 ? 
                    props.user.todo.map((e, el) => {
                    return (edit === e._id ? 
                    <li key={e._id} className="Todo-list-update"> 
                    <UpdateComp func={(element)=>updateToList(element, e._id)} 
                    content={e.content}
                     priority={e.priority} 
                     btn="Update"
                     /> <button onClick={()=> setEdit("")} className="Todo-list-cancel">Cancel</button>
                     </li>

                     : <li key={e._id}>
                         <div className="Todo-list-content">
                             <span className={`Todo-list-content-${e.priority}`}>{e.content}</span>
                         </div>
                    <span>{e.date.split(" ").splice(0,5).join(" ")}</span>
                    <div>
                     <button onClick={() => setEdit(e._id)} className="Todo-list-update-edit">Edit</button>
                    <button onClick={() => props.deleteTodo(e._id)} className="Todo-list-update-delete">Delete</button>
                    </div>
                    </li>)
                }): <div className="Todo-list-empty">Nothing To Show Please Add Something!!!!</div>}
            </ul>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        saveTodo: (content, priority) => saveTodo(content, priority, dispatch),
        updateTodo: (content, priority,id) => updateTodo(content, priority,id, dispatch),
        deleteTodo: (id) => deleteTodo(id, dispatch),
        sortTodo: (obj) => sortTodo(obj,dispatch),
        logout: () => logout()
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo)
