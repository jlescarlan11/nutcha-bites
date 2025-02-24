// AdVideo.jsx
import React from "react";
import localVideo from "../assets/localvid.mp4"; // Adjust the path as needed

const AdVideo = () => {
  return (
    <section id="ad-video" className="relative py-12 px-4 bg-black">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Watch Our Story</h2>
        <p className="text-white mb-8">
          Discover the passion and innovation behind Nutcha Bites through our
          captivating video.
        </p>
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <video
            controls
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          >
            <source src={localVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default AdVideo;
