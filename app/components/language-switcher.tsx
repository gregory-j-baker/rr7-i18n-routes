import { RouteConfigEntry } from "@react-router/dev/routes";
import * as React from "react";
import { generatePath, Link, useMatches, useParams, useSearchParams } from "react-router";
import invariant from "tiny-invariant";
import { useCurrentLanguage } from "~/modules/i18n";
import { findRouteById } from "~/routes";

type LinkProps = React.ComponentProps<typeof Link>;

export type LanguageSwitcherProps = Omit<LinkProps, "to" | "reloadDocument">;

function useCurrentRoute(language: Language): RouteConfigEntry | undefined {
  const match = useMatches().at(-1);
  invariant(match, "Expected match to be defined");

  const currentRouteId = match.id.replace(/^(.+)--(en|fr)$/, "$1");
  return findRouteById(currentRouteId, language);
}

export const LanguageSwitcher = React.forwardRef<HTMLAnchorElement, LanguageSwitcherProps>(
  ({ children, ...props }, ref) => {
    const currentLanguage = useCurrentLanguage();
    const targetLanguage = currentLanguage === "fr" ? "en" : "fr";

    const currentRoute = useCurrentRoute(targetLanguage);
    invariant(currentRoute?.path, `Could not detect current route for language=${targetLanguage}`);

    const params = useParams();
    const pathname = generatePath(currentRoute.path, params);

    const [searchParams] = useSearchParams();
    const search = searchParams.toString();

    return (
      <Link ref={ref} to={{ pathname, search }} reloadDocument={true} {...props}>
        {children}
      </Link>
    );
  }
);

LanguageSwitcher.displayName = "LanguageSwitcher";
