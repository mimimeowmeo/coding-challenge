"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Message from "@/components/Message";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        if (!postResponse.ok) throw new Error("Failed to fetch post details");

        const postData = await postResponse.json();
        setPost(postData);

        const commentsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        if (!commentsResponse.ok)
          throw new Error("Failed to fetch post comments");

        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 justify-center">
      <h1 className="text-2xl font-bold mb-4">Post Details</h1>
      {post && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-600">User ID: {post.userId}</p>
          <p className="mt-2">{post.body}</p>
        </div>
      )}
      <h2 className="text-xl font-bold mb-2">Comments</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="border-b py-2">
              <p className="font-bold">{comment.name}</p>
              <p className="text-gray-600">{comment.email}</p>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
      {errorMsg && <Message message={errorMsg} type="danger" />}
      {isLoading && <Message message="Now Loading..." />}
    </div>
  );
}
