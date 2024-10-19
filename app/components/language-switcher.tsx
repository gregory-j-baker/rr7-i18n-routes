import * as React from "react";
import { generatePath, Link, useParams, useSearchParams } from "react-router";
import invariant from "tiny-invariant";
import { useCurrentI18nRouteId } from "~/hooks";
import { useCurrentLanguage } from "~/modules/i18n";
import { getI18nRouteForLanguage } from "~/routes";

type LinkProps = React.ComponentProps<typeof Link>;

export type LanguageSwitcherProps = Omit<LinkProps, "to" | "reloadDocument">;

export const LanguageSwitcher = React.forwardRef<HTMLAnchorElement, LanguageSwitcherProps>(({ children, ...props }, ref) => {
  const currentLanguage = useCurrentLanguage();
  const targetLanguage = currentLanguage === "fr" ? "en" : "fr";

  const currentRouteId = useCurrentI18nRouteId();

  /*
   * this can happen if the language switcher is rendered on a non-bilingual page, such as /
   *
   * we could handle this gracefully, but since rendering the language switcher on a
   * non-bilingual page doesn't make sense, I think it's okay to just barf here.
   */
  invariant(currentRouteId, `Could not find current route ID`);
  const targetRoute = getI18nRouteForLanguage(currentRouteId, targetLanguage);
  invariant(targetRoute?.path, `Could not find path with id [${currentRouteId}] for language [${targetLanguage}]`);

  const params = useParams();
  const pathname = generatePath(targetRoute.path, params);

  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  return (
    <Link ref={ref} to={{ pathname, search }} reloadDocument={true} {...props}>
      {children}
    </Link>
  );
});

LanguageSwitcher.displayName = "LanguageSwitcher";
