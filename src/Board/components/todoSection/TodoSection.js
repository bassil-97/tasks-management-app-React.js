import React from "react";
import "./todoSection.css";

import TaskItem from "../../../Tasks/TaskItem";
import CreateTaskButton from "../../../shared/components/UIElements/CreateTaskButton";

export default function TodoSection({
  tasks,
  status,
  todo,
  doing,
  done,
  handleClickOpen,
  handleDelete,
  fetchTasks,
}) {
  return (
    <div className="todo-section">
      <div className="todo-section-header">
        <div
          className={`circle ${todo && "todo-circle"} ${
            doing && "doing-circle"
          } ${done && "done-circle"}`}
        />
        <small>
          {status} ( {tasks?.length} )
        </small>
      </div>
      <div className="tasks-list">
        {tasks?.length > 0 &&
          tasks?.map((task) => {
            return (
              <TaskItem
                key={task?._id}
                task={task}
                onDelete={handleDelete}
                fetchTasks={fetchTasks}
              />
            );
          })}
        <div className="center mt-2 w-100">
          <CreateTaskButton handleClickOpen={handleClickOpen} />
          {/*<button
            type="button"
            className="btn btn-primary todo-add-task-btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
          >
            + New
        </button>*/}
        </div>
      </div>
    </div>
  );
}
