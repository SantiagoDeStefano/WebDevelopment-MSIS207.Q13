// pages/Exercises.tsx

import ControlledSignup from "./ControlledSignup";
import MouseTracker from "./MouseTracker";
import PostFetcher from "./PostFetcher";
import UncontrolledLogin from "./UncontrolledLogin";

function Exercises() {
  return (
    <>
      <MouseTracker />
      <UncontrolledLogin />
      <PostFetcher />
      <ControlledSignup />
    </>
  );
}

export default Exercises;
