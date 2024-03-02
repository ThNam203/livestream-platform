import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import { Eye } from "lucide-react";

export const Input = ({
  id,
  type = "text",
  className,
}: {
  id?: string;
  type?: string;
  className?: ClassValue;
}) => {
  return (
    <input
      id={id}
      type={type}
      className={cn(
        "border-0 outline outline-1 outline-black rounded py-1 px-3 focus:outline-4 focus:outline-primary",
        className
      )}
    />
  );
};

export const PasswordInput = ({
  id,
  className,
}: {
  id?: string;
  className?: ClassValue;
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type="password"
        className={cn(
          "border-0 outline outline-1 outline-black rounded py-1 px-3 focus:outline-4 focus:outline-primary",
          className
        )}
      />
      <Eye />
    </div>
  );
};
