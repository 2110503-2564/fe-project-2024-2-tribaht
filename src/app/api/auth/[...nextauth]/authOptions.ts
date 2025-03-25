import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogIn";

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const response = await userLogin(credentials.email, credentials.password);
          
          if (response?.success) {
            return {
              id: response.user._id,
              _id: response.user._id,
              name: response.user.name,
              email: response.user.email,
              role: response.user.role,
              token: response.token
            };
          }
          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token._id = user._id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      // วิธีแก้ที่ปลอดภัยกับ TypeScript
      if (session.user) {
        session.user.id = token.id as string;
        session.user._id = token._id as string;
        session.user.name = token.name as string | null | undefined;
        session.user.email = token.email as string | null | undefined;
        session.user.role = token.role as string;
        session.user.token = token.token as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};