import type { RouteConfigEntry } from "@react-router/dev/routes";
import { index, layout, route } from "@react-router/dev/routes";

//
// Types
//

export type I18nRoute = I18nLayoutRoute | I18nPageRoute;
export type I18nLayoutRoute = { file: string; children: I18nRoute[] };
export type I18nPageRoute = { file: string; id: string; paths: I18nPaths };
export type I18nRouteId = ExtractI18nRouteIds<(typeof i18nRoutes)[number]>;

type I18nPaths = Record<Language, string>;
type ExtractI18nRouteId<T> = T extends I18nPageRoute ? T["id"] : never;
type ExtractI18nRouteIds<T, Filter = void> = T extends I18nLayoutRoute
  ? ExtractI18nRouteIds<T["children"][number], Filter>
  : ExtractI18nRouteId<T>;

//
// Variables
//

const i18nRoutes = [
  {
    file: "routes/actors/layout.tsx",
    children: [
      {
        id: "view-actors",
        file: "routes/actors/view-actors.tsx",
        paths: { en: "/en/actors", fr: "/fr/acteurs" },
      },
      {
        id: "view-actor",
        file: "routes/actors/view-actor.tsx",
        paths: { en: "/en/actors/:id", fr: "/fr/acteurs/:id" },
      },
      {
        id: "edit-actor",
        file: "routes/actors/edit-actor.tsx",
        paths: { en: "/en/actors/:id/edit", fr: "/fr/acteurs/:id/modifier" },
      },
    ],
  },
] as const satisfies I18nRoute[];

// see: https://reactrouter.com/dev/docs/framework/start/routing
export const routes = [index("routes/index.tsx"), ...toRouteConfigEntries(i18nRoutes)];

//
// Functions
//

/**
 * Type guard to determine if a string is a valid I18nRouteId.
 */
export function isI18nRouteId(str: string): str is I18nRouteId {
  return new Set(extractRouteIds(i18nRoutes)).has(str);
}

/**
 * Finds a route by its id and language.
 *
 * @param id - The id of the route to find, without the language suffix.
 * @param language - The language of the route.
 * @returns The found route, or undefined if not found.
 */
export function getI18nRouteForLanguage(id: I18nRouteId, language: Language): RouteConfigEntry | undefined {
  function search(routes: RouteConfigEntry[]): RouteConfigEntry | undefined {
    for (const route of routes) {
      if (route.id === generateRouteId(id, language)) return route;
      if (route.children) return search(route.children);
    }
  }

  return search(routes);
}

/**
 * Removes the language identifier from a potential route ID.
 */
export function removeLanguageSuffix(str: string) {
  return str.replace(/--(en|fr)$/, "");
}

/**
 * Recursively extract all route IDs from an array of i18n routes.
 */
function extractRouteIds(i18nRoutes: I18nRoute[]): string[] {
  return i18nRoutes.flatMap((i18nRoute) => (isI18nPageRoute(i18nRoute) ? [i18nRoute.id] : extractRouteIds(i18nRoute.children)));
}

/**
 * Generates a route id by combining a base id and a language code.
 * This is necessary because React Router route ids must be unique.
 *
 * @param id - The base route id.
 * @param language - The language code.
 * @returns The generated route id.
 */
function generateRouteId(id: string, language: string): string {
  return `${id}--${language}`;
}

/**
 * Generates an array of route config entries for different languages based on a given file and i18n paths.
 *
 * @param id - The id of the route.
 * @param i18nPaths - A mapping of language codes to route paths.
 * @param file - The path to the route component file.
 * @returns An array of route config entries.
 */
function i18nRoute(id: string, i18nPaths: I18nPaths, file: string): RouteConfigEntry[] {
  return Object.entries(i18nPaths).map(([language, path]) => route(path, file, { id: generateRouteId(id, language) }));
}

/**
 * Type guard to determine if a route is an I18nLayoutRoute.
 */
function isI18nLayoutRoute(i18nRoute: I18nRoute): i18nRoute is I18nLayoutRoute {
  return "children" in i18nRoute;
}

/**
 * Type guard to determine if a route is an I18nPageRoute.
 */
function isI18nPageRoute(i18nRoute: I18nRoute): i18nRoute is I18nPageRoute {
  return "id" in i18nRoute;
}

/**
 * Convert a Route[] to a RouteConfigEntry[] that can be used by React Router.
 *
 * @param routes - The array of i18n route definitions.
 * @returns A flattened array of React Router route configuration entries.
 */
function toRouteConfigEntries(routes: I18nRoute[]): RouteConfigEntry[] {
  const routeConfigEntries = routes.map((route): RouteConfigEntry[] => {
    return isI18nLayoutRoute(route)
      ? [layout(route.file, toRouteConfigEntries(route.children))]
      : i18nRoute(route.id, route.paths, route.file);
  });

  return routeConfigEntries.flat();
}
