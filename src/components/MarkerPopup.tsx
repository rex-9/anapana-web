import React, { useState } from "react";
import { useMarker } from "../contexts/MarkerContext";
import { TextButton, DropdownPicker, TextInput } from ".";
import { useAtom } from "jotai";
import atoms from "../atoms";
import assets from "../assets";
import { AppLocales } from "../locales/app_locales";

const MarkerPopup: React.FC = () => {
  const { addMarker, cleanMarkers } = useMarker();
  const [interval, setInterval] = useState(1);
  const [unit, setUnit] = useState<"minutes" | "hours">("minutes");
  const [startTime, setStartTime] = useAtom(atoms.startTimeAtom);
  const [endTime, setEndTime] = useAtom(atoms.endTimeAtom);

  const handleAddMarker = () => {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    addMarker({ interval, unit, color });
  };

  const playSound = () => {
    const audio = new Audio(assets.sounds.note.src);
    audio.play();
  };

  const playEndSound = () => {
    playSound();
    setTimeout(() => {
      playSound();
      setTimeout(() => {
        playSound();
      }, 1000);
    }, 1000);
  };

  const unitOptions = [
    { value: "minutes", label: AppLocales.TimerMinutes },
    { value: "hours", label: AppLocales.TimerHours },
  ];

  return (
    <div className="w-80 mt-5 flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-between gap-2">
        <TextButton
          className="w-fit mt-2"
          variant="flat"
          onClick={playSound}
          label={AppLocales.TimerTestIntervalSound}
        />
        <TextButton
          className="w-fit mt-2"
          variant="flat"
          onClick={playEndSound}
          label={AppLocales.TimerTestEndingSound}
        />
      </div>
      <TextInput
        containerClassName="w-full mt-2"
        id="start-time"
        label={AppLocales.TimerStartTime}
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <TextInput
        containerClassName="w-full mt-2"
        id="end-time"
        label={AppLocales.TimerEndTime}
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <div className="w-full flex items-center justify-between gap-2">
        <TextInput
          containerClassName="w-1/2"
          id="interval"
          label={AppLocales.TimerInterval}
          type="number"
          value={interval.toString()}
          onChange={(e) => setInterval(Number(e.target.value))}
          placeholder="Enter interval"
        />
        <DropdownPicker
          className="w-1/2 mt-2"
          options={unitOptions}
          value={unit}
          onChange={(value) => setUnit(value as "minutes" | "hours")}
        />
      </div>
      <TextButton
        className="w-fit mt-2"
        variant="primary"
        onClick={handleAddMarker}
        label={AppLocales.TimerStart}
      />
      <TextButton
        className="w-fit mt-2"
        variant="flat"
        onClick={cleanMarkers}
        label={AppLocales.TimerReset}
      />
    </div>
  );
};

export default MarkerPopup;
