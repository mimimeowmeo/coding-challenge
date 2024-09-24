import Button from "../Button";
import Overlay from "./Overlay";

const Modal = ({ children }) => {
  return (
    <Overlay>
      <div className="bg-white p-6 rounded shadow-lg">{children}</div>
    </Overlay>
  );
};

export default Modal;
