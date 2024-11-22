import { Button } from "@repo/ui";
import { ArrowBigLeft } from "lucide-react";

export function BackButton() {
  const handleClick = () => {
    window.history.back();
  };
  return (
    <Button className="mb-2" onClick={handleClick} size="icon" variant="ghost">
      <ArrowBigLeft />
    </Button>
  );
}
