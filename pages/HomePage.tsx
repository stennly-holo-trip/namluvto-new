
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, PenSquare, Headphones, Bot } from 'lucide-react';
import { MOCK_INTERPRETERS } from '../constants';
import InterpreterCard from '../components/InterpreterCard';

const HomePage: React.FC = () => {
  const featuredInterpreters = MOCK_INTERPRETERS.slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center bg-white py-20 px-6 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-tertiary">
          Najděte dokonalý hlas pro váš projekt
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-tertiary/90">
          Propojení s profesionálními dabéry a nejmodernější AI technologií pro vaše audioprojekty.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/browse"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary"
          >
            <Search className="mr-2 -ml-1 h-5 w-5" />
            Hledat hlasy
          </Link>
          <Link
            to="/ai-voice"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary/20 text-base font-medium rounded-md text-primary bg-light hover:bg-primary hover:text-white transition-colors"
          >
             <Bot className="mr-2 -ml-1 h-5 w-5" />
            Vyzkoušet AI Hlas
          </Link>
        </div>
      </section>

      {/* How it Works Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-tertiary">Jak to funguje</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
              <PenSquare />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-tertiary">1. Zadejte poptávku</h3>
            <p className="mt-2 text-base text-tertiary/90">
              Popište svůj projekt, nahrajte scénář a specifikujte své požadavky na hlas.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
              <Search />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-tertiary">2. Vyberte si interpreta</h3>
            <p className="mt-2 text-base text-tertiary/90">
              Prohlédněte si nabídky od talentovaných dabérů nebo si vyberte z našeho katalogu hlasů.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white mx-auto">
              <Headphones />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-tertiary">3. Stáhněte si nahrávku</h3>
            <p className="mt-2 text-base text-tertiary/90">
              Komunikujte s interpretem, schvalte finální nahrávku a stáhněte si ji v profesionální kvalitě.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Interpreters Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-tertiary">Doporučení interpreti</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredInterpreters.map(interpreter => (
            <InterpreterCard key={interpreter.id} interpreter={interpreter} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/browse" className="text-primary hover:text-secondary font-semibold">
            Zobrazit všechny interprety &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
