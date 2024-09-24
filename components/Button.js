import classNames from "classnames";

const Button = ({
  children,
  onClick = () => {},
  type = "button",
  disabled = false,
  color = "blue",
  textColor = "white",
}) => {
  const bg = {
    red: "bg-red-500 hover:bg-red-600 focus:ring-red-400",
    blue: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400",
    green: "bg-green-500 hover:bg-green-600 focus:ring-green-400",
  }[color];
  const buttonClass = classNames(`text-${textColor}`, {
    [bg]: !disabled,
    "bg-gray-500 cursor-not-allowed": disabled,
  });

  return (
    <button
      type={type}
      className={`${buttonClass} font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50`}
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) onClick();
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
