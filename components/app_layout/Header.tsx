import { Bell, MessageSquare, MoreVertical, User } from "lucide-react";
import { IconButton, RoundedIconButton } from "../ui/button";

export const Header = () => {
  return (
    <nav className="fixed w-full h-12 flex flex-row items-center justify-between font-semibold text-xl p-4 z-[1000]">
      <div className="flex flex-row gap-10">
        <a href="" className="hover:text-primary">
          Home
        </a>
        <a href="" className="hover:text-primary">
          Following
        </a>
        <a href="" className="hover:text-primary">
          Browse
        </a>
        <IconButton icon={<MoreVertical />} />
      </div>
      <div className="flex flex-row gap-4">
        <IconButton icon={<Bell size={16} />} />
        <IconButton icon={<MessageSquare size={16} />} />
        <RoundedIconButton className="bg-[#69ffc3]" icon={<User size={16} />} />
      </div>
    </nav>
  );
};
