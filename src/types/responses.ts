export type AuthRegisterResponse = {
  status: number;
  id: string;
  username: string;
  email: string;
  message: string;
}

export type AuthLoginResponse = {
  status: number;
  username: string;
  token: string;
  message: string;
}