import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function IconLabelButtons({ handleClickOpen }) {
  return (
    <Button fullWidth startIcon={<AddIcon />} onClick={handleClickOpen}>
      add new task
    </Button>
  );
}
