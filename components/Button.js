const Button = ({
  children,
  onClick = () => {},
  type = "button",
  disabled = false,
  color = "blue",
  textColor = "white",
}) => {
  return (
    <button
      type={type}
      className={`bg-${color}-500 ${disabled && "bg-gray-500"} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }
      text-${textColor} font-bold py-2 px-4 rounded 
      hover:bg-${color}-600 focus:outline-none focus:ring-2 focus:ring-${color}-400 
      focus:ring-opacity-50 rounded`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
