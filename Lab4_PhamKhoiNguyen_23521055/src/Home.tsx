import { Link } from "react-router-dom";

// pages/Home.tsx
function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/exercises">Exercises</Link> <br></br>
      <Link to="/about">About</Link>
    </>
  );
}

export default Home;
