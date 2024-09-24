import { useEffect, useRef, useState } from "react";
import Modal from "./modal/Modal";
import Input from "./Input";
import Button from "./Button";
import Message from "./Message";
import { MESSAGE_DELAY_CLOSE } from "@/constant/constant";
import { useSearchParams } from "next/navigation";

const Delete = ({ onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const errorMsg = useRef("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, MESSAGE_DELAY_CLOSE);
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setIsSuccess(true);
        onSuccess(+id);
      } else {
        throw new Error("Delete failed!");
      }
    } catch (err) {
      setIsError(true);
      errorMsg.current = err.message;
      setTimeout(() => {
        setIsError(false);
      }, MESSAGE_DELAY_CLOSE);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isSuccess ? null : (
        <Modal>
          <div className="flex items-center justify-center h-52 font-bold text-xl">
            {`Delete ID: ${id}?`}
          </div>
          <div className="flex justify-end gap-4">
            <Button onClick={onClose}>Canceel</Button>
            <Button color="red" onClick={handleSubmit}>
              Confirm
            </Button>
          </div>
        </Modal>
      )}
      {isSuccess && <Message message="Delete Successed!" type="info" />}
      {isError && <Message message={errorMsg.current} type="danger" />}
    </>
  );
};

export default Delete;
