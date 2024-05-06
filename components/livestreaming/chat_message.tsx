import { cn } from "@/utils/cn";
import { formatTime, getColorBySeconds } from "@/utils/func";
import { format } from "date-fns";
import { useState } from "react";

export const LivestreamChatMessage = ({
  time,
  message,
  sender,
  type = "CHAT",
}: {
  time: string;
  sender: string;
  message: string;
  type: "JOIN" | "LEAVE" | "CHAT";
}) => {
  if (type === "JOIN") return <JoinMessage time={time} message={message} />;
  if (type === "LEAVE") return <LeaveMessage time={time} message={message} />;
  return <DefaultMessage time={time} message={message} sender={sender} />;
};

const DefaultMessage = ({
  time,
  message,
  sender,
}: {
  time: string;
  sender: string;
  message: string;
}) => {
  return (
    <div className="flex flex-row items-center gap-2 px-2 cursor-pointer">
      <span className="text-secondaryWord">{time}</span>
      <span
        className={cn("font-bold", getColorBySeconds(new Date().getSeconds()))}
      >
        {sender}:
      </span>
      <span className="text-primaryWord">{message}</span>
    </div>
  );
};

const JoinMessage = ({ time, message }: { time: string; message: string }) => {
  return (
    <div className="flex flex-row items-center gap-2 px-2 text-secondaryWord cursor-pointer rounded-md">
      <span className="text-secondaryWord">{time}</span>
      <span
        className={cn("font-bold", getColorBySeconds(new Date().getSeconds()))}
      >
        {message}
      </span>
    </div>
  );
};

const LeaveMessage = ({ time, message }: { time: string; message: string }) => {
  return (
    <div className="flex flex-row items-center gap-2 px-2 text-red-500 cursor-pointer rounded-md">
      <span className="text-secondaryWord">{time}</span>
      <span
        className={cn("font-bold", getColorBySeconds(new Date().getSeconds()))}
      >
        {message}
      </span>
    </div>
  );
};
