"use client";
import { Bell, MessageSquare, MoreVertical, User } from "lucide-react";
import { IconButton, RoundedIconButton, TextButton } from "./buttons";
import { SearchBar } from "./search_bar";
import { useState } from "react";

const PopupLogin = () => {
  return (
    <div id="LoginComponent" className="absolute w-screen h-screen">
      <h1>Popup/Modal Windows without JavaScript</h1>
      <div className="box">
        <a className="button" href="#popup1">
          Let me Pop up
        </a>
      </div>

      <div id="popup1" className="overlay">
        <div className="popup">
          <h2>Here i am</h2>
          <a className="close" href="#">
            &times;
          </a>
          <div className="content">
            Thank to pop me out of that button, but now i&#39;m done so you can
            close this window.
          </div>
        </div>
      </div>
    </div>
  );
};

export const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <nav className="fixed top-0 w-full flex flex-row items-center justify-between font-semibold text-xl text-primaryWord bg-white px-4 py-2 shadow z-[49] h-12">
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

      <SearchBar />

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
          <TextButton content="Log In" />
          <TextButton
            content="Sign Up"
            className="text-white bg-primary hover:bg-primary/80"
          />
        </div>
      )}
    </nav>
  );
};
