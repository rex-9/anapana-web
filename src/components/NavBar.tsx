import React from "react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import ProfileAvatar from "./ProfileAvatar";
import { AppLocales } from "../locales/app_locales";
import { useTranslation } from "react-i18next";

const NavBar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <nav className="flex gap-2 justify-between items-center w-full p-2">
      <div className="md:w-48">
        <ProfileAvatar className="ml-auto" />
      </div>
      {t(AppLocales.AnapanaTimerTitle)}
      <div className="flex gap-2 items-center px-2">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default NavBar;
