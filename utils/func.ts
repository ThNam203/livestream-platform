import { format } from "date-fns";

export const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "00:00";
  if (seconds < 0) return "00:00";
  const time = new Date(seconds * 1000);
  if (seconds > 3600) return format(time, "HH:mm:ss");
  return format(time, "mm:ss");
};

const wordColorList = [
  "text-red-400",
  "text-red-500",
  "text-blue-400",
  "text-blue-500",
  "text-green-400",
  "text-green-500",
  "text-yellow-400",
  "text-yellow-500",
  "text-pink-400",
  "text-pink-500",
  "text-purple-400",
  "text-purple-500",
  "text-indigo-400",
  "text-indigo-500",
  "text-cyan-400",
  "text-cyan-500",
  "text-teal-400",
  "text-teal-500",
  "text-gray-400",
  "text-gray-500",
];

export const getColorByMiliseconds = (seconds: number) => {
  const randomColor =
    wordColorList[Math.floor((seconds / 60) * wordColorList.length)];
  return randomColor;
};
