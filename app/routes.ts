import type { RouteConfigEntry } from "@react-router/dev/routes";
import { index, layout, route } from "@react-router/dev/routes";

/**
 * Represents a mapping of language codes to route paths.
 */
type I18nPaths = Record<Language, string>;

/**
 * Generates an array of route config entries for different languages based on a given file and i18n paths.
 *
 * @param i18nPaths - A mapping of language codes to route paths.
 * @param file - The path to the route component file.
 * @returns An array of route config entries.
 */
function i18nRoutes(id: string, i18nPaths: I18nPaths, file: string): RouteConfigEntry[] {
  return Object.entries(i18nPaths).map(([language, path]) => route(path, file, { id: `${id}--${language}` }));
}

/**
 * Finds a route by its id and language.
 *
 * @param id - The id of the route to find, without the language prefix.
 * @param language - The language of the route.
 * @returns The found route, or undefined if not found.
 */
export function findRouteById(id: string, language: Language): RouteConfigEntry | undefined {
  /**
   * Recursively searches through the routes for a matching route.
   */
  function search(routes: RouteConfigEntry[]): RouteConfigEntry | undefined {
    for (const route of routes) {
      if (route.id === `${id}--${language}`) {
        return route;
      }

      if (route.children) {
        return search(route.children);
      }
    }
  }

  return search(routes);
}

export const routes: RouteConfigEntry[] = [
  index("routes/index.tsx"),

  layout("routes/actors/layout.tsx", [
    ...i18nRoutes("list-actors", { en: "/en/actors", fr: "/fr/acteurs" }, "routes/actors/index.tsx"),
    ...i18nRoutes("view-actor", { en: "/en/actors/:id", fr: "/fr/acteurs/:id" }, "routes/actors/view-actor.tsx"),
    ...i18nRoutes("edit-actor", { en: "/en/actors/:id/edit", fr: "/fr/acteurs/:id/modifier" }, "routes/actors/edit-actor.tsx"),
  ]),
];
