import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

type Post = {
  id: number;
  title: string;
  body: string;
};

function PostDetail() {
  const { postId } = useParams();
  const url = postId
    ? `https://jsonplaceholder.typicode.com/posts/${postId}`
    : null;

  const { data, loading, error } = useFetch<Post>(url);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <Link to="/dashboard">← Back</Link>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}

export default PostDetail;
