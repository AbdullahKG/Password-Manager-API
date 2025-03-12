import { Request } from 'express';

export interface userRerquest extends Request {
  users: {
    userid: number;
    username: string;
    iat: number;
    exp: number;
  };
}
