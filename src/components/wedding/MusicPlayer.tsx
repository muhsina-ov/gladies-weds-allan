import { useEffect, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = new Audio("/media/bgm.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const handleCanPlay = () => setIsLoaded(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    const handleStartBgm = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay policy prevented playback, user can tap the button manually
        console.log("Audio autoplay waiting for user interaction:", err);
      }
    };

    window.addEventListener("start-wedding-bgm", handleStartBgm);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      window.removeEventListener("start-wedding-bgm", handleStartBgm);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error("Playback failed:", err);
      }
    }
  };

  return (
    <aside aria-label="Background music" className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={togglePlay}
        className={`group relative flex h-12 w-12 items-center justify-center rounded-full border border-primary/40 bg-background/85 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isPlaying ? "ring-2 ring-primary/50 shadow-primary/20" : ""
        }`}
        title={isPlaying ? "Pause music: Aaj Sajeya" : "Play music: Aaj Sajeya"}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="h-5 w-5 text-primary animate-pulse" />
            <span className="absolute -inset-1.5 animate-ping rounded-full bg-primary/20 opacity-75 pointer-events-none" />
          </div>
        ) : (
          <Music className="h-5 w-5 text-foreground/75 transition-colors group-hover:text-primary" />
        )}
      </button>
    </aside>
  );
}
