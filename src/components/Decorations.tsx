interface DecorationProps {
  className?: string;
}

export function OliveBranch({ className = "" }: DecorationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 40"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 28 C30 25, 55 18, 80 14 C90 12, 100 11, 110 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="25" cy="24" rx="7" ry="3" transform="rotate(-20 25 24)" />
      <ellipse cx="30" cy="28" rx="6" ry="2.5" transform="rotate(15 30 28)" />
      <ellipse cx="42" cy="20" rx="7" ry="3" transform="rotate(-25 42 20)" />
      <ellipse cx="46" cy="25" rx="6" ry="2.5" transform="rotate(10 46 25)" />
      <ellipse cx="58" cy="17" rx="7" ry="3" transform="rotate(-20 58 17)" />
      <ellipse cx="62" cy="22" rx="6" ry="2.5" transform="rotate(15 62 22)" />
      <ellipse cx="75" cy="14" rx="6.5" ry="2.8" transform="rotate(-25 75 14)" />
      <ellipse cx="78" cy="19" rx="5.5" ry="2.5" transform="rotate(10 78 19)" />
      <ellipse cx="90" cy="12" rx="6" ry="2.5" transform="rotate(-20 90 12)" />
      <ellipse cx="93" cy="16" rx="5" ry="2.2" transform="rotate(15 93 16)" />
      <ellipse cx="104" cy="12" rx="5" ry="2.2" transform="rotate(-15 104 12)" />
    </svg>
  );
}

export function OliveBranchDivider({ className = "" }: DecorationProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <OliveBranch className="w-24 md:w-32 opacity-current scale-x-[-1] translate-y-2" />
      <img
        src="/dove-logo.webp"
        alt=""
        className="w-8 md:w-10 shrink-0 opacity-[0.12]"
      />
      <OliveBranch className="w-24 md:w-32 opacity-current translate-y-2" />
    </div>
  );
}
