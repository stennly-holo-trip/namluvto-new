
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Loader2 } from 'lucide-react';
import { VoiceSample } from '../types';
import { generateSpeech } from '../services/geminiService';

// Cache at module level to persist across component instances and re-renders
const audioCache = new Map<string, string>();

const voiceMap = {
    male: 'Puck',
    female: 'Kore',
};

// Fallback silent audio in case of generation failure
const silentAudioDataUrl = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";

const getSampleAudioUrl = async (sampleId: string, sampleTitle: string, gender: 'male' | 'female'): Promise<string> => {
    if (audioCache.has(sampleId)) {
        return audioCache.get(sampleId)!;
    }

    try {
        const voice = voiceMap[gender];
        const textToGenerate = `Toto je hlasová ukázka pro ${sampleTitle}.`;
        const url = await generateSpeech(textToGenerate, voice);
        audioCache.set(sampleId, url);
        return url;
    } catch (error) {
        console.error(`Failed to generate audio for sample ${sampleId}:`, error);
        return silentAudioDataUrl;
    }
};


interface AudioPlayerProps {
  sample: VoiceSample;
  gender: 'male' | 'female';
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ sample, gender }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const fetchAudio = async () => {
      setIsLoading(true);
      const url = await getSampleAudioUrl(sample.id, sample.title, gender);
      if (audioRef.current) {
        audioRef.current.src = url;
      }
      setIsLoading(false);
    };
    fetchAudio();
  }, [sample.id, sample.title, gender]);

  const togglePlayPause = () => {
    if (isLoading) return;
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center justify-between p-3 bg-accent rounded-lg w-full">
       <audio 
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
        }}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlayPause}
          className="p-2 w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-primary/50"
          disabled={isLoading}
          aria-label={isLoading ? "Načítání ukázky" : isPlaying ? "Pozastavit ukázku" : "Přehrát ukázku"}
        >
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>
        <div>
          <p className="font-semibold text-tertiary">{sample.title}</p>
          <p className="text-sm text-tertiary/70">{sample.style}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-tertiary/70">{formatTime(currentTime)}</span>
        <div className="w-24 h-1 bg-tertiary/20 rounded-full overflow-hidden">
            <div className="h-1 bg-primary" style={{width: `${progress}%`}}></div>
        </div>
        <span className="text-sm text-tertiary/70">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
