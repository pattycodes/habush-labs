export default function JapanNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 bg-black border-b border-border">
      <a
        href="/"
        className="flex items-center gap-2 text-base md:text-lg font-mono font-bold tracking-wider uppercase text-foreground"
      >
        <img src="/habush_svg.svg" alt="Habush" className="w-8 h-8 md:w-9 md:h-9 scale-x-[-1]" />
        HABUSH<span className="text-yellow">.</span>LABS
      </a>
      <div className="flex items-center gap-6 md:gap-8">
        <a
          href="#the-problem"
          className="hidden md:block text-xs font-mono tracking-wider uppercase text-muted hover:text-foreground transition-colors"
        >
          &gt; THE PROBLEM
        </a>
        <a
          href="#services"
          className="hidden md:block text-xs font-mono tracking-wider uppercase text-muted hover:text-foreground transition-colors"
        >
          &gt; SERVICES
        </a>
        <a
          href="#contact"
          className="hidden md:block text-xs font-mono tracking-wider uppercase text-muted hover:text-foreground transition-colors"
        >
          &gt; CONTACT
        </a>
        <a
          href="https://cal.com/habush/localization-discovery-call"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono font-bold tracking-wider uppercase bg-yellow text-black px-5 py-2.5 hover:bg-yellow/80 transition-colors"
        >
          BOOK A CALL
        </a>
      </div>
    </nav>
  );
}
