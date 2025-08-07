export type AuthUser = {
  username: string;
  password: string;
  role: string;
};

export type login = Pick<AuthUser, "username" | "password">;
