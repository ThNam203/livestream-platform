"use client";
import React, { useMemo } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import { set } from "video.js/dist/types/tech/middleware";
import "video.js/dist/video-js.css";

const StreamerVideoJS = ({ source }: { source: MediaStream }) => {
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
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current!.appendChild(videoElement);

      const player = (playerRef.current!! = videojs(
        videoElement,
        videoJsOptions,
        () => {}
      ));

      setSrcObjectForPlayer(player, source);
      // You could update an existing player in the `else` block here
      // on prop change, for example:
    }
  }, [videoRef, source]);

  function setSrcObjectForPlayer(vjsPlayer: Player, mediaStream: MediaStream | null) {
    if (!mediaStream) {
      return;
    }
    const videoElement = vjsPlayer.tech({}).el() as HTMLVideoElement;
    videoElement.srcObject = null;
    videoElement.srcObject = mediaStream;
    vjsPlayer.play = () => videoElement.play(); // works with that fix
    vjsPlayer.play();
  }
  

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

  return <div ref={videoRef} />;
};


const ConsumerVideoJS = (props: any) => {
  const videoRef = React.useRef<any>(null);
  const playerRef = React.useRef<any>(null);
  const {options, onReady} = props;

  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current!.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

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
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export {
  StreamerVideoJS,
  ConsumerVideoJS
};
