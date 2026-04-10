import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-synchro-white border-b border-synchro-light-gray">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-synchro-gold rounded" />
          <span className="font-display font-bold text-lg text-synchro-dark-base">SynchroB</span>
        </Link>
        <div className="flex gap-8 text-sm">
          <Link to="/search" className="text-synchro-dark-gray hover:text-synchro-gold transition">
            Search
          </Link>
          <a href="#" className="text-synchro-dark-gray hover:text-synchro-gold transition">
            About
          </a>
        </div>
      </nav>
    </header>
  );
}
