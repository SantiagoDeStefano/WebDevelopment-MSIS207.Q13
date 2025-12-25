/* eslint-disable react-refresh/only-export-components */
// useRouteElements.tsx
import { Link, Outlet, useParams, useRoutes } from "react-router-dom";
import Exercises from "./Exercises";

function Layout() {
  return (
    <>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </>
  );
}

function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/users/123">Go to User 123</Link> <br></br>
      <Link to="/exercises">Exercises</Link>
    </>
  );
}

function About() {
  return <h1>About</h1>;
}

function UserProfile() {
  const { userId } = useParams();
  return <h1>Profile for User: {userId}</h1>;
}

export default function useRouteElements() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "users/:userId", element: <UserProfile /> },
        { path: "exercises", element: <Exercises /> },
      ],
    },
  ]);
}
