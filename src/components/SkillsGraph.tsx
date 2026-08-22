import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  {
    id: "ml",
    label: "AI/ML",
    x: 320,
    y: 72,
    skills: ["Python", "MH-100K", "Risk models"],
  },
  {
    id: "sec",
    label: "Cybersecurity",
    x: 118,
    y: 248,
    skills: ["Android malware", "Secure APIs"],
  },
  {
    id: "fs",
    label: "Full-Stack Dev",
    x: 522,
    y: 248,
    skills: ["MERN", "Next.js", "Tailwind"],
  },
] as const;

const edges = [
  ["ml", "sec"],
  ["sec", "fs"],
  ["fs", "ml"],
] as const;

function nodeById(id: string) {
  return nodes.find((node) => node.id === id)!;
}

export default function SkillsGraph() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full rounded-md bg-white/5 p-4 shadow-md backdrop-blur md:col-span-2 xl:col-span-3 xl:p-8">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        intersection map
      </p>
      <svg
        viewBox="0 0 640 360"
        className="h-auto w-full"
        role="img"
        aria-label="AI/ML, Cybersecurity, and Full-Stack Dev as three connected practice areas"
      >
        <title>How AI/ML, cybersecurity, and full-stack development intersect</title>
        {edges.map(([from, to], index) => {
          const a = nodeById(from);
          const b = nodeById(to);
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="hsl(var(--primary))"
              strokeWidth="1.25"
              strokeOpacity="0.45"
              strokeDasharray="6 8"
              initial={false}
              animate={
                reduceMotion
                  ? { strokeDashoffset: 0, opacity: 0.7 }
                  : { strokeDashoffset: [0, -28], opacity: [0.35, 0.8, 0.35] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 4 + index,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
            />
          );
        })}

        {!reduceMotion && (
          <motion.circle
            r="3.5"
            fill="hsl(var(--secondary))"
            animate={{
              cx: [320, 118, 522, 320],
              cy: [72, 248, 248, 72],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        )}

        {nodes.map((node) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="42"
              fill="hsl(var(--background))"
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: [0.85, 1, 0.85], r: [40, 44, 40] }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
              }
            />
            <text
              x={node.x}
              y={node.y + 4}
              textAnchor="middle"
              className="fill-foreground text-[13px] font-medium"
            >
              {node.label}
            </text>
            {node.skills.map((skill, skillIndex) => {
              const offsetY =
                node.id === "ml" ? -58 - skillIndex * 16 : 62 + skillIndex * 16;
              const offsetX =
                node.id === "sec" ? -8 : node.id === "fs" ? 8 : 0;
              return (
                <text
                  key={skill}
                  x={node.x + offsetX}
                  y={node.y + offsetY}
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono text-[11px]"
                >
                  {skill}
                </text>
              );
            })}
          </g>
        ))}

        <text
          x="320"
          y="188"
          textAnchor="middle"
          className="fill-secondary text-[11px] tracking-tight"
        >
          one practice
        </text>
      </svg>
    </div>
  );
}
