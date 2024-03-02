"use client";
import React, { useMemo } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoJS = ({
  source,
  className,
}: {
  source: string;
  className: string;
}) => {
  const videoRef = React.useRef<any>(null);
  const playerRef = React.useRef<any>(null);
  const videoJsOptions = useMemo(
    () => ({
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: "/example_video.mp4",
          //   type: 'video/mp4'
        },
      ],
    }),
    []
  );

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current!! = videojs(
        videoElement,
        videoJsOptions,
        () => {}
      ));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(videoJsOptions.autoplay);
      player.src(videoJsOptions.sources);
    }
  }, [videoJsOptions, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player className={className}>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
