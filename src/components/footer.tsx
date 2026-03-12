export default function Footer() {
  return (
    <footer className="bg-black px-8 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border">
      <p className="text-[10px] font-mono tracking-wider uppercase text-muted">
        &copy; {new Date().getFullYear()} HABUSH LABS
      </p>
      <p className="text-[10px] font-mono tracking-wider uppercase text-muted">
        A <span className="text-yellow">H3AT STUDIOS</span> SUBSIDIARY
      </p>
    </footer>
  );
}
