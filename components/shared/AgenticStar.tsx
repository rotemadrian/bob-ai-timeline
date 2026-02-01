'use client';

interface AgenticStarProps {
  className?: string;
  size?: number;
  useGradient?: boolean;
}

export function AgenticStar({ className, size = 24, useGradient = true }: AgenticStarProps) {
  const starPath = "M15.6807 29.6019L17.7419 25.9265C19.6649 22.4965 22.498 19.6649 25.9265 17.7419L29.6019 15.6807C30.1327 15.3822 30.1327 14.6177 29.6019 14.3193L25.9265 12.2581C22.4965 10.3351 19.6649 7.50202 17.7419 4.07353L15.6807 0.398054C15.3822 -0.132685 14.6178 -0.132685 14.3193 0.398054L12.2581 4.07353C10.3351 7.50349 7.50202 10.3351 4.07353 12.2581L0.398054 14.3193C-0.132685 14.6177 -0.132685 15.3822 0.398054 15.6807L4.07353 17.7419C7.50349 19.6649 10.3351 22.498 12.2581 25.9265L14.3193 29.6019C14.6178 30.1327 15.3822 30.1327 15.6807 29.6019Z";

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {useGradient && (
        <defs>
          <linearGradient id="agentic-star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d489f7" />
            <stop offset="38%" stopColor="#f65e3d" />
            <stop offset="72%" stopColor="#f1bd03" />
            <stop offset="100%" stopColor="#e73bc4" />
          </linearGradient>
        </defs>
      )}
      <path
        d={starPath}
        fill={useGradient ? "url(#agentic-star-gradient)" : "currentColor"}
      />
    </svg>
  );
}
