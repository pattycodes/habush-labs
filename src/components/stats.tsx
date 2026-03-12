const stats = [
  { value: ">100M", label: "VIEWS ACCOMPLISHED" },
  { value: ">$1M", label: "REVENUE GENERATED" },
  { value: "$52M", label: "EXIT ACHIEVED" },
  { value: "9+", label: "PROJECTS LAUNCHED" },
];

export default function Stats() {
  return (
    <section className="bg-black px-8 md:px-16 py-16 md:py-24 border-y border-border">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-4xl md:text-5xl font-mono font-bold text-yellow">
              {stat.value}
            </p>
            <p className="text-[10px] font-mono tracking-wider uppercase text-muted mt-3">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
