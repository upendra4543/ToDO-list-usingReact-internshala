import { useState } from "react";
import ToDoItem from "./Todoitem";
import "./style.css";

function ToDoList() {
  const [catchVal, setCatchVal] = useState("");      // Input value
  const [taskList, setTaskList] = useState([]);      // Array of tasks
  const [editId, setEditId] = useState(null);       // ID of the task being edited
   const [filterStatus, setFilterStatus] = useState("all");  

  const addTodos = (e) => {                        ///add todo function
    e.preventDefault(); //  Prevent page reload
    if (catchVal.trim() === "") return;
    if (editId) {
    // It's an edit
    const updatedTasks = taskList.map((task) =>
      task.id === editId ? { ...task, task: catchVal } : task
    );
    setTaskList(updatedTasks);
    setEditId(null);
  }else{
      const newTask = {
      id: Date.now().toString(), // Unique ID
      task: catchVal,
     completed: false 

    };

    setTaskList([newTask, ...taskList]);  // Add new task

  };
      setCatchVal("");         // Clear input
 
  }
   const deleteTask = (id) => {    ///// delete task function
  const updatedList = taskList.filter((task) => task.id !== id);
  setTaskList(updatedList);
};
const startEditing = (task) => {            /// edit task fuction
  setEditId(task.id);
  setCatchVal(task.task);  // Fill input with task to edit
};
const toggleCompleted = (id) => {
  const updatTasks = taskList.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  setTaskList(updatTasks);
};
const filteredTasks = taskList.filter((task) => {
  if (filterStatus === "completed") return task.completed;
  if (filterStatus === "pending") return !task.completed;
  return true; // for "all"
});
    

  return (
    <div className="container">
      <form onSubmit={addTodos}>
        <input
          type="text"
          value={catchVal}
          onChange={(e) => setCatchVal(e.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">{editId ? "Update Task" : "Add Task"}</button>
      </form>

      <div className="code-pen">
                <button onClick={() => setFilterStatus("all")}>All Tasks</button>
               <button onClick={() => setFilterStatus("completed")}>Completed</button>
               <button onClick={() => setFilterStatus("pending")}>Pending</button>
      </div>

      <div className="todo-item-container">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((item) => (
            <ToDoItem key={item.id} task={item} deleteTask={deleteTask} editTask={startEditing}  toggleCompleted={toggleCompleted}/>
          ))
        ) : (
          <p>No task available here</p>
        )}
      </div>

      <div className="counter">
        <span>All Tasks = {taskList.length}</span> {/*  Dynamic count */}
      </div>
    </div>
  );
}

export default ToDoList;














