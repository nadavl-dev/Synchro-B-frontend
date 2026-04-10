export default function Footer() {
  return (
    <footer className="bg-synchro-very-light-gray border-t border-synchro-light-gray mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="font-semibold text-synchro-dark-base mb-4">SynchroB</h3>
            <p className="text-sm text-synchro-medium-gray">Find the perfect open-source tools for your needs.</p>
          </div>
          <div>
            <h3 className="font-semibold text-synchro-dark-base mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-synchro-medium-gray">
              <li><a href="#" className="hover:text-synchro-gold transition">Search</a></li>
              <li><a href="#" className="hover:text-synchro-gold transition">Browse</a></li>
              <li><a href="#" className="hover:text-synchro-gold transition">API</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-synchro-dark-base mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-synchro-medium-gray">
              <li><a href="#" className="hover:text-synchro-gold transition">About</a></li>
              <li><a href="#" className="hover:text-synchro-gold transition">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-synchro-light-gray pt-6 text-center text-xs text-synchro-medium-gray">
          <p>&copy; 2026 SynchroB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
