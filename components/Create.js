import { useEffect, useRef, useState } from "react";
import Modal from "./modal/Modal";
import Input from "./Input";
import Button from "./Button";
import Message from "./Message";
import { MESSAGE_DELAY_CLOSE } from "@/constant/constant";

const Create = ({ onClose, onSuccess }) => {
  const [create, setCreate] = useState({ title: "", body: "", userId: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const errorMsg = useRef("");
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
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(create),
        }
      );
      if (response.ok) {
        const json = await response.json();
        setIsSuccess(true);
        onSuccess(json);
      } else {
        throw new Error("Create failed!");
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
          <Input
            label="Title"
            value={create.title}
            onChange={(e) =>
              setCreate((prev) => {
                const newPost = { ...prev, title: e.target.value };
                return newPost;
              })
            }
          />
          <Input
            label="Body"
            value={create.body}
            onChange={(e) =>
              setCreate((prev) => {
                const newPost = { ...prev, body: e.target.value };
                return newPost;
              })
            }
          />
          <Input
            label="User ID"
            value={create.userId}
            onChange={(e) =>
              setCreate((prev) => {
                const newPost = { ...prev, userId: e.target.value };
                return newPost;
              })
            }
          />
          <div className="flex justify-end gap-4">
            <Button
              disabled={
                !(create.title && create.body && create.userId) || isLoading
              }
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button color="red" onClick={onClose}>
              Close
            </Button>
          </div>
        </Modal>
      )}
      {isSuccess && <Message message="Create Successed!" type="info" />}
      {isError && <Message message={errorMsg.current} type="danger" />}
    </>
  );
};

export default Create;
