import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog(props) {
  const [boardTitle, setBoardTitle] = React.useState("");

  return (
    <div>
      <Dialog open={props.open} onClose={props.close}>
        <DialogTitle>Create New Board</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can create boards to assign tasks to them in the future. This
            will help you in managing you work.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="board"
            label="Board Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setBoardTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cancel</Button>
          <Button onClick={() => props.createBoard(boardTitle)}>create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
