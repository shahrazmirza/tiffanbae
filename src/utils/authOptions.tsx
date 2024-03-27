import prisma from "../lib/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { use } from "react";
import { User } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter"

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : "user",
        };
      },
      idToken: true,

      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        if (!user) throw new Error("User name or password is not correct");

        if (!credentials?.password) throw new Error("Please Provide Your Password");
        const isPassowrdCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPassowrdCorrect) throw new Error("User name or password is not correct");

        if (!user.emailVerified) throw new Error("Please verify your email first!");

        const { password, ...userWithoutPass } = user;
        return userWithoutPass;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user?.email }, // Use optional chaining to handle null
        });
  
        // Create user if it doesn't exist
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              firstName: user.name.split(" ")[0], // Assuming name is formatted as "FirstName LastName"
              lastName: user.name.split(" ")[1],
            },
          });
        }
  
        token.user = user;
      }
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};


// import prisma from "../lib/prisma";
// import { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import * as bcrypt from "bcrypt";
// import NextAuth from "next-auth/next";
// import { use } from "react";
// import { User } from "@prisma/client";
// import { PrismaAdapter } from "@auth/prisma-adapter"

// export const authOptions: AuthOptions = {
//   pages: {
//     signIn: "/auth/signin",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//       profile(profile) {
//         return {
//           id: profile.sub,
//           name: `${profile.given_name} ${profile.family_name}`,
//           email: profile.email,
//           image: profile.picture,
//           role: profile.role ? profile.role : "user",
//         };
//       },
//       idToken: true,

//       authorization: {
//         params: {
//           scope: "openid profile email",
//         },
//       },
//     }),
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         username: {
//           label: "User Name",
//           type: "text",
//           placeholder: "Your User Name",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials?.username,
//           },
//         });

//         if (!user) throw new Error("User name or password is not correct");

//         if (!credentials?.password) throw new Error("Please Provide Your Password");
//         const isPassowrdCorrect = await bcrypt.compare(credentials.password, user.password);

//         if (!isPassowrdCorrect) throw new Error("User name or password is not correct");

//         if (!user.emailVerified) throw new Error("Please verify your email first!");

//         const { password, ...userWithoutPass } = user;
//         return userWithoutPass;
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.user = user as User;
//       return token;
//     },

//     async session({ token, session }) {
//       session.user = token.user;
//       return session;
//     },
//   },
// };
