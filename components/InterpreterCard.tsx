
import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Interpreter } from '../types';

interface InterpreterCardProps {
  interpreter: Interpreter;
}

const InterpreterCard: React.FC<InterpreterCardProps> = ({ interpreter }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300">
      <Link to={`/interpreter/${interpreter.id}`} className="block">
        <img className="h-48 w-full object-cover" src={interpreter.avatarUrl} alt={interpreter.name} />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-tertiary">{interpreter.name}</h3>
          <div className="flex items-center mt-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="text-tertiary/80 ml-1">{interpreter.rating.toFixed(1)} ({interpreter.reviews} hodnocení)</span>
          </div>
          <div className="mt-2">
            {interpreter.tags.slice(0, 3).map(tag => (
              <span key={tag} className="inline-block bg-light text-secondary text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default InterpreterCard;
