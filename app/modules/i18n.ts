import { useLocation } from "react-router";

export function getLanguage(pathname: string): Language | undefined {
  switch (true) {
    case pathname === "/en" || pathname.startsWith("/en/"):
      return "en";
    case pathname === "/fr" || pathname.startsWith("/fr/"):
      return "fr";
  }
}

export function useCurrentLanguage(): Language | undefined {
  const location = useLocation();
  return getLanguage(location.pathname);
}
