import React, { useEffect, useState } from "react";
import { useMarker } from "../contexts/MarkerContext";
import { useAtom } from "jotai";
import atoms from "../atoms";
import "react-clock/dist/Clock.css";
import Clock from "react-clock";
import assets from "../assets";

const AnalogClock: React.FC = () => {
  const [value, setValue] = useState(new Date());
  const { markers } = useMarker();
  const [startTime] = useAtom(atoms.startTimeAtom);
  const [endTime] = useAtom(atoms.endTimeAtom);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        const wakeLockSentinel = await navigator.wakeLock.request("screen");
        setWakeLock(wakeLockSentinel);
        wakeLockSentinel.addEventListener("release", () => {
          console.log("Wake Lock was released");
        });
        console.log("Wake Lock is active");
      } catch (err) {
        if (err instanceof Error) {
          console.error(`${err.name}, ${err.message}`);
        } else {
          console.error(err);
        }
      }
    };

    requestWakeLock();

    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, [wakeLock]);

  useEffect(() => {
    const currentTime = `${value.getHours().toString().padStart(2, "0")}:${value
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${value.getSeconds().toString().padStart(2, "0")}`;
    markers.forEach((marker) => {
      const intervalMinutes =
        marker.unit === "hours"
          ? marker.interval * 60
          : marker.unit === "seconds"
          ? marker.interval / 60
          : marker.interval;
      const markerTimes = generateMarkerTimes(
        startTime,
        endTime,
        intervalMinutes
      );
      if (markerTimes.includes(currentTime)) {
        playSound();
      } else if (currentTime === endTime) {
        playEndSound();
      }
    });
  }, [value, markers, startTime, endTime]);

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

  const calculateMarkerPosition = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + seconds / 60;
    const angle = (totalMinutes / 60) * 360; // 60 minutes in the clock face
    const radius = 144; // Half of the clock size (72 * 2)
    const x = radius + radius * Math.cos((angle - 90) * (Math.PI / 180));
    const y = radius + radius * Math.sin((angle - 90) * (Math.PI / 180));
    return { x, y };
  };

  const generateMarkerTimes = (
    startTime: string,
    endTime: string,
    interval: number
  ) => {
    const [startHours, startMinutes, startSeconds] = startTime
      .split(":")
      .map(Number);
    const [endHours, endMinutes, endSeconds] = endTime.split(":").map(Number);
    const startTotalMinutes =
      startHours * 60 + startMinutes + startSeconds / 60;
    const endTotalMinutes = endHours * 60 + endMinutes + endSeconds / 60;

    const times = [];
    for (
      let time = startTotalMinutes + interval;
      time <= endTotalMinutes;
      time += interval
    ) {
      const hours = Math.floor(time / 60);
      const minutes = Math.floor(time % 60);
      const seconds = Math.floor((time * 60) % 60);
      times.push(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }
    return times;
  };

  return (
    <div className="relative w-72 h-72">
      <Clock size={288} value={value} className="bg-white rounded-full" />
      <div className="absolute inset-0 border-2 border-black dark:border-white rounded-full">
        {/* Render clock face */}
        {markers.map((marker, index) => {
          const intervalMinutes =
            marker.unit === "hours"
              ? marker.interval * 60
              : marker.unit === "seconds"
              ? marker.interval / 60
              : marker.interval;
          const markerTimes = generateMarkerTimes(
            startTime,
            endTime,
            intervalMinutes
          );
          return (
            <React.Fragment key={index}>
              {markerTimes.map((time, idx) => {
                const { x, y } = calculateMarkerPosition(time);
                return (
                  <div
                    key={`${index}-${idx}`}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: marker.color,
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                );
              })}
              {/* Render end time marker */}
              <div
                key={`end-${index}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "red", // or any color you want for the end marker
                  left: `${calculateMarkerPosition(endTime).x}px`,
                  top: `${calculateMarkerPosition(endTime).y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AnalogClock;
