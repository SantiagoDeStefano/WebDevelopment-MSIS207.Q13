import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

type Post = {
  id: number;
  title: string;
};

function DashboardHome() {
  const { data, loading, error } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.slice(0, 20).map((p) => (
          <li key={p.id}>
            <Link to={`/dashboard/post/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardHome;
