"use client";
import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import {
  ArrowDownWideNarrow,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";

const Option = ({
  className,
  icon,
  content,
  selectedOption,
  setSelectedOption,
  onClick,
}: {
  className?: ClassValue;
  icon?: ReactNode;
  content: string;
  selectedOption?: string;
  setSelectedOption: (selectedTab: string) => void;
  onClick?: () => void;
}) => {
  const selectedStyle = "bg-primary text-white";
  const defaultStyle = "bg-white text-primaryWord hover:bg-hoverColor";
  return (
    <div
      className={cn(
        "w-full flex flex-row items-center justify-between text-nowrap rounded px-2 py-1 gap-2 cursor-pointer ease-linear duration-100",
        selectedOption === content ? selectedStyle : defaultStyle,
        className
      )}
      onClick={() => {
        setSelectedOption(content);
        if (onClick) onClick();
      }}
    >
      {icon}
      <span className="w-full">{content}</span>
      <Check
        className={cn(selectedOption === content ? "opacity-100" : "opacity-0")}
      />
    </div>
  );
};

const Combobox = ({
  id,
  selectedOption,
  className,
  popover,
  popoverPosition = "bottom-center",
}: {
  id?: string;
  selectedOption: string;
  popover?: ReactNode;
  popoverPosition?: "bottom-right" | "bottom-left" | "bottom-center";
  className?: ClassValue;
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const comboboxRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const popoverBottomStyle = "top-[140%]";
  const popoverBottomLeftStyle = popoverBottomStyle + " -right-1";
  const popoverBottomRightStyle = popoverBottomStyle + " -left-1";

  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (
        comboboxRef.current &&
        !comboboxRef.current.contains(e.target) &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target)
      ) {
        setShowPopover(false);
      }
    });
  }, []);

  return (
    <div
      ref={comboboxRef}
      className={cn("relative flex flex-row items-center")}
      onClick={() => setShowPopover(!showPopover)}
    >
      <button
        className={cn(
          "min-h-8 border-0 outline outline-1 outline-black rounded py-1 pl-3 pr-10 focus:outline-4 focus:outline-primary text-nowrap bg-white",
          className
        )}
      >
        {selectedOption}
      </button>
      <label htmlFor={id} className="absolute end-2 cursor-pointer font-normal">
        {showPopover ? <ChevronUp /> : <ChevronDown />}
      </label>
      <div
        ref={popoverRef}
        className={cn(
          "absolute select-none z-30",
          popoverPosition === "bottom-left" ? popoverBottomLeftStyle : "",
          popoverPosition === "bottom-right" ? popoverBottomRightStyle : "",
          popoverPosition === "bottom-center" ? popoverBottomStyle : "",
          showPopover ? "visible" : "hidden"
        )}
      >
        {popover}
      </div>
    </div>
  );
};

export { Combobox, Option };
