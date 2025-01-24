import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="text-xl sm:text-2xl font-bold text-primary">
          Nda-jiya
        </Link>
        
        <div className="hidden sm:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <a 
              href="https://ndajiya.github.io/mohammed-suberu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden py-4 px-2 space-y-2 bg-white/95 backdrop-blur-lg rounded-b-lg">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <a 
                href="https://ndajiya.github.io/mohammed-suberu"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;