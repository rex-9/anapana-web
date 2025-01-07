import React, { useState } from "react";
import PageLayout from "./PageLayout";
import { AnalogClock, IconButton, MarkerPopup } from "../components";
import assets from "../assets";
import { AppLocales } from "../locales/app_locales";
import { useTranslation } from "react-i18next";

const Root: React.FC = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { t } = useTranslation();

  return (
    <PageLayout>
      <div className="w-full flex flex-col md:flex-row justify-center md:gap-48 items-center">
        <AnalogClock />
        <MarkerPopup />
      </div>
      <IconButton
        onClick={() => setShowSnackbar(!showSnackbar)}
        icon={
          !showSnackbar ? (
            <assets.icons.lib.heart />
          ) : (
            <assets.icons.lib.xCircle />
          )
        }
      />
      {showSnackbar && (
        <div className="fixed bottom-[40%] bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex items-center gap-4">
          <div className="w-64 flex flex-col justify-center items-center gap-4">
            <div>{t(AppLocales.WelcomeDonations)}</div>
            <a
              href="https://buymeacoffee.com/rex9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="h-12"
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
              />
            </a>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Root;
