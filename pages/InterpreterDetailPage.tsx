
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MessageSquare } from 'lucide-react';
import { MOCK_INTERPRETERS } from '../constants';
import AudioPlayer from '../components/AudioPlayer';

const InterpreterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const interpreter = MOCK_INTERPRETERS.find(i => i.id === id);

  if (!interpreter) {
    return <div className="text-center py-10">Interpret nebyl nalezen.</div>;
  }
  
  const gender = interpreter.tags.includes('Muž') ? 'male' : 'female';

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="p-8">
        <div className="md:flex md:items-start md:gap-8">
          <div className="md:w-1/3 text-center">
            <img 
              className="h-48 w-48 rounded-full object-cover mx-auto shadow-lg" 
              src={interpreter.avatarUrl} 
              alt={interpreter.name} 
            />
            <h1 className="text-3xl font-bold text-tertiary mt-4">{interpreter.name}</h1>
            <div className="flex items-center justify-center mt-2 text-yellow-500">
              <Star size={20} fill="currentColor" />
              <span className="text-tertiary/80 ml-2 text-lg">{interpreter.rating.toFixed(1)} ({interpreter.reviews} hodnocení)</span>
            </div>
            <div className="mt-6 flex flex-col gap-3">
               <Link
                to="/post-job"
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary"
              >
                Najmout přímo
              </Link>
               <button
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-tertiary bg-white hover:bg-accent"
              >
                <MessageSquare className="mr-2 h-5 w-5"/>
                Poslat zprávu
              </button>
            </div>
          </div>
          <div className="md:w-2/3 mt-8 md:mt-0">
            <h2 className="text-2xl font-semibold text-tertiary">O mně</h2>
            <p className="mt-2 text-tertiary/90">{interpreter.bio}</p>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-tertiary">Specializace</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {interpreter.tags.map(tag => (
                  <span key={tag} className="inline-block bg-light text-secondary text-sm font-medium px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-tertiary">Hlasové ukázky</h2>
              <div className="mt-4 space-y-3">
                {interpreter.samples.map(sample => (
                  <AudioPlayer key={sample.id} sample={sample} gender={gender} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterpreterDetailPage;
