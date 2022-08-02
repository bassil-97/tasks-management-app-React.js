import * as React from "react";
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

export default function AddNewTaskForm(props) {
  const [title, setTaskTitle] = React.useState("");
  const [description, setTaskDescription] = React.useState("");
  const [status, setTaskStatus] = React.useState("");
  const [priority, setTaskPriority] = React.useState("");

  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can create boards to assign tasks to them in the future. This
            will help you in managing you work.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <FormControl variant="standard" fullWidth className="mt-4">
            <InputLabel id="task-status">Status</InputLabel>
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
            <InputLabel id="task-priority">Priority</InputLabel>
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
          <Button onClick={props.close}>Cancel</Button>
          <Button
            onClick={() =>
              props.createTask(title, description, status, priority)
            }
          >
            create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
