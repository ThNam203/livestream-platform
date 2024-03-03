"use client";
import React, { useMemo } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

export const VideoJS = ({
  source,
}: {
  source: MediaStream;
}) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<Player | null>(null);
  const videoJsOptions = useMemo(
    () => ({
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
    }),
    []
  );

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current!.appendChild(videoElement);

      const player = (playerRef.current!! = videojs(
        videoElement,
        videoJsOptions,
        () => {}
      ));

      var vid = player.tech({ IWillNotUseThisInPlugins: true }).el() as HTMLVideoElement;
      vid.srcObject = source;
      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;
    }
  }, [videoJsOptions, videoRef, source]);

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
      <div ref={videoRef}/>
  );
};

export default VideoJS;
