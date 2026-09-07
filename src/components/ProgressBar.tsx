export default function ProgressBar({
  value,
  colorClass = "bg-[#e8a33d]",
}: {
  value: number;
  colorClass?: string;
}) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1b1f2b]">
      <div
        className={`h-full rounded-full ${colorClass}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
