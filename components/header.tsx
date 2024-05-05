"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import {
  Bell,
  MessageSquare,
  MoreVertical,
  Podcast,
  User as UserUI,
} from "lucide-react";
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
import { useAppSelector } from "@/redux/hooks";
import UserService from "@/services/userService";
import { setProfile } from "@/redux/slices/profile";
import { User } from "@/entities/user";

export const Header = () => {
  const router = useRouter();
  const [showPopover, setShowPopover] = useState(false);
  const [thisUser, setThisUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await UserService.getInfo()
        .then((res) => {
          setProfile(res.data);
          setThisUser(res.data);
        })
        .catch((err) => showErrorToast(err));
    };
    fetchData();
  }, []);

  return (
    <nav className="w-full h-12 flex flex-row items-center justify-between text-xl font-semibold text-primaryWord bg-white px-4 py-2 shadow z-[49]">
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

      {thisUser ? (
        <div className="flex flex-row gap-4">
          <TextButton
            content="Stream now"
            iconAfter={<Podcast size={16} />}
            className="bg-primary hover:bg-secondary text-white"
            onClick={() => {
              setCookie("goStreaming", JSON.stringify(true));
              router.push("/livestreaming");
            }}
          />
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
                icon={<UserUI size={16} />}
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
                    icon={<UserUI size={16} />}
                  />
                  <span className="text-xs font-semibold">
                    {thisUser.username}
                  </span>
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
