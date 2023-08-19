import { useState } from "react";
import video from '../assets/video.mp4';
import RegisterStepper from '../component/RegisterStepper';

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen relative">
      <video
        src={video} 
        type="video/mp4"
        loop
        muted
        controls={false}
        autoPlay
        className="w-full h-full object-cover"
      />
      <div className="absolute flex flex-col items-center justify-center md:py-1 top-0 left-0 right-0 bottom-0 bg-black/70">
        <div className="w-[90%] md:w-[70%] overflow-auto bg-white/80 shadow-2xl">
          <RegisterStepper />
        </div>
      </div>
    </div>
  );
};

export default Register;
