export type User = {
  id: number;
  username: string;
  bio: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  password: string;
  birth: Date;
  channel: Channel;
};
export type Channel = {
  id: number;
  title: string;
  channelName: string;
  tags: string[];
  streamKey: string;
};

//some props will develop later

// blockedUsers: number[];
//   // privateMessages
//   location: string;
//   createdDate: Date;
//   linkAccount: string;
//   followers: number[];
//   followings: number[];
//   backgroundPicture: string;
//   // activity: livestreamsParticipatedIn, comments, likes
