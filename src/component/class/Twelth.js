import React from "react";
import Card from "../Cards";
import { data } from "../Api";

function Twelth() {
  const twelthData = data.School.twelth.NCERT;
  console.log(twelthData);
  return (
    <>
      <div className="wrapper">
        {twelthData.map((item) => {
          return <Card {...item} key={item.id} />;
        })}
      </div>
    </>
  );
}

export default Twelth;
