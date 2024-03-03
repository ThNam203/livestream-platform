"use client";
import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import { ReactNode, use, useEffect, useState } from "react";

const Tab = ({
  className,
  content,
  selectedTab,
  setSelectedTab,
  onClick,
}: {
  className?: ClassValue;
  content: string;
  selectedTab?: string;
  setSelectedTab: (selectedTab: string) => void;
  onClick?: () => void;
}) => {
  const selectedTabStyle = "text-secondary decoration-secondary";
  const defaultTabStyle = "text-primaryWord decoration-transparent";

  return (
    <span
      className={cn(
        "underline underline-offset-8 decoration-2 hover:text-primary ease-linear duration-100 cursor-pointer",
        selectedTab === content ? selectedTabStyle : defaultTabStyle,
        className
      )}
      onClick={() => {
        setSelectedTab(content);
        if (onClick) onClick();
      }}
    >
      {content}
    </span>
  );
};

// const Tablist = ({
//   className,
//   tabs,
// }: {
//   className?: ClassValue;
//   tabs: ReactNode[];
// }) => {
//   return (
//     <div className={cn("flex flex-row items-center gap-2", className)}>
//       {tabs.forEach(tab => {
//         return
//     })}
//     </div>
//   );
// };

export { Tab };
