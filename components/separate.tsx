import { cn } from "@/utils/cn";

const Separate = ({
  color = "bg-gray-200",
}: {
  color?: string;
  height?: string;
}) => {
  return <div className={cn("h-[0.5px] w-full", color)}></div>;
};

export { Separate };
