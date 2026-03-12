export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-background-dark px-8 md:px-16 py-20 md:py-32 relative overflow-hidden"
    >
      {/* Dot matrix decoration */}
      <div className="absolute top-0 left-0 w-1/4 h-full dot-matrix pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="text-xs font-mono tracking-wider uppercase text-muted mb-8">
          &gt; GET IN TOUCH:
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold uppercase leading-tight">
          LET&apos;S <span className="text-yellow">COLLABORATE</span> AND
          <br />
          MAKE SOME <span className="text-red">FIRE</span>
        </h2>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://cal.com/habush"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs font-mono font-bold tracking-wider uppercase bg-yellow text-black px-8 py-4 hover:bg-yellow/80 transition-colors"
          >
            BOOK A CALL
          </a>
          <a
            href="mailto:hello@habush.ai"
            className="inline-block text-xs font-mono font-bold tracking-wider uppercase border border-border text-foreground px-8 py-4 hover:border-yellow hover:text-yellow transition-colors"
          >
            HELLO@HABUSH.AI
          </a>
        </div>
      </div>
    </section>
  );
}
