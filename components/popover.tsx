import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import { ReactNode } from "react";

const Popover = ({
  className,
  content,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: ClassValue;
  content?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-h-[250px] w-full overflow-y-scroll bg-white rounded-md shadow-[0_0_45px_-15px_rgba(0,0,0,0.3)] ease-linear duration-100",
        className
      )}
    >
      {content}
    </div>
  );
};

export { Popover };
