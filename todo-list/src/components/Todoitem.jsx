

function ToDoItem({ task, deleteTask,editTask ,toggleCompleted}) {
    

  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <div>
        <input type="checkbox" checked={task.completed}
          onChange={() => toggleCompleted(task.id)} />
      </div>
      <div className="todo-item">
        <span>{task.task}</span>
        <div className="btn">
          <button className="edit" onClick={() => editTask(task)}>Edit</button>
          <button className="delete"  onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ToDoItem;