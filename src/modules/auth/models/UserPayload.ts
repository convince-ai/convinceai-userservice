export interface UserPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  inviteCode: string;
  iat?: number;
  exp?: number;
}
