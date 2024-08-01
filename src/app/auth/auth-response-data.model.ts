export interface AuthResponseData {
  email: string;
  idToken: string;
  localId: string;
  expiresIn: string;
  refreshToken: string;
  registered?: boolean;
}
