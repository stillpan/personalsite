export default function Footer() {
  return (
    <footer className="border-t border-[#D9D0C4] bg-[#F0EBE1]">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-[family-name:var(--font-playfair)] text-sm text-[#6b6b6b]">
          © {new Date().getFullYear()} Yuki Zhang
        </p>
        <div className="flex items-center gap-6 text-sm text-[#6b6b6b]">
          <a
            href="https://www.linkedin.com/in/yuki-zhang-a94638244/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8B5E3C] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:shuyue_zhang1@brown.edu"
            className="hover:text-[#8B5E3C] transition-colors"
          >
            shuyue_zhang1@brown.edu
          </a>
        </div>
      </div>
    </footer>
  );
}
