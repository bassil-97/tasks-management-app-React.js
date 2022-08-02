import React from "react";
import "./TaskItem.css";
import UpdateTaskModal from "./UpdateTaskModal";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

export default function TaskItem({ task, onDelete, fetchTasks }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <UpdateTaskModal
          open={open}
          handleClose={handleClose}
          taskId={task?._id}
          fetchTasks={fetchTasks}
        />
      )}
      <div className="task-item">
        <div className="task-item-header mb-4">
          <h6>{task?.title}</h6>
          <Stack direction="row">
            <IconButton aria-label="delete" onClick={() => onDelete(task?._id)}>
              <DeleteOutlineIcon fontSize="small" style={{ fill: "#F44336" }} />
            </IconButton>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Stack>
        </div>
        <p className="mb-3 text-muted">{task?.description}</p>
        <small
          className={`task-priority ${
            task.priority === "LOW" && "priority-low"
          } ${task.priority === "MEDIUM" && "priority-mid"} ${
            task.priority === "HIGH" && "priority-high"
          }`}
        >
          {task?.priority}
        </small>
      </div>
    </>
  );
}
