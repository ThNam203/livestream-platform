"use client";
import { Bell, MessageSquare, MoreVertical, User } from "lucide-react";
import { IconButton, RoundedIconButton, TextButton } from "./buttons";
import { SearchBar } from "./search_bar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "./input";

export const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full flex flex-row items-center justify-between text-xl font-semibold text-primaryWord bg-white px-4 py-2 shadow z-[49]">
      <div className="flex flex-row gap-10">
        <a href="/" className="hover:text-primary">
          Home
        </a>
        <a href="" className="hover:text-primary">
          Following
        </a>
        <a href="/browse" className="hover:text-primary">
          Browse
        </a>
        <IconButton icon={<MoreVertical />} />
      </div>

      <div>
        <SearchInput
          id="search-input"
          placeholder="Search"
          className="text-base w-[400px]"
        />
      </div>

      {isLogin ? (
        <div className="flex flex-row gap-4">
          <IconButton icon={<Bell size={16} />} />
          <IconButton icon={<MessageSquare size={16} />} />
          <RoundedIconButton
            className="bg-[#69ffc3]"
            icon={<User size={16} />}
          />
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          <TextButton
            content="Log In"
            onClick={() => {
              router.push("/login");
            }}
          />
          <TextButton
            content="Sign Up"
            className="text-white bg-primary hover:bg-primary/80"
            onClick={() => {
              router.push("/register");
            }}
          />
        </div>
      )}
    </nav>
  );
};
