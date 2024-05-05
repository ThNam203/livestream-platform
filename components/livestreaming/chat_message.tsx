import { cn } from "@/utils/cn";
import { getColorByMiliseconds } from "@/utils/func";
import { format } from "date-fns";
import { useState } from "react";

export const LivestreamChatMessage = ({
  time,
  message,
  sender,
  type = "CHAT",
}: {
  time: Date;
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
  time: Date;
  sender: string;
  message: string;
}) => {
  const [_time, setTime] = useState(
    time.getHours() >= 1 ? format(time, "hh:MM:ss") : format(time, "MM:ss")
  );
  return (
    <div className="flex flex-row items-center gap-2 px-2 cursor-pointer">
      <span className="text-secondaryWord">{_time}</span>
      <span
        className={cn("font-bold", getColorByMiliseconds(time.getSeconds()))}
      >
        {sender}:
      </span>
      <span className="text-primaryWord">{message}</span>
    </div>
  );
};

const JoinMessage = ({ time, message }: { time: Date; message: string }) => {
  return (
    <div className="flex flex-row items-center gap-2 px-2 text-secondaryWord cursor-pointer rounded-md">
      <span className="text-secondaryWord">{format(time, "hh:MM:ss")}</span>
      <span
        className={cn("font-bold", getColorByMiliseconds(time.getSeconds()))}
      >
        {message}
      </span>
    </div>
  );
};

const LeaveMessage = ({ time, message }: { time: Date; message: string }) => {
  return (
    <div className="flex flex-row items-center gap-2 px-2 text-red-500 cursor-pointer rounded-md">
      <span className="text-secondaryWord">{format(time, "hh:MM:ss")}</span>
      <span
        className={cn("font-bold", getColorByMiliseconds(time.getSeconds()))}
      >
        {message}
      </span>
    </div>
  );
};
