import React from "react";
import { Link } from "react-router-dom";
import "./BoardList.css";

export default function BoardList({ boards, handleActiveBoard }) {
  return (
    <>
      <ul className="menu-links">
        {boards?.length > 0 &&
          boards?.map((board) => {
            return (
              <li className="nav-link" key={board?.id}>
                <Link
                  to={`/dashboard/${board?.id}`}
                  onClick={() => handleActiveBoard(board?.title)}
                >
                  <i className="bx bxs-dashboard icon"></i>
                  <span className="text nav-text">{board?.title}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
