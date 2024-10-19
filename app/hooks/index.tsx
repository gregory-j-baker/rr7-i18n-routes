import { useMatches } from "react-router";
import invariant from "tiny-invariant";
import { I18nRouteId, isI18nRouteId, removeLanguageSuffix } from "~/routes";

/**
 * Returns the route of the current page.
 */
export function useCurrentI18nRouteId(): I18nRouteId | undefined {
  const match = useMatches().at(-1);

  // this should never happen, but typescript can't know that
  invariant(match, "Unexpected error: useMatches() returned an empty array");

  const id = removeLanguageSuffix(match.id);
  if (isI18nRouteId(id)) return id;
}
