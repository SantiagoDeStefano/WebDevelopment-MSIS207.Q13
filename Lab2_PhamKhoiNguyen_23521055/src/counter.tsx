/** @jsx createElement */
import { createElement } from "./jsx-runtime";
import { useState } from "./jsx-runtime";
import "./counter.css";
interface ButtonProps {
  onClick?: () => void;
  children?: any;
  className?: string;
}

const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

interface CounterProps {
  initialCount?: number;
}

export const Counter = ({ initialCount = 0 }: CounterProps) => {
  const [getCount, setCount] = useState<number>(initialCount);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialCount);

  return (
    <div className="counter">
      <h2>Count: {getCount}</h2>
      <div>
        <Button onClick={() => increment()}>+</Button>
        <Button onClick={() => decrement()}>-</Button>
        <Button onClick={() => reset()}>Reset</Button>
      </div>
    </div>
  );
};
