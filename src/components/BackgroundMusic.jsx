import React, { useEffect, useRef, useState } from 'react';
import './BackgroundMusic.css';

// Pizza Vibe Melody — upbeat, fun, looping
// Notes: freq in Hz, dur in beats, type: 'melody' | 'bass' | 'chord'
const BPM = 120;
const beatMs = (60 / BPM) * 1000;

// Upbeat pizza/Italian-ish melody sequence
const melodyNotes = [
  // Bar 1
  { freq: 392.00, dur: 0.5 },  // G4
  { freq: 440.00, dur: 0.5 },  // A4
  { freq: 493.88, dur: 0.5 },  // B4
  { freq: 523.25, dur: 0.5 },  // C5
  // Bar 2
  { freq: 587.33, dur: 0.75 }, // D5
  { freq: 523.25, dur: 0.25 }, // C5
  { freq: 493.88, dur: 0.5 },  // B4
  { freq: 440.00, dur: 0.5 },  // A4
  // Bar 3
  { freq: 392.00, dur: 0.5 },  // G4
  { freq: 392.00, dur: 0.25 }, // G4
  { freq: 440.00, dur: 0.25 }, // A4
  { freq: 493.88, dur: 0.5 },  // B4
  { freq: 392.00, dur: 0.5 },  // G4
  // Bar 4
  { freq: 329.63, dur: 0.5 },  // E4
  { freq: 369.99, dur: 0.5 },  // F#4
  { freq: 392.00, dur: 1.0 },  // G4 (long hold)
  // Bar 5
  { freq: 523.25, dur: 0.5 },  // C5
  { freq: 493.88, dur: 0.5 },  // B4
  { freq: 440.00, dur: 0.5 },  // A4
  { freq: 392.00, dur: 0.5 },  // G4
  // Bar 6
  { freq: 440.00, dur: 0.5 },  // A4
  { freq: 493.88, dur: 0.5 },  // B4
  { freq: 523.25, dur: 0.5 },  // C5
  { freq: 587.33, dur: 0.5 },  // D5
  // Bar 7
  { freq: 659.25, dur: 0.75 }, // E5
  { freq: 587.33, dur: 0.25 }, // D5
  { freq: 523.25, dur: 0.5 },  // C5
  { freq: 493.88, dur: 0.5 },  // B4
  // Bar 8
  { freq: 523.25, dur: 1.5 },  // C5 (long)
  { freq: 392.00, dur: 0.5 },  // G4
];

const bassLine = [
  { freq: 130.81, dur: 1 }, // C2
  { freq: 146.83, dur: 1 }, // D2
  { freq: 164.81, dur: 1 }, // E2
  { freq: 174.61, dur: 1 }, // F2
  { freq: 196.00, dur: 1 }, // G2
  { freq: 174.61, dur: 1 }, // F2
  { freq: 164.81, dur: 1 }, // E2
  { freq: 130.81, dur: 1 }, // C2
];

const BackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const melodyIdxRef = useRef(0);
  const bassIdxRef = useRef(0);
  const scheduleRef = useRef(null);
  const nextNoteTimeRef = useRef(0);

  const playNote = (ctx, freq, startTime, duration, type = 'melody') => {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();

    osc.type = type === 'bass' ? 'triangle' : 'square';
    osc.frequency.value = freq;

    const durationSec = duration * (beatMs / 1000);
    env.gain.setValueAtTime(0, startTime);
    env.gain.linearRampToValueAtTime(type === 'bass' ? 0.18 : 0.22, startTime + 0.02);
    env.gain.exponentialRampToValueAtTime(type === 'bass' ? 0.08 : 0.1, startTime + durationSec * 0.5);
    env.gain.exponentialRampToValueAtTime(0.001, startTime + durationSec * 0.92);

    osc.connect(env);
    env.connect(masterGainRef.current);
    osc.start(startTime);
    osc.stop(startTime + durationSec);
  };

  const scheduleMelody = (ctx) => {
    const LOOK_AHEAD = 0.1; // seconds ahead
    const SCHEDULE_INTERVAL = 50; // ms

    const tick = () => {
      if (!ctx || ctx.state === 'closed') return;

      while (nextNoteTimeRef.current < ctx.currentTime + LOOK_AHEAD) {
        // Schedule melody note
        const mNote = melodyNotes[melodyIdxRef.current % melodyNotes.length];
        playNote(ctx, mNote.freq, nextNoteTimeRef.current, mNote.dur, 'melody');

        // Schedule bass note (one per bar = 2 beats)
        if (melodyIdxRef.current % 2 === 0) {
          const bNote = bassLine[bassIdxRef.current % bassLine.length];
          playNote(ctx, bNote.freq, nextNoteTimeRef.current, bNote.dur, 'bass');
          bassIdxRef.current++;
        }

        nextNoteTimeRef.current += mNote.dur * (beatMs / 1000);
        melodyIdxRef.current++;
      }

      scheduleRef.current = setTimeout(tick, SCHEDULE_INTERVAL);
    };
    tick();
  };

  const startMusic = (ctx) => {
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 1.5);
    master.connect(ctx.destination);
    masterGainRef.current = master;

    nextNoteTimeRef.current = ctx.currentTime + 0.1;
    melodyIdxRef.current = 0;
    bassIdxRef.current = 0;
    scheduleMelody(ctx);
    setIsPlaying(true);
  };

  useEffect(() => {
    // Start music after a short delay when page loads
    const startDelay = setTimeout(() => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;
        startMusic(ctx);
      } catch (e) {
        console.log('Music autoplay blocked', e);
      }
    }, 800);

    return () => {
      clearTimeout(startDelay);
      if (scheduleRef.current) clearTimeout(scheduleRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const toggleMute = () => {
    if (!masterGainRef.current || !audioCtxRef.current) {
      // Try to start if not yet started (handle autoplay block)
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;
        startMusic(ctx);
        setIsMuted(false);
      } catch (e) {}
      return;
    }

    const ctx = audioCtxRef.current;
    if (isMuted) {
      masterGainRef.current.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 0.3);
      setIsMuted(false);
    } else {
      masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
      setIsMuted(true);
    }
  };

  return (
    <button
      className={`bg-music-btn ${isMuted ? 'bg-music-btn--muted' : 'bg-music-btn--playing'}`}
      onClick={toggleMute}
      aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      title={isMuted ? 'Click to play music 🎵' : 'Click to mute music'}
    >
      <span className="bg-music-icon">
        {isMuted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        )}
      </span>
      <span className="bg-music-label">
        {isMuted ? 'Music Off' : '🍕 Pizza Vibes'}
      </span>
      {!isMuted && (
        <span className="bg-music-bars">
          <span className="bar bar-1"></span>
          <span className="bar bar-2"></span>
          <span className="bar bar-3"></span>
          <span className="bar bar-4"></span>
        </span>
      )}
    </button>
  );
};

export default BackgroundMusic;
