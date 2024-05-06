"use client";
import {
  Check,
  Fullscreen,
  FullscreenExit,
  Pause,
  PlayArrow,
  VolumeDown,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { Slider } from "@mui/material";
import { ClassValue } from "clsx";
import { LegacyRef, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import { cn } from "../../utils/cn";
import { formatTime } from "../../utils/func";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import dynamic from "next/dynamic";
const ReactPlayerWrapper = dynamic(() => import("./react_player_wrapper"), {
  ssr: false,
});

const playbackRates = {
  "0.5x": 0.5,
  "1x": 1.0,
  "1.5x": 1.5,
  "2x": 2.0,
};

const resolutions = {
  "360p": 360,
  "480p": 480,
  "720p": 720,
  "1080p": 1080,
};

export type VideoInfo = {
  videoUrl: string;
  videoTitle: string;
  streamer: {
    name: string;
    // more info
  };
};

type Config = {
  playbackRate: number;
  resolution: number;
  volumeValue: number;
  isFullscreen: boolean;
  loop: boolean;
  pip: boolean;
};

type FnControl = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekToTime: (time: number) => void;
  handleVolumeChange: (value: number) => void;
  onFullScreen: () => void;
  onExitFullScreen: () => void;
  handlePlaybackRateChange: (value: number) => void;
  handleResolutionChange: (value: number) => void;
};

export function StreamingFrame({
  videoInfo,
  className,
  onVideoStart,
}: {
  videoInfo: VideoInfo;
  onVideoStart?: () => void;
  className?: ClassValue;
}) {
  const ref: LegacyRef<ReactPlayer> = useRef(null);
  const [count, setCount] = useState(0); // for hide control bar
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // for loading spinner
  const [currentTime, setCurrentTime] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [config, setConfig] = useState<Config>({
    playbackRate: 1.0,
    resolution: 720,
    volumeValue: 100,
    isFullscreen: false,
    loop: false,
    pip: false, // Picture in Picture (the browser support this feature, not need to make it true)
  });

  const [fnControl, setFnControl] = useState<FnControl>({
    playVideo: () => playVideo(),
    pauseVideo: () => pauseVideo(),
    seekToTime: (time: number) => seekToTime(time),
    handleVolumeChange: (value: number) => handleVolumeChange(value),
    onFullScreen: () => onFullScreen(),
    onExitFullScreen: () => onExitFullScreen(),
    handlePlaybackRateChange: (value: number) =>
      handlePlaybackRateChange(value),
    handleResolutionChange: (value: number) => handleResolutionChange(value),
  });

  const handleVolumeChange = (value: number) => {
    setConfig({ ...config, volumeValue: value });
  };

  const playVideo = () => {
    setIsPlaying(true);
    if (onVideoStart && currentTime === 0) onVideoStart();
  };

  const pauseVideo = () => {
    setIsPlaying(false);
  };

  const seekToTime = (time: number) => {
    console.log("ref", ref);
    if (ref.current) {
      setCurrentTime(time);
      ref.current.seekTo(time);
    }
  };

  const onFullScreen = () => {
    const element = document.getElementById("frame");
    if (screenfull.isEnabled && element) {
      screenfull.request(element);
      setConfig({ ...config, isFullscreen: true });
    }
  };

  const onExitFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.exit();
      setConfig({ ...config, isFullscreen: false });
    }
  };

  const handlePlaybackRateChange = (value: number) => {
    setConfig({ ...config, playbackRate: value });
  };

  const handleResolutionChange = (value: number) => {
    setConfig({ ...config, resolution: value });
  };

  return (
    <div className={cn("w-[1024px] relative", className)}>
      {isLoading && (
        <div className="w-full z-30 absolute top-0">
          <Skeleton width="100%" height="600px" borderRadius="0" />
        </div>
      )}

      <div
        className="w-full relative"
        id="frame"
        onMouseMove={() => {
          setCount(0);
        }}
        onClick={() => {
          setCount(0);
        }}
      >
        <ReactPlayerWrapper
          playerref={ref}
          url={videoInfo.videoUrl}
          onReady={() => setIsLoading(false)}
          muted={config.volumeValue === 0 ? true : false}
          volume={config.volumeValue / 100}
          playing={isPlaying}
          width={"100%"}
          height={"100%"}
          playbackRate={config.playbackRate}
          loop={config.loop}
          onProgress={(state) => {
            setCount(count + 1);

            setLoaded(state.loaded);
            setCurrentTime(state.playedSeconds);
          }}
          onDuration={(duration) => {
            setDuration(duration);
          }}
        />

        <FrontOfVideo
          isPlaying={isPlaying}
          currentTime={currentTime}
          loaded={loaded}
          config={config}
          fnControl={fnControl}
          duration={duration}
          videoInfo={videoInfo}
          className={count > 3 ? "opacity-0" : "opacity-100"}
        />
      </div>
    </div>
  );
}

function FrontOfVideo({
  isPlaying,
  currentTime,
  loaded,
  config,
  fnControl,
  duration,
  videoInfo,
  className,
}: {
  isPlaying: boolean;
  currentTime: number;
  loaded: number;
  config: Config;
  fnControl: FnControl;
  duration: number;
  videoInfo: VideoInfo;
  className?: ClassValue;
}) {
  return (
    <div
      className={cn(
        "absolute top-0 w-full h-full flex flex-col items-center justify-end",
        className
      )}
    >
      <div className="absolute top-4 left-4 right-4 text-white  font-bold font-sans flex flex-row items-center justify-between">
        <span className="bg-black/70 rounded px-2 py-1">
          {videoInfo.videoTitle}
        </span>
        <span className="bg-black/70 rounded px-2 py-1">
          {videoInfo.streamer.name}
        </span>
      </div>
      <div
        className="h-full w-full flex items-center justify-center"
        onMouseUp={() => {
          if (isPlaying) {
            if (fnControl.pauseVideo) fnControl.pauseVideo();
          } else {
            if (fnControl.playVideo) fnControl.playVideo();
          }
        }}
      >
        {!isPlaying && (
          <PlayArrow
            sx={{ fontSize: 100 }}
            className="text-white cursor-pointer"
          />
        )}
      </div>

      <VideoControl
        isPlaying={isPlaying}
        currentTime={currentTime}
        loaded={loaded}
        config={config}
        fnControl={fnControl}
        duration={duration}
      />
    </div>
  );
}

function VideoControl({
  isPlaying,
  currentTime,
  loaded,
  config,
  fnControl,
  duration,
  className,
}: {
  isPlaying: boolean;
  currentTime: number;
  loaded: number;
  config: Config;
  fnControl: FnControl;
  duration: number;
  className?: ClassValue;
}) {
  return (
    <div
      className={cn(
        "w-11/12 h-fit pb-4 bg-transparent flex flex-col items-center justify-center",
        className
      )}
    >
      <VideoTracking
        className="w-full"
        isPlaying={isPlaying}
        currentTime={currentTime}
        loaded={loaded}
        config={config}
        fnControl={fnControl}
        duration={duration}
      />
      <VideoControlButtons
        className="w-full"
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        config={config}
        fnControl={fnControl}
      />
    </div>
  );
}

function VideoTracking({
  className,
  isPlaying,
  currentTime,
  loaded,
  config,
  duration,
  fnControl,
}: {
  className?: ClassValue;
  isPlaying: boolean;
  currentTime: number;
  loaded: number;
  config: Config;
  duration: number;
  fnControl: FnControl;
}) {
  return (
    <div
      className={cn(
        "w-full bg-transparent flex items-center justify-center",
        className
      )}
    >
      <Slider
        value={duration !== 0 ? (currentTime / duration) * 100 : 0}
        onChange={(e: any) => {
          if (fnControl.seekToTime)
            fnControl.seekToTime((e.target.value / 100) * duration);
        }}
        size="small"
      />
    </div>
  );
}

function VideoControlButtons({
  className,
  isPlaying,
  currentTime,
  duration,
  config,
  fnControl,
}: {
  className?: ClassValue;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  config: Config;
  fnControl: FnControl;
}) {
  return (
    <div
      className={cn(
        "w-full flex flex-row items-center justify-between text-white",
        className
      )}
    >
      <div className="flex flex-row items-center gap-6">
        <div
          onClick={() => {
            if (isPlaying) {
              if (fnControl.pauseVideo) fnControl.pauseVideo();
            } else {
              if (fnControl.playVideo) fnControl.playVideo();
            }
          }}
        >
          {isPlaying ? (
            <Pause
              sx={{ fontSize: 24 }}
              className="text-white cursor-pointer"
            />
          ) : (
            <PlayArrow
              sx={{ fontSize: 24 }}
              className="text-white cursor-pointer"
            />
          )}
        </div>
        <VolumeButton onVolumeChange={fnControl.handleVolumeChange} />
        <span className="text-white">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <div className="flex flex-row items-center gap-4">
        <Combobox
          options={Object.keys(playbackRates)}
          value={config.playbackRate + "x"}
          onChange={(value: string) =>
            fnControl.handlePlaybackRateChange(
              playbackRates[value as keyof typeof playbackRates]
            )
          }
        />

        <Combobox
          options={Object.keys(resolutions)}
          value={config.resolution + "p"}
          onChange={(value: string) =>
            fnControl.handleResolutionChange(
              resolutions[value as keyof typeof resolutions]
            )
          }
        />

        <div
          onClick={() => {
            if (screenfull.isFullscreen) {
              if (fnControl.onExitFullScreen) fnControl.onExitFullScreen();
            } else {
              if (fnControl.onFullScreen) fnControl.onFullScreen();
            }
          }}
        >
          {config.isFullscreen ? (
            <FullscreenExit
              sx={{ fontSize: 24 }}
              className="text-white cursor-pointer"
            />
          ) : (
            <Fullscreen
              sx={{ fontSize: 24 }}
              className="text-white cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function VolumeButton({
  onVolumeChange,
}: {
  onVolumeChange: (value: number) => void;
}) {
  const [volumeValue, setVolumeValue] = useState(100);
  const [currentVolume, setCurrentVolume] = useState(100);

  const handleVolumeChange = (value: number) => {
    setVolumeValue(value);
    if (onVolumeChange) onVolumeChange(value);
  };

  useEffect(() => {
    if (volumeValue !== 0) setCurrentVolume(volumeValue);
  }, [volumeValue]);

  return (
    <div className="w-[120px] flex flex-row items-center gap-4">
      <div
        className="text-white cursor-pointer"
        onClick={() => {
          if (volumeValue === 0) handleVolumeChange(currentVolume);
          else handleVolumeChange(0);
        }}
      >
        {volumeValue === 0 && <VolumeOff sx={{ fontSize: 24 }} />}
        {volumeValue > 0 && volumeValue < 50 && (
          <VolumeDown sx={{ fontSize: 24 }} />
        )}
        {volumeValue >= 50 && <VolumeUp sx={{ fontSize: 24 }} />}
      </div>
      <Slider
        value={volumeValue}
        onChange={(e: any) => handleVolumeChange(e.target.value)}
        size="small"
      />
    </div>
  );
}

const Combobox = ({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const handleValueChange = (value: string) => {
    if (onChange) onChange(value);
    setShowOptions(false);
  };
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShowOptions(false);
    } else setShowOptions(!showOptions);
  };

  return (
    <div
      ref={ref}
      className="relative flex flex-row items-center justify-center gap-4 cursor-pointer"
    >
      <div
        className={cn("text-white cursor-pointer")}
        onClick={(e: any) => handleClick(e)}
      >
        {value}
      </div>
      {showOptions && (
        <div className="absolute bottom-full w-fit h-fit px-1 py-1 bg-black/70 flex flex-col items-center rounded-md">
          {options.map((option) => (
            <div
              key={option}
              className={cn(
                "text-white border-0 outline-none cursor-pointer flex flex-row items-center justify-start gap-2 hover:bg-white/20 rounded"
              )}
              onClick={() => handleValueChange(option)}
            >
              <span className="w-[20px]">
                {value === option ? <Check /> : null}
              </span>
              <p className="w-[70px]">{option}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
