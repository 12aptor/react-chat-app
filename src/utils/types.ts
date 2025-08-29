export interface ILogin {
  email: string;
  password: string;
}

export interface IRegisterUser {
  username: string;
  email: string;
  password: string;
  avatar: File | null | string;
}

export interface IChannel {
  readonly _id: string;
  name: string;
  type: "TEXT" | "VOICE";
  created_at: string;
  updated_at: string;
}

export interface IMessage {
  readonly _id: string;
  content: string;
  author_id: number;
  author: {
    avatar: string;
    username: string;
  };
  created_at: string;
  updated_at: string;
}

export interface INewMessage {
  content: string;
  author_id: number;
  channel_id?: string;
}
