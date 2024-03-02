import { User } from "./user";

export type Streaming = {
  id: any;
  ownerId: any;
  viewers: number;
  title: string;
  chats: string[];
  startedTime: Date;
  tags: string[];
  category: string;
};

export type Channel = {
  id: number;
  ownerId: number;
  description: string;
  tags: string[];
  category: string;
  views: number;
  // livestreamsHosted
};
