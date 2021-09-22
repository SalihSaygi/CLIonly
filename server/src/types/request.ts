declare namespace Express {
    interface Request {
      token: string;
      authData: object | undefined;
      user: User | undefined;
    }
  }