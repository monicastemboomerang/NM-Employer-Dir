import { Badge } from "@repo/ui";

interface BadgeDisplayProps {
  value: string[];
}

export function BadgeDisplay({ value }: BadgeDisplayProps) {
  return (
    <div
      style={{
        maxHeight: "6rem",
        overflowX: "auto",
      }}
    >
      {value.map((v) => (
        <Badge className="m-1" key={v} variant="outline">
          {v}
        </Badge>
      ))}
    </div>
  );
}
