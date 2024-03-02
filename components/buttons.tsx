"use client";
import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";
import mrbeast_img from "../public/images/mrbeast.jpg";

const IconButton = ({
  className,
  icon,
  disabled = false,
}: {
  className?: ClassValue;
  icon: ReactNode;
  disabled?: boolean;
}) => {
  return (
    <button
      className={cn(
        "w-8 h-8 hover:bg-hoverColor disabled:hover:bg-transparent disabled:text-secondaryWord rounded flex flex-row items-center justify-center",
        className
      )}
      disabled={disabled}
      onClick={() => {
        console.log("clicked icon button");
      }}
    >
      {icon}
    </button>
  );
};

const TextButton = ({
  className,
  content,
  disabled = false,
  onClick,
}: {
  className?: ClassValue;
  content: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <button
      className={cn(
        "px-2 py-2 bg-gray-200 hover:bg-hoverColor disabled:hover:bg-transparent rounded text-xs font-bold text-gray-500 flex flex-row items-center justify-center cursor-pointer",
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

const TagButton = ({
  className,
  content,
  disabled = false,
}: {
  className?: ClassValue;
  content: string;
  disabled?: boolean;
}) => {
  return (
    <button
      className={cn(
        "px-2 py-1 bg-gray-200 hover:bg-hoverColor disabled:hover:bg-transparent rounded-xl text-xs font-semibold text-gray-500 flex flex-row items-center justify-center cursor-pointer",
        className
      )}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

const RoundedIconButton = ({
  className,
  icon,
}: {
  className?: ClassValue;
  icon: ReactNode;
}) => {
  return (
    <button
      className={cn(
        "w-8 h-8 rounded-full flex flex-row items-center justify-center",
        className
      )}
    >
      {icon}
    </button>
  );
};

const RoundedImageButton = ({ className }: { className?: ClassValue }) => {
  return (
    <Image
      width={500}
      height={500}
      className="h-8 w-8 rounded-full overflow-hidden cursor-pointer"
      src={mrbeast_img}
      alt="mrbeast"
    />
  );
};

const OtherButtons = () => {
  return <button></button>;
};

export {
  IconButton,
  TagButton,
  TextButton,
  RoundedIconButton,
  RoundedImageButton,
};
