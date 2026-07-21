import { motion } from "framer-motion";

/**
 * Cinematic ECG / BPM line — mimics a hospital heart-rate monitor.
 * Two synced pulses: a bright red trace that sweeps across the line,
 * plus a subtle glow, over a soft grid.
 */
export function HeartbeatEcg({
  className = "",
  bpm = 72,
  color = "#e11d2f",
}: {
  className?: string;
  bpm?: number;
  color?: string;
}) {
  const duration = 60 / bpm; // seconds per beat

  // A single ECG cycle path (P–QRS–T waveform)
  const path =
    "M0 50 L120 50 L140 48 L160 52 L180 50 L220 50 L232 40 L240 15 L248 85 L256 30 L264 50 L300 50 L320 45 L340 55 L360 50 L500 50";

  return (
    <div className={`relative w-full ${className}`}>
      <svg
        viewBox="0 0 500 100"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ecg-fade" x1="0" x2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="15%" stopColor={color} stopOpacity="0.15" />
            <stop offset="70%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
          <filter id="ecg-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* baseline grid */}
        <g stroke="currentColor" strokeWidth="0.4" opacity="0.15">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="100" />
          ))}
          {Array.from({ length: 4 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 25 + 12} x2="500" y2={i * 25 + 12} />
          ))}
        </g>

        {/* dim base trace */}
        <path d={path} fill="none" stroke={color} strokeOpacity="0.18" strokeWidth="1.2" />

        {/* animated bright sweep */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#ecg-fade)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ecg-glow)"
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{ pathLength: [0.08, 0.35, 0.08], pathOffset: [0, 1, 1] }}
          transition={{
            duration,
            times: [0, 0.75, 1],
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </svg>

      {/* Pulsing dot indicator */}
      <motion.span
        className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
        style={{ background: color, boxShadow: `0 0 12px ${color}` }}
        animate={{ scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration, repeat: Infinity, ease: "easeOut" }}
      />
    </div>
  );
}
