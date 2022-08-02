import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./LoadingSpinner.css";

export default function Progress(props) {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      <CircularProgress />
    </div>
  );
}
