import React from "react";
import { Outlet, Link } from "react-router-dom";

function College() {
  return (
    <>
      <div className="help-layout">
        <nav>
          <Link className="hover" to="First">
            1<sup>st</sup> Year
          </Link>
          <Link className="hover" to="Twelth">
            2<sup>nd</sup> Year
          </Link>
          <Link className="hover" to="Jee">
            3<sup>rd</sup> Year
          </Link>
          <Link className="hover" to="Neet">
            4<sup>th</sup> Year
          </Link>
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default College;
