import { useEffect, useState } from "react";
import Modal from "./modal/Modal";
import Input from "./Input";
import Button from "./Button";
import Message from "./Message";

const Create = ({ onClose, setMessage, onSuccess }) => {
  const [create, setCreate] = useState({ title: "", body: "", userId: "" });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
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
        onSuccess(json);
        setMessage(<Message message="Create Successed!" type="info" />);
        onClose();
      } else {
        throw new Error("Create failed!");
      }
    } catch (err) {
      setMessage(<Message message={err.message} type="danger" />);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
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
      <Button
        type="submit"
        disabled={!(create.title && create.body && create.userId) || loading}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Button color="red" onClick={onClose}>
        Close
      </Button>
    </Modal>
  );
};

export default Create;
