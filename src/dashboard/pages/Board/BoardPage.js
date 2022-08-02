import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import TodoSection from "../../../Board/components/todoSection/TodoSection";
import AddNewTaskForm from "../../../Tasks/AddNewTaskForm";
import Progress from "../../../shared/components/UIElements/Progress";
import "./BoardPage.css";

export default function BoardPage() {
  const boardId = useParams().boardId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [tasks, setTasks] = useState({
    todo: [],
    doing: [],
    done: [],
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchTasks = async () => {
    const responseData = await sendRequest(
      process.env.REACT_APP_BACKEND_URL + `/boards/${boardId}`
    );
    setTasks({
      todo: responseData?.tasks?.filter((task) => task.status === "todo"),
      doing: responseData?.tasks?.filter((task) => task.status === "doing"),
      done: responseData?.tasks?.filter((task) => task.status === "done"),
    });
  };

  const createTask = async (title, description, status, priority) => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/boards/add-task/${boardId}`,
        "POST",
        JSON.stringify({
          title: title,
          description: description,
          status: status,
          priority: priority,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      fetchTasks();
      handleClose();
    } catch (err) {}
  };

  const deleteTask = async (taskId) => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/boards/delete-task/${taskId}`,
        "DELETE"
      );
    } catch (err) {}
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, [boardId]);

  return (
    <>
      {isLoading && <Progress asOverlay />}
      <AddNewTaskForm createTask={createTask} open={open} close={handleClose} />
      <div className="board-page">
        <TodoSection
          tasks={tasks?.todo}
          status={"todo"}
          handleClickOpen={handleClickOpen}
          handleDelete={deleteTask}
          fetchTasks={fetchTasks}
          todo
        />
        <TodoSection
          tasks={tasks?.doing}
          status={"doing"}
          handleClickOpen={handleClickOpen}
          handleDelete={deleteTask}
          fetchTasks={fetchTasks}
          doing
        />
        <TodoSection
          tasks={tasks?.done}
          status={"done"}
          handleClickOpen={handleClickOpen}
          handleDelete={deleteTask}
          fetchTasks={fetchTasks}
          done
        />
      </div>
    </>
  );
}
