"use client";

import { TextButton } from "@/components/buttons";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white ">
      <div className="w-[500px] bg-white rounded-md shadow-[0_0_45px_-15px_rgba(0,0,0,0.3)] px-6 py-10 flex flex-col">
        <h1 className="w-full text-center text-2xl font-semibold">
          Log in to Twitch
        </h1>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-semibold cursor-pointer">
              Username
            </label>
            <Input id="username" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold cursor-pointer">
              Password
            </label>
            <Input id="password" type="password" />
          </div>
        </div>
        <span className="mt-2">
          <a className="text-sm text-primary hover:underline cursor-pointer">
            Trouble logging in ?
          </a>
        </span>
        <TextButton
          content="Log In"
          className="mt-6 text-sm font-bold text-white bg-primary hover:bg-primary/90"
        />
        <TextButton
          content="Don't have an account? Sign up"
          className="mt-4 font-bold text-primary bg-transparent hover:text-primaryWord"
          onClick={() => router.push("/register")}
        />
      </div>
    </div>
  );
}
