"use client";

import {
  IconButton,
  RoundedImageButton,
  TagButton,
} from "@/components/buttons";
import { Streaming } from "@/entities/channel";
import { streamings, users } from "@/fakedata/leftbar";
import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react";
import Image from "next/image";
import { ReactNode, useState } from "react";
import streaming_img from "../../public/images/live_user_zackrawrr-440x248.jpg";
import { ClassValue } from "clsx";
import { cn } from "@/utils/cn";
import { CustomLink, Hover3DBox } from "@/components/hover_3d_box";
import { Separate } from "@/components/separate";

const ContentView = ({
  title,
  channel,
  category,
  tags,
}: {
  title: string;
  channel: string;
  category: string | undefined;
  tags: string[];
}) => {
  return (
    <div className="flex flex-row gap-2">
      <RoundedImageButton />
      <div className="flex-1 flex-col space-y-1">
        <div className="w-full flex flex-row items-center justify-between font-semibold">
          <span className="text-sm hover:text-primary cursor-pointer">
            {title}
          </span>

          <IconButton icon={<MoreVertical className="w-4 h-4" />} />
        </div>
        <div className="text-sm text-secondaryWord cursor-pointer">
          {channel}
        </div>
        <div className="text-sm text-secondaryWord hover:text-primary cursor-pointer">
          {category ? category : null}
        </div>
        <div className="flex flex-row gap-2 justify-self-end">
          {tags.map((tag, idx) => {
            return <TagButton key={idx} content={tag} />;
          })}
        </div>
      </div>
    </div>
  );
};

const LiveChannelView = ({
  className,
  viewers,
  title,
  category,
  tags,
  channel,
}: {
  className?: ClassValue;
  viewers: number;
  title: string;
  tags: string[];
  category?: string;
  channel: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Hover3DBox
        viewers={viewers}
        showViewer={true}
        showStreaming={true}
        imageSrc={streaming_img}
        className="h-[170px]"
      />
      <ContentView
        channel={channel}
        title={title}
        category={category}
        tags={tags}
      />
    </div>
  );
};

const LiveChannelListView = ({
  limitView,
  streamings,
}: {
  limitView: number;
  streamings: Streaming[];
}) => {
  const streamingData = streamings.slice(0, limitView);
  return (
    <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
      {streamingData.map((streaming, idx) => {
        const user = users.find((user) => user.id === streaming.ownerId);
        return (
          <LiveChannelView
            key={idx}
            channel={user ? user.username : ""}
            title={streaming.title}
            tags={streaming.tags}
            viewers={120}
            category={streaming.category}
          />
        );
      })}
    </div>
  );
};

const RecommendStreamingView = ({
  title,
  streamings,
  limitView = 4,
  separate,
}: {
  title: ReactNode;
  streamings: Streaming[];
  limitView?: number;
  separate: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-2 mt-8">
      <div className="font-semibold text-lg">{title}</div>
      <LiveChannelListView limitView={limitView} streamings={streamings} />
      {separate}
    </div>
  );
};

export default function HomePage() {
  const [limitView, setLimitView] = useState<number[]>([4, 4, 4]);
  const handleShowMoreBtn = (index: number) => {
    const newLimitView = [...limitView];
    newLimitView[index] += 8;
    setLimitView(newLimitView);
  };

  return (
    <div className="flex flex-col p-8">
      <div className="h-[350px] w-full">{/* <Carousel /> */}</div>
      <RecommendStreamingView
        title={
          <span>
            <CustomLink content="Live channels" /> we think you&#39;ll like
          </span>
        }
        streamings={streamings}
        limitView={limitView[0]}
        separate={
          <div className="w-full flex flex-row items-center justify-between gap-4">
            <Separate />
            <button
              className="px-2 py-1 hover:bg-hoverColor hover:text-primaryWord rounded-md text-xs font-semibold text-primary flex flex-row items-center justify-center text-nowrap ease-linear duration-100"
              onClick={() => handleShowMoreBtn(0)}
            >
              <span className="">Show more</span>
              <ChevronDown />
            </button>
            <Separate />
          </div>
        }
      />
      <RecommendStreamingView
        title={<span>Featured Clips We Think You&#39;ll Like</span>}
        streamings={streamings}
        limitView={limitView[1]}
        separate={
          <div className="w-full flex flex-row items-center justify-between gap-4">
            <Separate />
            <button
              className="px-2 py-1 hover:bg-hoverColor hover:text-primaryWord rounded-md text-xs font-semibold text-primary flex flex-row items-center justify-center text-nowrap ease-linear duration-100"
              onClick={() => handleShowMoreBtn(1)}
            >
              <span className="">Show more</span>
              <ChevronDown />
            </button>
            <Separate />
          </div>
        }
      />

      <RecommendStreamingView
        title={
          <span>
            <CustomLink content="VTubers" />
          </span>
        }
        streamings={streamings}
        limitView={limitView[2]}
        separate={
          <div className="w-full flex flex-row items-center justify-between gap-4">
            <Separate />
            <button className="px-2 py-1 hover:bg-hoverColor hover:text-primaryWord rounded-md text-xs font-semibold text-primary flex flex-row items-center justify-center text-nowrap ease-linear duration-100">
              <span className="">Show all</span>
              <ChevronRight />
            </button>
            <Separate />
          </div>
        }
      />
    </div>
  );
}
