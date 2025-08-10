export type AuthUser = {
  username: string;
  password: string;
  role: string | "Admin" |"Teacher";
};

export type login = Pick<AuthUser, "username" | "password">;
