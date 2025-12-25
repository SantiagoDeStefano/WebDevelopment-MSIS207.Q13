import useLocalStorage from "./useLocalStorage";

function Counter() {
  const [count, setCount] = useLocalStorage<number>("myCounter", 0);

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}

export default Counter;
