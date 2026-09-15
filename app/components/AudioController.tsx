"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface AudioControllerProps {
  className?: string;
  compact?: boolean;
}

export default function AudioController({
  className = "",
  compact = false,
}: AudioControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthContextRef = useRef<AudioContext | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const synthOscillatorsRef = useRef<OscillatorNode[]>([]);
  const wasPlayingBeforeHideRef = useRef(false);

  const stopSynth = useCallback(() => {
    try {
      if (synthGainRef.current && synthContextRef.current) {
        synthGainRef.current.gain.setTargetAtTime(
          0.001,
          synthContextRef.current.currentTime,
          0.3
        );
      }
      setTimeout(() => {
        synthOscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Already stopped
          }
        });
        synthOscillatorsRef.current = [];
        if (synthContextRef.current) {
          synthContextRef.current.close().catch(() => {});
          synthContextRef.current = null;
        }
      }, 400);
    } catch {
      // Cleanup failure handled
    }
  }, []);

  const startSynth = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      synthContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(
        volume * 0.15,
        ctx.currentTime + 1.2
      );
      synthGainRef.current = masterGain;

      // Lowpass filter for warm, non-intrusive cinematic warmth
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(480, ctx.currentTime);

      masterGain.connect(filter);
      filter.connect(ctx.destination);

      // Frequencies for an ethereal, futuristic ambient chord (C, G, D, A)
      const freqs = [65.41, 98.0, 146.83, 220.0];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        if (panner) {
          panner.pan.setValueAtTime((idx - 1.5) * 0.4, ctx.currentTime);
          osc.connect(panner);
          panner.connect(masterGain);
        } else {
          osc.connect(masterGain);
        }

        osc.start();
        oscs.push(osc);
      });

      synthOscillatorsRef.current = oscs;
    } catch {
      // AudioContext unavailable
    }
  }, [volume]);

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopSynth();
    setIsPlaying(false);
  }, [stopSynth]);

  const playAudio = useCallback(() => {
    setHasInteracted(true);
    const audio = audioRef.current;

    if (audio && !audioError) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If mp3 play is blocked or fails, use the Web Audio ambient synth
            startSynth();
            setIsPlaying(true);
          });
      }
    } else {
      startSynth();
      setIsPlaying(true);
    }
  }, [audioError, startSynth]);

  // Initialize HTMLAudio element and listeners
  useEffect(() => {
    const audio = new Audio();
    audio.src = "/audio/acm-soundtrack.mp3";
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    audio.addEventListener("error", () => {
      // If primary track fails, try alternative track
      if (audio.src.endsWith("acm-soundtrack.mp3")) {
        audio.src = "/audio/acm-soundtrack-alt.mp3";
      } else {
        setAudioError(true);
      }
    });

    // Handle tab visibility change (pause on background, resume on focus)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlaying) {
          wasPlayingBeforeHideRef.current = true;
          pauseAudio();
        }
      } else {
        if (wasPlayingBeforeHideRef.current) {
          wasPlayingBeforeHideRef.current = false;
          playAudio();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      stopSynth();
    };
  }, [isPlaying, pauseAudio, playAudio, stopSynth, volume]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    if (synthGainRef.current) {
      synthGainRef.current.gain.setTargetAtTime(
        volume * 0.15,
        synthContextRef.current?.currentTime || 0,
        0.1
      );
    }
  }, [volume]);

  const togglePlayback = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] ${className}`}
    >
      <button
        type="button"
        onClick={togglePlayback}
        className={`group relative flex items-center gap-2 rounded-lg border px-2.5 py-1.5 transition-all duration-200 cursor-pointer ${
          isPlaying
            ? "border-cyan-400/60 bg-cyan-950/40 text-cyan-300 shadow-sm shadow-cyan-500/20"
            : "border-slate-800 bg-[#030816]/70 text-slate-400 hover:border-cyan-500/30 hover:text-slate-200"
        }`}
        title={isPlaying ? "Pause cinematic music" : "Play cinematic music"}
        aria-label={isPlaying ? "Pause cinematic music" : "Play cinematic music"}
      >
        {/* Animated Equalizer Waveform Indicator */}
        <div className="flex h-3 items-end gap-0.5" aria-hidden="true">
          <span
            className={`w-0.5 rounded-full bg-cyan-400 transition-all duration-300 ${
              isPlaying ? "h-3 animate-pulse" : "h-1 bg-slate-600"
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-cyan-400 transition-all duration-200 ${
              isPlaying ? "h-2 animate-pulse [animation-delay:150ms]" : "h-1 bg-slate-600"
            }`}
          />
          <span
            className={`w-0.5 rounded-full bg-cyan-400 transition-all duration-300 ${
              isPlaying ? "h-3.5 animate-pulse [animation-delay:300ms]" : "h-1 bg-slate-600"
            }`}
          />
        </div>

        {/* Label */}
        <span className="uppercase tracking-wider font-semibold">
          {compact ? (
            isPlaying ? "MUSIC ON" : "MUSIC"
          ) : (
            isPlaying ? "SOUNDTRACK: ON" : "SOUNDTRACK: OFF"
          )}
        </span>

        {/* Status dot */}
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            isPlaying ? "bg-cyan-400 animate-ping" : "bg-slate-600"
          }`}
        />
      </button>

      {/* Subtle Volume Adjuster */}
      {hasInteracted && !compact && (
        <button
          type="button"
          onClick={() => {
            const nextVol = volume === 0.3 ? 0.6 : volume === 0.6 ? 0.15 : 0.3;
            setVolume(nextVol);
          }}
          className="hidden sm:inline-flex items-center justify-center rounded border border-slate-800 bg-[#030816]/60 px-1.5 py-1 text-[10px] text-slate-500 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors cursor-pointer"
          title={`Volume: ${Math.round(volume * 100)}% (Click to cycle)`}
          aria-label="Cycle music volume"
        >
          {Math.round(volume * 100)}%
        </button>
      )}
    </div>
  );
}
