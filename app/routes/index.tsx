import type { MetaFunction } from "react-router";
import { AppLink } from "~/components/app-link";

export const meta: MetaFunction = () => {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">React Router</span>
          </h1>
          <div className="w-[500px] max-w-[100vw] p-4">
            <img src="/logo-light.svg" alt="React Router" className="block w-full dark:hidden" />
            <img src="/logo-dark.svg" alt="React Router" className="hidden w-full dark:block" />
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <ul>
            <li>
              <AppLink
                id="view-actors"
                lang="en"
                className="group flex items-center gap-3 self-stretch px-8 leading-normal text-blue-700 hover:underline dark:text-blue-500"
              >
                Actors
              </AppLink>
            </li>
            <li>
              <AppLink
                id="view-actors"
                lang="fr"
                className="group flex items-center gap-3 self-stretch px-8 leading-normal text-blue-700 hover:underline dark:text-blue-500"
              >
                Acteurs
              </AppLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
