import { AppLink } from "~/components/app-link";

export default function Index() {
  return (
    <>
      <header className="flex flex-col items-center gap-9">
        <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">Actors!</h1>
      </header>
      <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
        <ul>
          <li>
            <AppLink
              id="view-actor"
              className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
              params={{ id: "123" }}
            >
              Actor 123
            </AppLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
