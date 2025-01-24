import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            Brand
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <button className="px-6 py-2 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-primary hover:text-opacity-70 transition-colors duration-200"
  >
    {children}
  </a>
);

export default Navbar;