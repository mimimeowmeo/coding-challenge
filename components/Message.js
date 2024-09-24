import { useEffect, useMemo, useState } from "react";

const Message = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  const getTypeClasses = () => {
    switch (type) {
      case "danger":
        return "bg-red-400";
      case "info":
        return "bg-blue-400";
      default:
        return "bg-gray-300 text-black";
    }
  };
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const id = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(id);
    }
  }, [message]);

  return (
    <>
      {isVisible ? (
        <div
          className={`fixed top-3 w-52 rounded text-white p-4 text-center ${getTypeClasses()}`}
        >
          {message}
        </div>
      ) : null}
    </>
  );
};

export default Message;
