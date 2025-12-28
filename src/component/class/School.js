import React from "react";
import "./School.css";
import { Link, Outlet } from "react-router-dom";

function School() {
  return (
    <>
      <h1 className="m-6 text-center font-bold text-5xl">School</h1>

      <div className="help-layout">
        <nav>
          <Link className="hover" to="Tenth">
            10
          </Link>
          <Link className="hover" to="Twelth">
            12
          </Link>
          <Link className="hover" to="Jee">
            JEE
          </Link>
          <Link className="hover" to="Neet">
            NEET
          </Link>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default School;
