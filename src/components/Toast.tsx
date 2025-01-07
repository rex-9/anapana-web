import React, { useState, useEffect } from "react";
// import assets from "../assets";

interface ToastProps {
  type: "success" | "warning" | "error";
  message: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ type, message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  // const getIcon = () => {
  //   switch (type) {
  //     case "success":
  //       return (
  //         <span className="text-green-500">
  //           <assets.icons.lib.checkCircle />
  //         </span>
  //       );
  //     // <FaCheckCircle className="text-green-500" />;
  //     case "warning":
  //       return <assets.icons.lib.exclamationCircle />;
  //     // <FaExclamationCircle className="text-yellow-500" />;
  //     case "error":
  //       return <assets.icons.lib.xCircle />;
  //     //  <FaTimesCircle className="text-red-500" />;
  //     default:
  //       return null;
  //   }
  // };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-300";
      case "warning":
        return "bg-yellow-300";
      case "error":
        return "bg-red-300";
      default:
        return "";
    }
  };

  return (
    <div
      className={`fixed top-16 right-4 flex items-center p-4 rounded shadow-lg ${getBackgroundColor()}`}
    >
      {/* {getIcon()} */}
      <span className="ml-2">{message}</span>
    </div>
  );
};

export default Toast;
