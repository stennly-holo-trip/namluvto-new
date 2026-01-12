
import React, { useState } from 'react';
import { Volume2, Bot, Loader2 } from 'lucide-react';
import { generateSpeech } from '../services/geminiService';

const AIVoicePage: React.FC = () => {
  const [text, setText] = useState<string>("Dobrý den, toto je ukázka hlasu generovaného umělou inteligencí z platformy namluv.to.");
  const [voice, setVoice] = useState<string>('Kore');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Zadejte prosím text k převedení na řeč.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const url = await generateSpeech(text, voice);
      setAudioUrl(url);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Došlo k neznámé chybě.");
    } finally {
      setIsLoading(false);
    }
  };

  const voices = [
    { id: 'Kore', name: 'Kore (Žena, neutrální)' },
    { id: 'Puck', name: 'Puck (Muž, neutrální)' },
    { id: 'Zephyr', name: 'Zephyr (Žena, přátelský)' },
    { id: 'Charon', name: 'Charon (Muž, hluboký)' },
    { id: 'Fenrir', name: 'Fenrir (Muž, energický)' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <Bot className="h-10 w-10 text-primary mr-4" />
          <div>
            <h1 className="text-3xl font-bold text-tertiary">AI Hlasový Generátor</h1>
            <p className="text-tertiary/90">Převeďte text na řeč pomocí pokročilé AI technologie.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="text-input" className="block text-sm font-medium text-tertiary">
              Váš text
            </label>
            <textarea
              id="text-input"
              rows={5}
              className="mt-1 block w-full rounded-md bg-white text-tertiary placeholder-tertiary/60 border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Zadejte text, který chcete převést na řeč..."
            />
          </div>

          <div>
            <label htmlFor="voice-select" className="block text-sm font-medium text-tertiary">
              Vyberte hlas
            </label>
            <select
              id="voice-select"
              className="mt-1 block w-full rounded-md border-gray-300 bg-white text-tertiary py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
            >
              {voices.map((v) => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
          </div>

          <div>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-primary/50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Volume2 className="mr-2 h-5 w-5" />
              )}
              {isLoading ? 'Generování...' : 'Generovat zvuk'}
            </button>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Chyba</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {audioUrl && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-tertiary mb-2">Výsledek</h3>
              <audio controls src={audioUrl} className="w-full">
                Váš prohlížeč nepodporuje audio element.
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIVoicePage;
