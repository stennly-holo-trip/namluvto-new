
import React, { useState, useMemo } from 'react';
import InterpreterCard from '../components/InterpreterCard';
import { MOCK_INTERPRETERS } from '../constants';
import { Interpreter } from '../types';
import { Frown } from 'lucide-react';

const BrowsePage: React.FC = () => {
  const [filters, setFilters] = useState({
    gender: 'Vše',
    style: 'Vše',
    keyword: ''
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredInterpreters = useMemo(() => {
    return MOCK_INTERPRETERS.filter(interpreter => {
      // Gender filter
      if (filters.gender !== 'Vše') {
        const genderTag = filters.gender === 'Muž' ? 'Muž' : 'Žena';
        if (!interpreter.tags.includes(genderTag)) return false;
      }
      
      // Style filter
      if (filters.style !== 'Vše' && !interpreter.tags.includes(filters.style)) {
        return false;
      }

      // Keyword filter
      if (filters.keyword.trim() !== '') {
        const searchTerm = filters.keyword.toLowerCase();
        const inName = interpreter.name.toLowerCase().includes(searchTerm);
        const inBio = interpreter.bio.toLowerCase().includes(searchTerm);
        const inTags = interpreter.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        if (!inName && !inBio && !inTags) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold text-tertiary">Katalog hlasů</h1>
        <p className="mt-2 text-tertiary/90">Najděte ideálního interpreta pro váš další projekt. Filtrujte podle stylu, jazyka a dalších kritérií.</p>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-tertiary">Pohlaví</label>
            <select id="gender" name="gender" value={filters.gender} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white text-tertiary">
              <option>Vše</option>
              <option>Muž</option>
              <option>Žena</option>
            </select>
          </div>
          <div>
            <label htmlFor="style" className="block text-sm font-medium text-tertiary">Styl hlasu</label>
            <select id="style" name="style" value={filters.style} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white text-tertiary">
              <option>Vše</option>
              <option>Reklama</option>
              <option>Vyprávění</option>
              <option>Energický</option>
              <option>Uklidňující</option>
              <option>Informativní</option>
              <option>Podcast</option>
            </select>
          </div>
           <div>
            <label htmlFor="keyword" className="block text-sm font-medium text-tertiary">Klíčové slovo</label>
            <input type="text" id="keyword" name="keyword" placeholder="např. 'podcast'" value={filters.keyword} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white text-tertiary placeholder-tertiary/60"/>
          </div>
        </div>
      </div>

      {filteredInterpreters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredInterpreters.map(interpreter => (
            <InterpreterCard key={interpreter.id} interpreter={interpreter} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
            <Frown className="mx-auto h-12 w-12 text-tertiary/50" />
            <h2 className="mt-2 text-xl font-semibold text-tertiary">Žádné výsledky</h2>
            <p className="mt-1 text-tertiary/80">Zkuste prosím upravit filtry, nenašli jsme žádné interprety odpovídající vašemu hledání.</p>
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
