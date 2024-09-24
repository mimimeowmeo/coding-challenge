import { useEffect, useRef, useState } from "react";
import Modal from "./modal/Modal";
import Input from "./Input";
import Button from "./Button";
import Message from "./Message";
import { MESSAGE_DELAY_CLOSE } from "@/constant/constant";
import { useSearchParams } from "next/navigation";

const Edit = ({ onClose, onSuccess }) => {
  const [data, setData] = useState({ title: "", body: "", userId: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const errorMsg = useRef("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    setData(() => {
      const title = searchParams.get("title");
      const body = searchParams.get("body");
      const userId = searchParams.get("userId");
      const newData = {
        ...data,
        title: title || "",
        body: body || "",
        userId: userId || "",
      };
      return newData;
    });
  }, [id]);

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
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const json = await response.json();
        setIsSuccess(true);
        onSuccess(json);
      } else {
        throw new Error("Edit failed!");
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
            value={data.title}
            onChange={(e) =>
              setData((prev) => {
                const newPost = { ...prev, title: e.target.value };
                return newPost;
              })
            }
          />
          <Input
            label="Body"
            value={data.body}
            onChange={(e) =>
              setData((prev) => {
                const newPost = { ...prev, body: e.target.value };
                return newPost;
              })
            }
          />
          <Input disabled label="User ID" value={data.userId} />
          <div className="flex justify-end gap-4">
            <Button
              disabled={!(data.title && data.body) || isLoading}
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
      {isSuccess && <Message message="Edit Successed!" type="info" />}
      {isError && <Message message={errorMsg.current} type="danger" />}
    </>
  );
};

export default Edit;
