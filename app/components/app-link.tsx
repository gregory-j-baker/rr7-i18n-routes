import * as React from "react";
import { generatePath, Link, Params, Path } from "react-router";
import invariant from "tiny-invariant";
import { useCurrentLanguage } from "~/modules/i18n";
import { findRouteById } from "~/routes";

type LinkProps = React.ComponentProps<typeof Link>;

export type AppLinkProps = Omit<LinkProps, "ref" | "to"> & {
  id: string;
  hash?: Path["hash"];
  lang?: Language;
  params?: Params;
  search?: Path["search"];
};

export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ children, hash, lang, params, id, search, ...props }, ref) => {
    const currentLanguage = useCurrentLanguage();

    const language = lang ?? currentLanguage;
    invariant(language, "Current language could not be detected, and no AppLink lang parameter was set");

    const route = findRouteById(id, language);
    invariant(route?.path, `Could not find route with id=${id}`);

    const pathname = generatePath(route.path, params);
    const reloadDocument = props.reloadDocument ?? lang !== undefined;

    return (
      <Link ref={ref} to={{ hash, pathname, search }} lang={language} reloadDocument={reloadDocument} {...props}>
        {children}
      </Link>
    );
  }
);

AppLink.displayName = "AppLink";
