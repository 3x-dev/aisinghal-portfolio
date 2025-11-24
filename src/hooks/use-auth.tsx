import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth, useQuery } from "convex/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextValue = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: unknown;
  signIn: ReturnType<typeof useAuthActions>["signIn"];
  signOut: ReturnType<typeof useAuthActions>["signOut"];
};

const warnAboutAuthConfig = () => {
  const message =
    "Convex auth is not configured. Set VITE_CONVEX_URL to enable authentication.";

  if (import.meta.env.DEV) {
    console.warn(message);
  }

  return message;
};

const fallbackContext: AuthContextValue = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  signIn: async () => {
    throw new Error(warnAboutAuthConfig());
  },
  signOut: async () => {
    warnAboutAuthConfig();
  },
};

const AuthContext = createContext<AuthContextValue>(fallbackContext);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const { isLoading: isAuthLoading, isAuthenticated } = useConvexAuth();
  const user = useQuery(api.users.currentUser);
  const { signIn, signOut } = useAuthActions();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthLoading && user !== undefined) {
      setIsLoading(false);
    }
  }, [isAuthLoading, user]);

  const value = useMemo(
    () => ({
      isLoading,
      isAuthenticated,
      user,
      signIn,
      signOut,
    }),
    [isLoading, isAuthenticated, user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthFallbackProvider({ children }: { children: ReactNode }) {
  return <AuthContext.Provider value={fallbackContext}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
