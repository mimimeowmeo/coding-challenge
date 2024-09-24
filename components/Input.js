const Input = ({ label, ...props }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label className="mb-1 text-gray-700" htmlFor="inputField">
          {label}
        </label>
      )}
      <input
        id="inputField"
        type="text"
        placeholder="Enter something"
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        label={label}
        {...props}
      />
    </div>
  );
};

export default Input;
