type LogoMarkProps = {
  className?: string;
};

export default function LogoMark({ className = '' }: LogoMarkProps) {
  return (
    <div className={`landing-brand-lockup ${className}`.trim()}>
      <div className="landing-brand-mark">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 380 100"
          width="100%"
          height="100%"
          preserveAspectRatio="xMinYMid meet"
          role="img"
          aria-label="xolto logo"
        >
          <defs>
            <linearGradient id="landing-g-front" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f8f67" />
              <stop offset="100%" stopColor="#52d4a5" />
            </linearGradient>
            <linearGradient id="landing-g-back-dark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f8f67" />
              <stop offset="100%" stopColor="#0a6f4f" />
            </linearGradient>
            <filter id="landing-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="6"
                floodColor="#081510"
                floodOpacity="0.6"
              />
            </filter>
            <style>{`.text { font-family: var(--font-sans); font-weight: 800; font-size: 76px; letter-spacing: -0.04em; fill: #ffffff; }`}</style>
          </defs>
          <g>
            <path
              d="M 10 10 L 40 10 L 90 60 L 90 90 L 60 90 L 10 40 Z"
              fill="url(#landing-g-back-dark)"
            />
            <path
              d="M 10 90 L 40 90 L 90 40 L 90 10 L 60 10 L 10 60 Z"
              fill="url(#landing-g-front)"
              filter="url(#landing-shadow)"
            />
          </g>
          <text x="105" y="74" className="text">
            xolto
          </text>
        </svg>
      </div>
    </div>
  );
}
