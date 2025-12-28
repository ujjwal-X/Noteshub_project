import React from "react";
import Card from "../Cards";
import { data } from "../Api";

function Tenth() {
  const tenthData = data.School.tenth.NCERT;
  return (
    <>
      <div className="wrapper">
        {tenthData.map((item) => {
          return <Card {...item} key={item.id} />;
        })}
      </div>
    </>
  );
}

export default Tenth;
