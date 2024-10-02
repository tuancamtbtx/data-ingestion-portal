export type UserInfo = {
  id: number;
  username: string;
  fullname: string;
  avatar?: string;
  email?: string;
  role: any;
  permissions?: string[];
};

export type UserDetail = UserInfo;
