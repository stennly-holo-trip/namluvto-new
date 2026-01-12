
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-tertiary/70 text-sm">&copy; {new Date().getFullYear()} namluv.to. Všechna práva vyhrazena.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-sm text-tertiary/70 hover:text-tertiary">Podmínky služby</Link>
            <Link to="#" className="text-sm text-tertiary/70 hover:text-tertiary">Ochrana osobních údajů</Link>
            <Link to="#" className="text-sm text-tertiary/70 hover:text-tertiary">Kontakt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
