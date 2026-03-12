export default function SnakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.5 3L2 1.5M3.5 3L2 4.5M3.5 3C5.5 3 7 4.5 7 6.5C7 9 5.5 10.5 5.5 13.5C5.5 16.5 8 18.5 11 18.5C14 18.5 16.5 16.5 16.5 13.5C16.5 10.5 15 9 15 6.5C15 4.5 16.5 3 19 3C20.5 3 21.5 4 21.5 5.5" strokeWidth="2.2" stroke="currentColor" fill="none" strokeLinecap="round" />
    </svg>
  );
}
