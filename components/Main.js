"use client";
import { useEffect, useState } from "react";
import Button from "./Button";
import Create from "./Create";
import Message from "./Message";

function Main() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    if (message) setTimeout(() => setMessage(undefined), 3000);
  }, [message]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setMessage(<Message message="Loading..." />);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw new Error("Fetch Failed!");
        }
      } catch (err) {
        setMessage(<Message message={err.message} type="danger" />);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
  console.log(data);
  return (
    <div className="flex flex-col items-center gap-4 p-4 justify-center">
      {message}
      <div className="ml-auto">
        <Button disabled={loading} onClick={() => setShowCreate(true)}>
          Create Post
        </Button>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">User ID</th>
                <th className="p-4 text-left">Body</th>
                <th className="p-4 text-left">Remark</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map(({ title, id, userId, body }) => (
                  <tr key={id} className="border-b">
                    <td className="p-4">{id}</td>
                    <td className="p-4">{title}</td>
                    <td className="p-4">{userId}</td>
                    <td className="p-4">{body.slice(0, 50)}...</td>
                    <td className="p-4 flex gap-4">
                      <Button
                        color="red"
                        textColor="black"
                        onClick={() => openModal(post)}
                      >
                        Delete
                      </Button>
                      <Button color="green" onClick={() => openModal(post)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {showCreate && (
            <Create
              setMessage={setMessage}
              onClose={() => setShowCreate(false)}
              onSuccess={(res) => {
                setData((prev) => {
                  const newData = [...prev, res];
                  return newData;
                });
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Main;
