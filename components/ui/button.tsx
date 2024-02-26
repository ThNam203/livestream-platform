import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import Image from "next/image";
import { ReactNode } from "react";

const IconButton = ({
  className,
  icon,
  disable = false,
}: {
  className?: ClassValue;
  icon: ReactNode;
  disable?: boolean;
}) => {
  return (
    <button
      className={cn(
        "w-8 h-8 hover:bg-hoverColor disabled:hover:bg-transparent rounded flex flex-row items-center justify-center",
        className
      )}
      disabled={disable}
    >
      {icon}
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

const RoundedImageButton = ({
  className,
  imageUrl,
}: {
  className?: ClassValue;
  imageUrl: string;
}) => {
  return (
    // <button
    //   className={cn(
    //     "w-8 h-8 rounded-full flex flex-row items-center justify-center",
    //     className
    //   )}
    // >

    // </button>
    <Image
      width={10}
      height={10}
      className="h-8 w-8 rounded-full overflow-hidden"
      src={imageUrl}
      alt="mrbeast"
    />
  );
};

const OtherButtons = () => {
  return <button></button>;
};

export { IconButton, RoundedIconButton, RoundedImageButton };
