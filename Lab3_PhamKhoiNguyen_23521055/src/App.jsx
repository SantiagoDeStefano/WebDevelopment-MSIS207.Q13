import UserProfile from "./UserProfile";
import Login from "./Login";
import Counter from "./Counter";
import Card from "./Card";
import Accordion from "./Accordion";
import TodoApp from "./TodoApp";

function App() {
  const user1 = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
  };

  const user2 = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <>
      <Card title="User 1 Profile">
        <UserProfile userData={user1} />
      </Card>

      <Card title="User 2 Profile">
        <UserProfile userData={user2} />
      </Card>

      <Accordion />

      <Login />
      <Counter />

      <TodoApp />
    </>
  );
}

export default App;
