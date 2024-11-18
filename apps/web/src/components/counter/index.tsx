import { useState } from "react";
import "./index.css";

export const SOMETHING = "12";

export default function Counter({
  children,
  count: initialCount,
}: {
  children: JSX.Element;
  count: number;
}) {
  const [count, setCount] = useState(initialCount);
  const add = () => {
    setCount((i) => i + 1);
  };
  const subtract = () => {
    setCount((i) => i - 1);
  };

  return (
    <>
      <div className="counter">
        <button onClick={subtract} type="button">
          -
        </button>
        <pre>{count}</pre>
        <button onClick={add} type="button">
          +
        </button>
      </div>
      <div className="counter-message">{children}</div>
    </>
  );
}
