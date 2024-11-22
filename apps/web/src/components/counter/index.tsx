import { Button } from "@repo/ui";
import { useState } from "react";
import "./index.css";

export const SOMETHING = "12";

export default function Counter({
  children,
  count: initialCount = 0,
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
        <Button onClick={subtract} type="button">
          -
        </Button>
        <pre className="text-primary-foreground">{count}</pre>
        <Button onClick={add} type="button">
          +
        </Button>
      </div>
      <div className="counter-message">{children}</div>
    </>
  );
}
