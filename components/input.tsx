"use client";
import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import { Search } from "lucide-react";
import React, { ReactNode, useEffect, useRef, useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessages?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, name, id, placeholder, label, errorMessages, ...props },
    ref
  ) => {
    return (
      <div className="relative flex flex-col">
        <label
          htmlFor={id}
          className={cn(
            "font-semibold cursor-pointer mb-2",
            label ? "" : "hidden"
          )}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          className={cn(
            "border-0 outline outline-1 outline-black rounded py-1 px-3 focus:outline-4 focus:outline-primary font-normal",
            errorMessages ? "outline-red-500" : "",
            className
          )}
          {...props}
        />
        <span className="absolute -bottom-5 text-red-500 text-xs">
          {errorMessages ? errorMessages : ""}
        </span>
      </div>
    );
  }
);
Input.displayName = "Input";

const SearchInput = ({
  id,
  type = "text",
  popover,
  popoverPosition = "bottom-center",
  placeholder,
  className,
}: {
  id?: string;
  type?: string;
  popover?: ReactNode;
  popoverPosition?: "bottom-right" | "bottom-left" | "bottom-center";
  placeholder?: string;
  className?: ClassValue;
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const searchInputRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const popoverBottomStyle = "top-[140%]";
  const popoverBottomLeftStyle = popoverBottomStyle + " -right-1";
  const popoverBottomRightStyle = popoverBottomStyle + " -left-1";
  useEffect(() => {
    window.addEventListener("click", (e: any) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target) &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target)
      ) {
        setShowPopover(false);
      }
    });
  }, []);
  return (
    <div
      ref={searchInputRef}
      className={cn("relative flex flex-row items-center")}
      onClick={() => setShowPopover(!showPopover)}
    >
      <label
        htmlFor={id}
        className="absolute start-2 cursor-pointer font-normal"
      >
        <Search />
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn(
          "border-0 outline outline-1 outline-black rounded py-1 px-10 focus:outline-4 focus:outline-primary",
          className
        )}
      />
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

export { Input, SearchInput };
