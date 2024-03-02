export type User = {
  id: number;
  username: string;
  bio: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  password: string;
  blockedUsers: number[];
  // privateMessages
  location: string;
  createdDate: Date;
  linkAccount: string;
  followers: number[];
  followings: number[];
  backgroundPicture: string;
  // activity: livestreamsParticipatedIn, comments, likes
};
