import { ArrowLeftFromLine, ArrowUpDown } from "lucide-react";
import { IconButton, RoundedImageButton } from "../ui/button";
import { ClassValue } from "clsx";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

const Channel = ({
  className,
  name,
  desc,
}: {
  className?: ClassValue;
  name: string;
  desc: string;
}) => {
  return (
    <div
      className={cn(
        "w-full flex flex-row gap-2 items-center justify-between hover:bg-hoverColor",
        className
      )}
    >
      <div className="flex flex-row items-center justify-start">
        <RoundedImageButton imageUrl="/mrbeast.jpg" />
        <div className="flex flex-col gap-1 ml-2">
          <span className="font-semibold text-sm">{name}</span>
          <span className="text-gray-400 text-sm">{desc}</span>
        </div>
      </div>
      <View viewers={1200} />
    </div>
  );
};

const View = ({
  className,
  viewers,
}: {
  className?: ClassValue;
  viewers: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center gap-2",
        className
      )}
    >
      <span className="w-2 h-2 rounded-full bg-red-600"></span>
      <span className="text-xs">{viewers.toString()}</span>
    </div>
  );
};

const FollowingChannels: ReactNode[] = [
  <Channel key={1} className="px-2" name="jorgy" desc="I'm Only Sleeping" />,
];

const RecommendChannels: ReactNode[] = [
  <Channel key={1} className="px-2" name="VALORANT" desc="VALORANT" />,
  <Channel key={1} className="px-2" name="Techtone" desc="Just chatting" />,
  <Channel key={1} className="px-2" name="curry" desc="VALORANT" />,
];

export const LeftBar = () => {
  return (
    <div className="fixed h-full w-64 bg-leftBarColor flex flex-col gap-2 py-2">
      <div className="flex flex-row justify-between items-center px-2">
        <span className="font-semibold text-lg">For you</span>
        <IconButton icon={<ArrowLeftFromLine size={18} />} />
      </div>
      <div className="flex flex-row justify-between items-center text-gray-400 px-2 mt-2">
        <span className="font-semibold text-sm">FOLLOWED CHANNELS</span>
        <IconButton
          className="self-end"
          icon={<ArrowUpDown size={18} />}
          disable={true}
        />
      </div>
      {FollowingChannels}
      <div className="flex flex-row justify-between items-center px-2 mt-2">
        <span className="font-semibold text-sm">RECOMMEND CHANNELS</span>
      </div>
      {RecommendChannels}
    </div>
  );
};
