import React from "react";
import "./AppBar.css";

import AccountMenu from "../../User/components/AccountMenu/AccountMenu";

export default function AppBar({ activeBoard }) {
  return (
    <div className="appbar">
      <h4 className="mb-0">{activeBoard}</h4>
      <AccountMenu />
    </div>
  );
}
