
"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, FastForward, Rewind, ChevronsUp, ChevronsDown } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface AudioPlayerProps {
  src: string;
  // If provided, the player will save and restore its progress from localStorage
  storageKey?: string;
}

const formatTime = (seconds: number) => {
  const floored = Math.floor(seconds);
  const min = Math.floor(floored / 60);
  const sec = floored % 60;
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};

export default function AudioPlayer({ src, storageKey }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isSeeking, setIsSeeking] = useState(false);
  
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const saveProgress = useCallback(() => {
    if (storageKey && audioRef.current) {
        localStorage.setItem(storageKey, audioRef.current.currentTime.toString());
    }
  }, [storageKey]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      if (storageKey) {
        const savedTime = localStorage.getItem(storageKey);
        if (savedTime) {
          const time = parseFloat(savedTime);
          if (!isNaN(time) && time < audio.duration) {
              audio.currentTime = time;
              setCurrentTime(time);
          }
        }
      }
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('ended', () => setIsPlaying(false));


    // Save progress periodically
    audio.addEventListener('play', () => {
        if (storageKey) {
            saveIntervalRef.current = setInterval(saveProgress, 2000);
        }
    });

    audio.addEventListener('pause', () => {
        if (saveIntervalRef.current) {
            clearInterval(saveIntervalRef.current);
            saveProgress(); // One final save on pause
        }
    });


    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('play', () => setIsPlaying(true));
      audio.removeEventListener('pause', () => setIsPlaying(false));
      audio.removeEventListener('ended', () => setIsPlaying(false));
       if (saveIntervalRef.current) {
            clearInterval(saveIntervalRef.current);
        }
    };
  }, [src, storageKey, saveProgress]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
        const newTime = value[0];
        if (!isSeeking) setIsSeeking(true);
        setCurrentTime(newTime);
    }
  };
  
  const handleSeekCommit = (value: number[]) => {
      if (audioRef.current) {
          audioRef.current.currentTime = value[0];
      }
      setIsSeeking(false);
  }

  const handleSkip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };
  
  const changePlaybackRate = (rate: number) => {
      if(audioRef.current) {
          audioRef.current.playbackRate = rate;
          setPlaybackRate(rate);
      }
  }
  
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full bg-secondary p-4 rounded-lg flex flex-col gap-2">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      <div className="flex items-center gap-4">
        <Button size="icon" variant="ghost" onClick={togglePlayPause}>
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
        </Button>
        <div className="flex-grow flex items-center gap-2">
            <span className="text-xs font-mono">{formatTime(currentTime)}</span>
            <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={handleSeek}
                onValueCommit={handleSeekCommit}
            />
            <span className="text-xs font-mono">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
          <Button size="icon" variant="ghost" onClick={() => handleSkip(-10)}>
            <Rewind className="w-5 h-5" />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="w-20">
                    {playbackRate}x
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1">
                <div className="flex flex-col">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                        <Button 
                            key={rate} 
                            variant={playbackRate === rate ? 'secondary' : 'ghost'}
                            onClick={() => changePlaybackRate(rate)}
                            className="justify-start"
                        >
                           {rate}x {rate === 1 && <span className="text-xs text-muted-foreground ml-2">(Normal)</span>}
                        </Button>
                    ))}
                </div>
            </PopoverContent>
          </Popover>

          <Button size="icon" variant="ghost" onClick={() => handleSkip(10)}>
            <FastForward className="w-5 h-5" />
          </Button>
      </div>
    </div>
  );
}
