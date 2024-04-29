"use client";
import { ConsumerVideoJS, StreamerVideoJS } from "@/components/video";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import socket from "@/socket";
import videojs from "video.js";
import {
  StreamingPage,
  VideoInfo,
} from "@/components/custom_react_player/streaming_frame";

export default function LivestreamingDemo() {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [mixedStream, setMixedStream] = useState<MediaStream | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }

    function onDisconnect() {
      console.log("disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const setupStreams = async () => {
    const videoStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
        sampleRate: 44100,
      },
    });

    const micStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        noiseSuppression: true,
        echoCancellation: true,
        sampleRate: 44100,
      },
    });

    videoStream.getVideoTracks()[0].onended = () => {
      alert("Your screen sharing has ended");
      setVideoStream(null);
      setMicStream(null);
      setMixedStream(null);

      if (recorder) {
        recorder.stop();
        setRecorder(null);
      }
    };

    setVideoStream(videoStream);
    setMicStream(micStream);
  };

  useEffect(() => {
    if (videoStream && micStream) {
      const mixedStream = new MediaStream([
        ...videoStream.getTracks(),
        ...micStream.getTracks(),
      ]);

      const recorder = new MediaRecorder(mixedStream, {
        mimeType: "video/webm",
      });

      socket.emit("config_rtmpDestination", "rtmp://10.0.188.191/live/nam");
      socket.emit("start", "start");

      recorder.ondataavailable = (event) => {
        socket.emit("binarystream", event.data);
      };

      recorder.start(200);
      setRecorder(recorder);
      setMixedStream(mixedStream);
    }
  }, [videoStream, micStream]);

  const startRecording = () => {
    setupStreams();
  };

  const videoInfo: VideoInfo = {
    videoTitle: "Live Streaming",
    streamer: {
      name: "Streamer",
    },
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  };

  return <StreamingPage videoInfo={videoInfo} />;
}
