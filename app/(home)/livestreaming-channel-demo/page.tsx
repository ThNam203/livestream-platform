import VideoJS from "@/components/video";
import Image from "next/image";

export default function LivestreamingDemo() {
  return (
    <div className="flex flex-col gap-4">
      <VideoJS source="/example_video.mp4" className="w-4/5" />
      <div className="flex flex-row ml-4 gap-4 items-center">
        <div className="border-2 border-purple-400 rounded-full h-16 w-16 relative">
          <Image
            src="/images/cat.png"
            alt="Picture of the author"
            width={64}
            height={64}
          />
          <div className="absolute left-0 bottom-[-2px] right-0 bg-red-600 rounded-md">
            <p className="text-white text-xs py-[1px] font-semibold text-center">LIVE</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-base font-bold">Cat</p>
          <p className="text-base">Im playing NIKKE this time</p>
          <div className="flex gap-2 mt-1">
            <StreamTag name="Game" />
            <StreamTag name="FPS" />
            <StreamTag name="Shooter" />
          </div>
        </div>
      </div>
    </div>
  );
}

const StreamTag = ({ name }: { name: string }) => {
  return <p className="px-2 py-1 rounded-md bg-slate-400 text-xs">{name}</p>;
};
