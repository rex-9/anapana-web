import React from "react";
import PageLayout from "./PageLayout";
import { AnalogClock, MarkerPopup } from "../components";

const Root: React.FC = () => {
  return (
    <PageLayout>
      <div className="w-full flex flex-col md:flex-row justify-center md:gap-48 items-center">
        <AnalogClock />
        <MarkerPopup />
      </div>
    </PageLayout>
  );
};

export default Root;
