import React from "react";

export const VideoSection = () => (
  <div className="w-full flex justify-center py-10 px-6">
    <div className="w-full max-w-[80vw] aspect-video rounded-3xl overflow-hidden shadow-md">
      <video
        src="/travel-video.mp4"
        autoPlay
        loop
        muted
        controls
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);
