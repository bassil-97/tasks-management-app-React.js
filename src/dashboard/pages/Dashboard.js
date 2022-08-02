import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useAuth } from "../../shared/hooks/auth-hook";

import Sidebar from "../components/Sidebar";
import AppBar from "../components/AppBar";

import Home from "./Home/Home";
import BoardPage from "./Board/BoardPage";
import Progress from "../../shared/components/UIElements/Progress";

export default function Dashboard() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { userId } = useAuth();

  const [fetchedBoards, setFetchedBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActiveBoard = (boardName) => setActiveBoard(boardName);

  const fetchBoards = async () => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/boards"
      );
      setFetchedBoards(responseData.boards);
    } catch (err) {}
  };

  const createBoard = async (title) => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/boards/create-board",
        "POST",
        JSON.stringify({
          title: title,
          creator: userId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      fetchBoards();
      handleClose();
    } catch (err) {}
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div>
      {isLoading && <Progress asOverlay />}
      <Sidebar
        userId={userId}
        boards={fetchedBoards}
        createBoard={createBoard}
        handleActiveBoard={handleActiveBoard}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <AppBar boards={fetchedBoards} activeBoard={activeBoard} />
      <div className="home">
        <Switch>
          <Route index path="/dashboard/home">
            <Home
              boards={fetchedBoards}
              handleActiveBoard={handleActiveBoard}
              handleClickOpen={handleClickOpen}
              userId={userId}
            />
          </Route>
          <Route path="/dashboard/home">
            <Home
              userId={userId}
              boards={fetchedBoards}
              handleActiveBoard={handleActiveBoard}
              handleClickOpen={handleClickOpen}
            />
          </Route>
          <Route path="/dashboard/:boardId">
            <BoardPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
