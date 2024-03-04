"use client";
import { ReactNode, useEffect, useState } from "react";
import gaming_svg from "../../../public/images/gaming.svg";
import creative_svg from "../../../public/images/creative.svg";
import esports_svg from "../../../public/images/esports.svg";
import irl_svg from "../../../public/images/irl.svg";
import music_svg from "../../../public/images/music.svg";
import Image from "next/image";
import { Tab, TabContent } from "@/components/tab";
import { SearchInput } from "@/components/input";
import { Combobox, Option } from "@/components/combobox";
import { Popover } from "@/components/popover";
import { ArrowDownWideNarrow, Sparkles, X } from "lucide-react";
import { categories } from "@/fakedata/browse";
import { cn } from "@/utils/cn";
import { streamings } from "@/fakedata/leftbar";
import { Hover3DBox } from "@/components/hover_3d_box";
import { TagButton } from "@/components/buttons";
import { ClassValue } from "clsx";
import { Streaming } from "@/entities/channel";
import amongus_img from "../../../public/images/amongus.jpg";

const BrowseItem = ({ title, icon }: { title: string; icon: any }) => {
  return (
    <div className="w-full relative bg-secondary rounded-md flex flex-row items-center justify-between px-4 py-2 cursor-pointer hover:bg-primary ease-linear duration-100">
      <h1 className="text-white font-bold text-2xl">{title}</h1>
      <div className="w-[80px]"></div>
      <Image
        src={icon}
        width={80}
        height={80}
        alt="Icon"
        className="absolute end-2"
      />
    </div>
  );
};

const CategoryContentView = ({
  title,
  viewers,
  tags,
}: {
  title: string;
  viewers: number;
  tags: string[];
}) => {
  return (
    <div className="flex-1 flex-col space-y-1">
      <span className="text-sm hover:text-primary cursor-pointer font-semibold">
        {title}
      </span>
      <div className="text-sm text-secondaryWord cursor-pointer">
        {viewers} viewers
      </div>
      <div className="flex flex-row gap-2 justify-self-end">
        {tags.map((tag, idx) => {
          return <TagButton key={idx} content={tag} />;
        })}
      </div>
    </div>
  );
};

const CategoryView = ({
  className,
  title,
  viewers,
  tags,
}: {
  className?: ClassValue;
  title: string;
  viewers: number;
  tags: string[];
}) => {
  return (
    <div className="flex flex-col">
      <Hover3DBox imageSrc={amongus_img} className="h-[260px]" />
      <CategoryContentView title={title} tags={tags} viewers={viewers} />
    </div>
  );
};

const CategoryListView = ({
  className,
  limitView,
  streamings,
}: {
  className?: ClassValue;
  limitView: number;
  streamings: Streaming[];
}) => {
  const streamingData = streamings.slice(0, limitView);
  return (
    <div
      className={cn(
        "w-full grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 gap-6",
        className
      )}
    >
      {streamingData.map((streaming, idx) => {
        return (
          <CategoryView
            key={idx}
            title={streaming.title}
            tags={streaming.tags}
            viewers={120}
          />
        );
      })}
    </div>
  );
};

export default function BrowsePage() {
  const browses: { title: string; icon: ReactNode }[] = [
    {
      title: "Games",
      icon: gaming_svg,
    },
    {
      title: "IRL",
      icon: irl_svg,
    },
    {
      title: "Music",
      icon: music_svg,
    },
    {
      title: "Esports",
      icon: esports_svg,
    },
    {
      title: "Creative",
      icon: creative_svg,
    },
  ];

  const [selectedTab, setSelectedTab] = useState("Categories");
  const [sortFilter, setSortFilter] = useState("Recommended For You");
  const [openComboboxPopover, setOpenComboboxPopover] = useState(false);
  const [openSearchInputPopover, setOpenSearchInputPopover] = useState(false);
  const [tagFilter, setTagFilter] = useState<string>("");

  return (
    <div className="flex flex-col p-8">
      <h1 className="text-5xl font-bold">Browse</h1>
      <div className="mt-6 w-full flex flex-row items-center justify-between gap-2">
        {browses.map((browse, idx) => (
          <BrowseItem key={idx} title={browse.title} icon={browse.icon} />
        ))}
      </div>
      <div className="flex flex-row items-center gap-6 mt-6">
        <Tab
          content="Categories"
          className="text-lg font-semibold"
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <Tab
          content="Live channels"
          className="text-lg font-semibold"
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>

      <TabContent
        contentFor="Categories"
        selectedTab={selectedTab}
        content={
          <div>
            <div className="flex flex-row justify-between items-center mt-8">
              <div className="flex flex-row items-center gap-4">
                <SearchInput
                  id="search-input"
                  placeholder="Search Category Tags"
                  className="text-sm w-[250px] pr-2"
                  popoverPosition="bottom-right"
                  popover={
                    <Popover
                      open={openSearchInputPopover}
                      setOpen={setOpenSearchInputPopover}
                      content={
                        <div className="flex flex-col">
                          {categories.map((category, idx) => {
                            return (
                              <span
                                key={idx}
                                className={cn(
                                  "text-sm hover:bg-hoverColor ease-linear duration-100 cursor-pointer pl-2 pr-[80px] py-1 rounded",
                                  tagFilter === category ? "hidden" : ""
                                )}
                                onClick={() => setTagFilter(category)}
                              >
                                {category}
                              </span>
                            );
                          })}
                        </div>
                      }
                    />
                  }
                />

                <span
                  className={cn(
                    "flex flex-row items-center gap-2 bg-gray-200 rounded-3xl px-3 py-1 text-secondaryWord font-semibold text-sm",
                    tagFilter === "" ? "hidden" : ""
                  )}
                >
                  {tagFilter}
                  <X
                    size={16}
                    strokeWidth={3}
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => setTagFilter("")}
                  />
                </span>
              </div>
              <div className="flex flex-row items-center gap-4">
                <span className="font-semibold text-sm text-black">
                  Sort by
                </span>
                <Combobox
                  selectedOption={sortFilter}
                  className="text-sm"
                  popoverPosition="bottom-left"
                  popover={
                    <Popover
                      open={openComboboxPopover}
                      setOpen={setOpenComboboxPopover}
                      className="p-2 overflow-y-hidden"
                      content={
                        <div className="w-full flex flex-col items-center">
                          <Option
                            icon={<Sparkles />}
                            content="Recommended For You"
                            className="text-sm"
                            selectedOption={sortFilter}
                            setSelectedOption={setSortFilter}
                          />
                          <Option
                            icon={<ArrowDownWideNarrow />}
                            content="Viewers (High to Low)"
                            className="text-sm"
                            selectedOption={sortFilter}
                            setSelectedOption={setSortFilter}
                          />
                        </div>
                      }
                    />
                  }
                />
              </div>
            </div>

            <CategoryListView
              limitView={12}
              streamings={streamings}
              className="mt-6"
            />
          </div>
        }
      />
    </div>
  );
}
