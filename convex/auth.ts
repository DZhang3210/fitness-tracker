import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated} = convexAuth({
  providers: [
    GitHub,
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
});
