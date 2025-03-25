import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    _id: string;
    name?: string | null;
    email?: string | null;
    role: string;
    token: string;
  }

  interface Session {
    user?: {
      id: string;
      _id: string;
      name?: string | null;
      email?: string | null;
      role: string;
      token: string;
    };
  }

  interface JWT {
    id?: string;
    _id?: string;
    name?: string | null;
    email?: string | null;
    role?: string;
    token?: string;
  }
}