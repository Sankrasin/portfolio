import { useEffect, useRef } from 'react';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTime = 4;
  const maxVolume = 0.02; // Down to 2% volume
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const startAudio = () => {
      if (isPlayingRef.current) return;
      
      console.log("Interaction detected! Starting background music with BASS BOOST...");
      
      const audio = new Audio('/portfolio_bgaudio.mp3');
      audio.crossOrigin = "anonymous";
      audio.volume = 0; 
      audioRef.current = audio;

      // --- WEB AUDIO API FOR BASS BOOST ---
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioContext();
        
        // Connect the HTML audio element to the Web Audio API
        const source = audioCtx.createMediaElementSource(audio);
        
        // Create a Lowshelf filter to specifically target and boost bass frequencies
        const bassFilter = audioCtx.createBiquadFilter();
        bassFilter.type = "lowshelf";
        bassFilter.frequency.value = 150; // Target frequencies below 150Hz (deep bass)
        bassFilter.gain.value = 15; // Boost the bass massively (+15 dB)
        
        // Wire it up: Audio -> Bass Filter -> Speakers
        source.connect(bassFilter);
        bassFilter.connect(audioCtx.destination);
        
        // Ensure the context is running
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
      } catch (e) {
        console.warn("Web Audio API not supported, falling back to standard audio", e);
      }
      // ------------------------------------

      const handleTimeUpdate = () => {
        const duration = isNaN(audio.duration) ? 0 : audio.duration;
        const currentTime = audio.currentTime;
        
        if (duration > 0) {
          const timeLeft = duration - currentTime;
          
          if (timeLeft <= fadeTime && timeLeft > 0) {
            audio.volume = Math.max(0, (timeLeft / fadeTime) * maxVolume);
          } else if (currentTime <= fadeTime) {
            audio.volume = Math.min(maxVolume, (currentTime / fadeTime) * maxVolume);
          } else {
            audio.volume = maxVolume;
          }
        }
      };

      const handleEnded = () => {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      audio.play().then(() => {
        console.log("Music started! 🎵");
        isPlayingRef.current = true;
        document.removeEventListener('click', startAudio);
        document.removeEventListener('keydown', startAudio);
      }).catch((e) => {
        console.warn("Browser blocked audio play...", e);
      });
    };

    document.addEventListener('click', startAudio);
    document.addEventListener('keydown', startAudio);

    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('keydown', startAudio);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return null;
}
