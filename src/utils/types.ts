export interface ILogin {
  email: string;
  password: string;
}

export interface IChannel {
  id: string;
  name: string;
  type: "TEXT" | "VOICE";
  created_at: string;
  updated_at: string;
}
