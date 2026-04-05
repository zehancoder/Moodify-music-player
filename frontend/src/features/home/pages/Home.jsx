import React from "react";
import FaceExpression from "../../../faceDetech/FaceDect";
import Player2 from "../../auth/components/Player2";
import Player from "../../auth/components/Player";

function Home() {
  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-3 gap-4">
        <div className=" lg:col-span-1">
          <FaceExpression />
        </div>
        <div className=" lg:col-span-2 w-full">
          <Player2 />
        </div>
      </div>
    </div>
  );
}

export default Home;
