import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useHttpClient } from "../shared/hooks/http-hook";

export default function UpdateTaskModal(props) {
  const [title, setTaskTitle] = React.useState("");
  const [description, setTaskDescription] = React.useState("");
  const [status, setTaskStatus] = React.useState("");
  const [priority, setTaskPriority] = React.useState("");

  const { sendRequest, isLoading } = useHttpClient();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/boards/tasks/${props.taskId}`
        );
        setTaskTitle(responseData?.task?.title);
        setTaskDescription(responseData?.task?.description);
        setTaskStatus(responseData?.task?.status);
        setTaskPriority(responseData?.task?.priority);
      } catch (err) {}
    };
    fetchTask();
  }, [props.taskId]);

  const taskUpdateSubmitHandler = async (taskId) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/boards/update-task/${taskId}`,
        "PATCH",
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
      props.fetchTasks();
      props.handleClose();
    } catch (err) {}
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can update tasks. This will help you in managing you work.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <FormControl variant="standard" fullWidth className="mt-4">
            <InputLabel id="demo-simple-select-standard-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={status}
              onChange={(e) => setTaskStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value={"todo"}>todo</MenuItem>
              <MenuItem value={"doing"}>doing</MenuItem>
              <MenuItem value={"done"}>done</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth className="mt-4">
            <InputLabel id="demo-simple-select-standard-label1">
              Priority
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label1"
              id="demo-simple-select-standard1"
              value={priority}
              onChange={(e) => setTaskPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value={"LOW"}>low</MenuItem>
              <MenuItem value={"MEDIUM"}>medium</MenuItem>
              <MenuItem value={"HIGH"}>high</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button
            onClick={() => taskUpdateSubmitHandler(props.taskId)}
            disabled={isLoading}
          >
            update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
