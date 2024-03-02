import { TextButton } from "@/components/buttons";
import { Input } from "@/components/input";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white ">
      <div className="w-[500px] bg-white rounded shadow px-4 py-10 flex flex-col">
        <h1 className="w-full text-center text-2xl font-semibold">
          Log in to Twitch
        </h1>
        <div className="flex flex-col gap-4">
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
          className="mt-8 font-bold text-white bg-primary hover:bg-primary/90"
        />
      </div>
    </div>
  );
}
