import WaveBg from "./wave-bg";

export default function Hero() {
  return (
    <section className="relative mt-[60px] overflow-hidden">
      <div className="relative w-full min-h-[85vh] flex flex-col justify-end p-8 md:p-16">
        {/* Animated wavy gradient background */}
        <WaveBg />

        <div className="relative z-10">
          <h1 className="animate-fade-up text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-mono font-bold uppercase leading-[0.95] tracking-tight text-foreground">
            WE ARE THE
            <br />
            PREMIERE <span className="text-foreground/60">APP &</span>
            <br />
            <span className="text-foreground/60">MARKETING</span> STUDIO
          </h1>
          <div className="animate-fade-up-delay-2 mt-8">
            <a
              href="#contact"
              className="inline-block text-xs font-mono font-bold tracking-wider uppercase bg-yellow text-black px-6 py-3 hover:bg-yellow/80 transition-colors"
            >
              BOOK A CALL
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
