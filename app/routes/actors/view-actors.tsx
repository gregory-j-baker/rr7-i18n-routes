import { AppLink } from "~/components/app-link";
import { useCurrentLanguage } from "~/modules/i18n";

export default function Index() {
  const currentLanguage = useCurrentLanguage();

  return (
    <>
      <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
        <ul>
          <li>
            <AppLink
              id="view-actor"
              className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
              params={{ id: "123" }}
            >
              {currentLanguage === "en" ? "View actor" : "Voir l'acteur"}
            </AppLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
