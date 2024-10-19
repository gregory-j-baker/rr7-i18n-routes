import { Outlet } from "react-router";
import { LanguageSwitcher } from "~/components/language-switcher";

export default function Layout() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <LanguageSwitcher>other language</LanguageSwitcher>
        <Outlet />
      </div>
    </div>
  );
}
