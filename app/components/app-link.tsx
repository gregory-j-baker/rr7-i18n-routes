import * as React from "react";
import { generatePath, Link, Params, Path } from "react-router";
import invariant from "tiny-invariant";
import { useCurrentLanguage } from "~/modules/i18n";
import { getI18nRouteForLanguage, I18nRouteId } from "~/routes";

type LinkProps = React.ComponentProps<typeof Link>;

export type AppLinkProps = Omit<LinkProps, "ref" | "to"> & {
  id: I18nRouteId;
  hash?: Path["hash"];
  lang?: Language;
  params?: Params;
  search?: Path["search"];
};

export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ children, hash, lang, params, id, search, ...props }, ref) => {
    const currentLanguage = useCurrentLanguage();
    const targetLanguage = lang ?? currentLanguage;
    invariant(targetLanguage, "Current language could not be detected, and AppLink lang parameter was not set");

    const route = getI18nRouteForLanguage(id, targetLanguage);
    invariant(route?.path, `Could not find path with id [${id}] for language [${targetLanguage}]`);

    const pathname = generatePath(route.path, params);
    const reloadDocument = props.reloadDocument ?? lang !== undefined;

    return (
      <Link ref={ref} to={{ hash, pathname, search }} lang={targetLanguage} reloadDocument={reloadDocument} {...props}>
        {children}
      </Link>
    );
  }
);

AppLink.displayName = "AppLink";
