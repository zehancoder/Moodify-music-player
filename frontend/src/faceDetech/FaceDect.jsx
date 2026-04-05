import { useEffect, useRef, useState } from "react";
import { detect, init } from "./utils/utils";
import { useDispatch } from "react-redux";
import { faceExpression, songState } from "../toolkit/slice";
import { getSongs } from "../features/auth/services/song.api";
export default function FaceExpression() {
  const dipatch = useDispatch();
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);
  let streamRef = useRef(null);
  const [expression, setExpression] = useState("surprised");

  // detecting face expressions
  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // send expression in the redux store
  const getSongsFunc = async (mood) => {
    const res = await getSongs({ mood });
    dipatch(songState(res.songs));
  };
  useEffect(() => {
    dipatch(faceExpression(expression));
    getSongsFunc(expression.toLowerCase());
  }, [expression]);
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ textAlign: "center" }}
    >
      <div>
        <h1 className="text-2xl mb-2` font-semibold text-white">
          Get song with your face expression{" "}
        </h1>
        <div className="text-xl text-[#cd3f64]  mb-4 font-bold font-mono">
          <span className="">Happy 😀 | </span>
          <span className="">Sad 😢|  </span>
          <span className="">Surprised 😮 </span>
        </div>
        <video
          ref={videoRef}
          style={{ width: "500px", borderRadius: "12px" }}
          playsInline
        />
        <h2>{expression}</h2>
        <button
          className="button mt-4"
          onClick={() => detect({ landmarkerRef, videoRef, setExpression })}
        >
          <div class="button-top">Detect expression</div>
          <div class="button-bottom"></div>
          <div class="button-base"></div>
        </button>
      </div>
    </div>
  );
}
