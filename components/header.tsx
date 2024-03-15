"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Bell, MessageSquare, MoreVertical, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconButton, RoundedIconButton, TextButton } from "./buttons";
import { SearchInput } from "./input";
import { Separate } from "./separate";
import { LogoutIcon, SettingIcon } from "./icons";
import { DefaultOption } from "./option";
import { use, useEffect, useState } from "react";
import AuthService from "@/services/authService";
import { showErrorToast, showSuccessToast } from "./toast";
import { getCookie, setCookie } from "cookies-next";

export const Header = () => {
  const router = useRouter();
  const [showPopover, setShowPopover] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie("token");
    if (token) setHasLoggedIn(true);
  }, []);

  return (
    <nav className="fixed top-0 w-full flex flex-row items-center justify-between text-xl font-semibold text-primaryWord bg-white px-4 py-2 shadow z-[49]">
      <div className="flex flex-row gap-10">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <Link href="/following" className="hover:text-primary">
          Following
        </Link>
        <Link href="/browse" className="hover:text-primary">
          Browse
        </Link>
        <IconButton icon={<MoreVertical />} />
      </div>

      <div>
        <SearchInput
          id="search-input"
          placeholder="Search"
          className="text-base w-[400px]"
        />
      </div>

      {hasLoggedIn ? (
        <div className="flex flex-row gap-4">
          <IconButton icon={<Bell size={16} />} />
          <IconButton icon={<MessageSquare size={16} />} />

          <Popover
            isOpen={showPopover}
            onOpenChange={setShowPopover}
            placement="bottom-end"
            showArrow={true}
          >
            <PopoverTrigger>
              <RoundedIconButton
                className="bg-[#69ffc3]"
                icon={<User size={16} />}
              />
            </PopoverTrigger>
            <PopoverContent>
              <div
                className="py-4 px-2 bg-white rounded-md shadow-primaryShadow flex flex-col"
                onClick={() => setShowPopover(false)}
              >
                <div className="flex flex-row gap-2 items-center">
                  <RoundedIconButton
                    className="bg-[#69ffc3] w-8 h-8"
                    icon={<User size={16} />}
                  />
                  <span className="text-xs font-semibold">ptdat4823</span>
                </div>

                <Separate classname="my-2" />
                <DefaultOption
                  content={
                    <div className="flex flex-row gap-2 items-center">
                      <SettingIcon />
                      <span className="text-xs">Setting</span>
                    </div>
                  }
                />

                <Separate classname="my-2" />
                <DefaultOption
                  content={
                    <div className="flex flex-row gap-2 items-center ">
                      <LogoutIcon />
                      <span className="text-xs">Log Out</span>
                    </div>
                  }
                  onClick={async () => {
                    const token = getCookie("token");
                    if (!token) return;
                    await AuthService.LogOut(token.toString())
                      .then(() => {
                        setCookie("token", "");
                        router.push("/login");
                        showSuccessToast("Log out successfully");
                      })
                      .catch((err) => {
                        showErrorToast("Log out failed");
                        console.log(err);
                      })
                      .finally(() => {});
                  }}
                />
              </div>
            </PopoverContent>
          </Popover>
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
