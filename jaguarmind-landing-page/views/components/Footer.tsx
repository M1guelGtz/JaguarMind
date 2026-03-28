"use client";

export default function Footer() {
  return (
    <footer id="contact" className="py-8 sm:py-12 px-4 sm:px-6 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()}{" "}
          <span className="bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent font-semibold">
            Jaguarmind
          </span>
          . All rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-text-muted">
          <a href="#community" className="hover:text-accent transition-colors">
            Community
          </a>
          <a href="#team" className="hover:text-accent transition-colors">
            Team
          </a>
        </div>
      </div>
    </footer>
  );
}
