import { useEffect, useState } from "react";

/**
 * Live clock, matching the reference's "SAT 9:28 A.M" bottom-right readout.
 *
 * Renders nothing until mounted. Formatting the time on the server would
 * produce the server's clock and then change on hydration, which React
 * treats as a mismatch.
 */
export default function Clock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    /* Reserve the same width so the layout does not shift on hydration. */
    return <span className={`label tabular-nums opacity-0 ${className}`}>SAT 0:00 A.M</span>;
  }

  const day = now.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const hour = now.getHours() % 12 || 12;
  const minute = now.getMinutes().toString().padStart(2, "0");
  const meridiem = now.getHours() < 12 ? "A.M" : "P.M";

  return (
    <span className={`label tabular-nums ${className}`}>
      {day} {hour}:{minute} {meridiem}
    </span>
  );
}
