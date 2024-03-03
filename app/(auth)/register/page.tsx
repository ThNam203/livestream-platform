"use client";

import { IconButton, TextButton } from "@/components/buttons";
import { Input } from "@/components/input";
import { ArrowLeftFromLine } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white ">
      <div className="relative w-[500px] bg-white rounded-md shadow-[0_0_45px_-15px_rgba(0,0,0,0.3)] px-6 py-10 flex flex-col">
        <IconButton
          className="absolute top-2 left-2"
          icon={<ArrowLeftFromLine size={18} />}
          onClick={() => router.back()}
        />
        <h1 className="w-full text-center text-2xl font-semibold">
          Join Twitch today
        </h1>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-semibold cursor-pointer">
              Username
            </label>
            <Input id="username" placeholder="Username" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold cursor-pointer">
              Password
            </label>
            <Input id="password" type="password" />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirm-password"
              className="font-semibold cursor-pointer"
            >
              Confirm Password
            </label>
            <Input id="confirm-password" type="password" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold cursor-pointer">
              Date of Birth
            </label>
            <Input id="month" type="date" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold cursor-pointer">
              Email
            </label>
            <Input id="email" type="email" placeholder="example@gmail.com" />
          </div>
        </div>
        <TextButton
          content="Sign Up"
          className="mt-10 text-sm font-bold text-white bg-primary hover:bg-primary/90"
        />
      </div>
    </div>
  );
}
