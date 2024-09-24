"use client";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Create from "./Create";
import Message from "./Message";
import { MESSAGE_DELAY_CLOSE } from "@/constant/constant";
import Edit from "./Edit";
import { useRouter } from "next/navigation";
import Delete from "./Delete";

function Main() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const errorMsg = useRef("");
  const [showCreate, setShowCreate] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const router = useRouter();
  useEffect(() => {
    if (editData) {
      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(editData)) {
        queryParams.append(key, value);
      }
      router.push(`?${queryParams.toString()}`);
    }
  }, [editData]);

  useEffect(() => {
    if (deleteId) {
      const queryParams = new URLSearchParams();
      queryParams.append("id", deleteId);
      router.replace(`?${queryParams.toString()}`);
    }
  }, [deleteId]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
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
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, MESSAGE_DELAY_CLOSE);
        errorMsg.current = err.message;
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4 justify-center">
      <div className="ml-auto">
        <Button disabled={isLoading} onClick={() => setShowCreate(true)}>
          Create Post
        </Button>
      </div>
      {isLoading ? null : (
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
                        onClick={() => router.push(`/${id}`)}
                        color="blue"
                      >
                        Details
                      </Button>
                      <Button
                        color="green"
                        onClick={() => setEditData({ id, title, userId, body })}
                      >
                        Edit
                      </Button>
                      <Button
                        color="red"
                        textColor="black"
                        onClick={() => setDeleteId(id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {showCreate && (
            <Create
              onClose={() => setShowCreate(false)}
              onSuccess={(res) => {
                setData((prev) => {
                  const newData = [...prev, res];
                  return newData;
                });
              }}
            />
          )}
          {editData && (
            <Edit
              onClose={() => setEditData(null)}
              onSuccess={(res) => {
                setData((prev) => {
                  const newData = [...prev];
                  const { id } = res;
                  const index = newData.findIndex((item) => item.id === id);
                  newData.splice(index, 1, res);
                  return newData;
                });
              }}
            />
          )}
          {deleteId && (
            <Delete
              onClose={() => setDeleteId(null)}
              onSuccess={(id) => {
                setData((prev) => {
                  const newData = [...prev];
                  console.log(typeof id, id);
                  const index = newData.findIndex((item) => item.id === id);
                  newData.splice(index, 1);
                  return newData;
                });
              }}
            />
          )}
        </>
      )}
      {isError && <Message message={errorMsg.current} type="danger" />}
      {isLoading && <Message message="Now Loading..." />}
    </div>
  );
}

export default Main;
