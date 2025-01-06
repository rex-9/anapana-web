import React from "react";
import PageLayout from "./PageLayout";
import { AnalogClock, MarkerPopup } from "../components";

const Root: React.FC = () => {
  return (
    <PageLayout>
      <div className="w-48 flex flex-col justify-center items-center">
        <AnalogClock />
        <MarkerPopup />
      </div>
    </PageLayout>
  );
};

export default Root;
