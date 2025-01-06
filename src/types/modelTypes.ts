export interface IUser {
  username: string;
  name: string;
  email: string;
  provider: string;
  bio: string;
  profile_pic_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface IMarker {
  interval: number;
  unit: "seconds" | "minutes" | "hours";
  color: string;
}
