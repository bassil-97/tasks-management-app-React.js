import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import BoardList from "./boardList/BoardList";
import FormDialog from "../../Board/components/Form";
import "./Sidebar.css";

export default function Sidebar({
  boards,
  createBoard,
  handleActiveBoard,
  open,
  handleClickOpen,
  handleClose,
  userId,
}) {
  const auth = useContext(AuthContext);

  useEffect(() => {
    const body = document.querySelector("body");
    let sidebar = body.querySelector(".sidebar");
    let toggle = body.querySelector(".toggle");
    let modeSwitch = body.querySelector(".toggle-switch");
    let modeText = body.querySelector(".mode-text");

    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    modeSwitch.addEventListener("click", () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
      } else {
        modeText.innerText = "Dark mode";
      }
    });
  }, []);

  return (
    <>
      <FormDialog createBoard={createBoard} open={open} close={handleClose} />
      <nav className="sidebar close">
        <header>
          <div className="image-text">
            <span className="image">
              {/*<!--<img src="logo.png" alt="">--> */}
              <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/32/228BE6/external-tasks-automation-technology-flaticons-flat-flat-icons.png" />
            </span>

            <div className="text logo-text">
              <span className="name">Kanban</span>
              <span className="profession">tasks management</span>
            </div>
          </div>

          <i className="bx bx-chevron-right toggle"></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <h6 className="ms-4 mb-4 fw-bold text-uppercase boards-count-text">
              All Boards ({boards?.filter((el) => el.creator == userId)?.length}
              )
            </h6>
            <BoardList
              boards={boards?.filter((el) => el.creator == userId)}
              handleActiveBoard={handleActiveBoard}
            />
            <button className="create-board-btn" onClick={handleClickOpen}>
              <i className="bx bx-plus icon"></i>
              <span className="text nav-text text-capitalize">
                create new board
              </span>
            </button>
          </div>

          <div className="bottom-content">
            <li className="">
              <i className="bx bx-log-out icon"></i>
              <span className="text nav-text" onClick={auth.logout}>
                Logout
              </span>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">Dark mode</span>

              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}
