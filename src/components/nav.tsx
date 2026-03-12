import SnakeIcon from "./snake-icon";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 bg-black border-b border-border">
      <a
        href="#"
        className="flex items-center gap-2 text-base md:text-lg font-mono font-bold tracking-wider uppercase text-foreground"
      >
        <SnakeIcon className="w-5 h-5 md:w-6 md:h-6 text-yellow" />
        HABUSH<span className="text-yellow">.</span>LABS
      </a>
      <div className="flex items-center gap-6 md:gap-8">
        <a
          href="#what-we-do"
          className="hidden md:block text-xs font-mono tracking-wider uppercase text-muted hover:text-foreground transition-colors"
        >
          &gt; WHAT WE DO
        </a>
        <a
          href="#portfolio"
          className="hidden md:block text-xs font-mono tracking-wider uppercase text-muted hover:text-foreground transition-colors"
        >
          &gt; PORTFOLIO
        </a>
        <a
          href="#contact"
          className="hidden md:block text-xs font-mono tracking-wider uppercase text-muted hover:text-foreground transition-colors"
        >
          &gt; CONTACT
        </a>
        <a
          href="#contact"
          className="text-xs font-mono font-bold tracking-wider uppercase bg-yellow text-black px-5 py-2.5 hover:bg-yellow/80 transition-colors"
        >
          BOOK A CALL
        </a>
      </div>
    </nav>
  );
}
