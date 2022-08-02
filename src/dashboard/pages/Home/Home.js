import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function Home({
  boards,
  userId,
  handleActiveBoard,
  handleClickOpen,
}) {
  return (
    <div className="home-wrapper">
      {boards?.length > 0 ? (
        boards
          .filter((el) => el.creator == userId)
          .map((board) => {
            return (
              <Link
                key={board?.id}
                to={`/dashboard/${board?.id}`}
                className="board-item-link board-item"
                onClick={() => handleActiveBoard(board?.title)}
              >
                {board?.title}
              </Link>
            );
          })
      ) : (
        <div className="create-new-board-container">
          <h3 className="mb-5 text-capitalize">There is no boards</h3>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            startIcon={<AddIcon />}
          >
            create new board
          </Button>
          {/*<button className="create-board-btn-home" >
            <i className="bx bx-plus icon"></i>
            <span className="nav-text text-capitalize">create new board</span>
      </button>*/}
        </div>
      )}
    </div>
  );
}
