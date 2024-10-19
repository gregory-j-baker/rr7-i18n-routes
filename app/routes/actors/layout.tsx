import { Outlet } from "react-router";
import { LanguageSwitcher } from "~/components/language-switcher";

export default function Layout() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <LanguageSwitcher className="group flex items-center gap-3 self-stretch px-8 leading-normal text-blue-700 hover:underline dark:text-blue-500">
          Toggle language
        </LanguageSwitcher>
        <Outlet />
      </div>
    </div>
  );
}
