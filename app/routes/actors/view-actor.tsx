import { useCurrentLanguage } from "~/modules/i18n";

export default function ViewActor() {
  const currentLanguage = useCurrentLanguage();

  return (
    <>
      <header className="flex flex-col items-center gap-9">
        <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
          {currentLanguage === "en" ? "The actor" : "L'acteur"}
        </h1>
      </header>
    </>
  );
}
