export type PostUser = {
  nickname: string | null;
  password: string;
  id: string;
};

export type PostType = {
  nickname: string | null;
  password: string;
  id: string;
  content: string;
};

export type PostReqType = {
  content: string | undefined;
  password: string | undefined;
  nickname: string | undefined;
};
