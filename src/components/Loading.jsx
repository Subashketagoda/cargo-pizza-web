import React, { useEffect, useState, useRef } from 'react';
import './Loading.css';
import logo from '../assets/logo.png';

const loadingStages = [
  { text: "Firing Up Woodfire Stone Oven... 🔥", tag: "STONE OVEN HEAT" },
  { text: "Handcrafting Organic Dough & Toppings... 🍕", tag: "FRESH DOUGH" },
  { text: "Baking Fresh Pizza in 400°C Heat... 🧀", tag: "WOODFIRE BAKING" },
  { text: "Piping Hot & Ready To Serve! ✨", tag: "SERVED HOT" }
];

const Loading = ({ onLoadingComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(loadingStages[0]);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  // ── Ultra-Realistic 5-Layer Woodfire Sound Engine ──
  const startFireSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master output gain — gradual 1.2s fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.82, ctx.currentTime + 1.2);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Shared Pink Noise Buffer (3 seconds)
      const sampleRate = ctx.sampleRate;
      const bufferSize = sampleRate * 3;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const nd = noiseBuffer.getChannelData(0);
      let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
      for (let i = 0; i < bufferSize; i++) {
        const w = Math.random() * 2 - 1;
        b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759;
        b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856;
        b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980;
        nd[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.1;
        b6=w*0.115926;
      }

      // LAYER 1: Deep Low Rumble with LFO Breathing (wood base roar)
      const rumbleSrc = ctx.createBufferSource();
      rumbleSrc.buffer = noiseBuffer; rumbleSrc.loop = true;
      const rumbleLPF = ctx.createBiquadFilter();
      rumbleLPF.type = 'lowpass'; rumbleLPF.frequency.value = 110; rumbleLPF.Q.value = 0.7;
      const rumbleGain = ctx.createGain(); rumbleGain.gain.value = 0.55;
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.5;
      const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.2;
      lfo.connect(lfoGain); lfoGain.connect(rumbleGain.gain); lfo.start();
      rumbleSrc.connect(rumbleLPF); rumbleLPF.connect(rumbleGain); rumbleGain.connect(masterGain);
      rumbleSrc.start();

      // LAYER 2: Mid Flame Hiss (main fire body) — animated filter sweep
      const hissSrc = ctx.createBufferSource();
      hissSrc.buffer = noiseBuffer; hissSrc.loop = true;
      const hissBPF = ctx.createBiquadFilter();
      hissBPF.type = 'bandpass'; hissBPF.frequency.value = 750; hissBPF.Q.value = 1.4;
      hissBPF.frequency.linearRampToValueAtTime(1300, ctx.currentTime + 5);
      hissBPF.frequency.linearRampToValueAtTime(650, ctx.currentTime + 10);
      const hissGain = ctx.createGain(); hissGain.gain.value = 0.30;
      hissSrc.connect(hissBPF); hissBPF.connect(hissGain); hissGain.connect(masterGain);
      hissSrc.start();

      // LAYER 3: High Crackle + Ember Sizzle
      const crackleSrc = ctx.createBufferSource();
      crackleSrc.buffer = noiseBuffer; crackleSrc.loop = true;
      const crackleHPF = ctx.createBiquadFilter();
      crackleHPF.type = 'highpass'; crackleHPF.frequency.value = 4000;
      const crackleGain = ctx.createGain(); crackleGain.gain.value = 0.13;
      crackleSrc.connect(crackleHPF); crackleHPF.connect(crackleGain); crackleGain.connect(masterGain);
      crackleSrc.start();

      // LAYER 4: Random Wood Pop Crackles (recursive ADSR impulses)
      const scheduleWoodPop = () => {
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;
        const nextMs = 28 + Math.random() * 190;
        if (Math.random() > 0.14) {
          const pGain = ctx.createGain();
          const atk = 0.002 + Math.random() * 0.006;
          const dec = 0.022 + Math.random() * 0.13;
          const peak = 0.08 + Math.random() * 0.44;
          pGain.gain.setValueAtTime(0, now);
          pGain.gain.linearRampToValueAtTime(peak, now + atk);
          pGain.gain.exponentialRampToValueAtTime(0.0001, now + atk + dec);
          const pFilter = ctx.createBiquadFilter();
          pFilter.type = 'peaking';
          pFilter.frequency.value = 700 + Math.random() * 4800;
          pFilter.gain.value = 12 + Math.random() * 14;
          pFilter.Q.value = 0.5 + Math.random() * 2.8;
          const pSrc = ctx.createBufferSource();
          pSrc.buffer = noiseBuffer;
          pSrc.connect(pFilter); pFilter.connect(pGain); pGain.connect(masterGain);
          pSrc.start(now); pSrc.stop(now + atk + dec + 0.01);
        }
        setTimeout(scheduleWoodPop, nextMs);
      };
      scheduleWoodPop();

      // LAYER 5: Occasional Flame Whoosh Flare-Ups
      const scheduleWhoosh = () => {
        if (!ctx || ctx.state === 'closed') return;
        const delay = 1100 + Math.random() * 3400;
        setTimeout(() => {
          if (!ctx || ctx.state === 'closed') return;
          const now = ctx.currentTime;
          const wGain = ctx.createGain();
          wGain.gain.setValueAtTime(0, now);
          wGain.gain.linearRampToValueAtTime(0.13 + Math.random() * 0.16, now + 0.32);
          wGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
          const wFilter = ctx.createBiquadFilter();
          wFilter.type = 'bandpass'; wFilter.frequency.value = 320 + Math.random() * 720; wFilter.Q.value = 0.4;
          const wSrc = ctx.createBufferSource();
          wSrc.buffer = noiseBuffer;
          wSrc.connect(wFilter); wFilter.connect(wGain); wGain.connect(masterGain);
          wSrc.start(now); wSrc.stop(now + 1.4);
          scheduleWhoosh();
        }, delay);
      };
      scheduleWhoosh();

    } catch (e) {
      console.log("Audio play error", e);
    }
  };

  const stopFireSound = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
        setTimeout(() => {
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
          }
        }, 600);
      } catch (e) {}
    }
  };

  // Start Baking Button Click Handler
  const handleStartBake = () => {
    setHasStarted(true);
    startFireSound();
  };

  // 10-Second Progress Timer (triggers only after user clicks Start)
  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 1;
        if (next < 25) setCurrentStage(loadingStages[0]);
        else if (next < 50) setCurrentStage(loadingStages[1]);
        else if (next < 85) setCurrentStage(loadingStages[2]);
        else setCurrentStage(loadingStages[3]);
        return next;
      });
    }, 100);

    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
      stopFireSound();
    }, 10000);

    const removeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 10500);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
      stopFireSound();
    };
  }, [hasStarted, onLoadingComplete]);

  return (
    <div className={`yellow-fire-loader ${isFadingOut ? 'yellow-fire-loader--exit' : ''}`}>
      <div className="fire-spark spark-1">🔥</div>
      <div className="fire-spark spark-2">✨</div>
      <div className="fire-spark spark-3">🔥</div>
      <div className="fire-spark spark-4">✨</div>
      <div className="fire-spark spark-5">🔥</div>
      <div className="yellow-loader__ambient-glow"></div>

      {!hasStarted ? (
        <div className="yellow-loader__content start-bake-screen">
          <div className="yellow-loader__logo-container">
            <div className="yellow-loader__logo-glow"></div>
            <img src={logo} alt="Cargo Pizza" className="yellow-loader__logo" />
          </div>
          <div className="yellow-loader__brand-meta">
            <span className="yellow-loader__title">CARGO PIZZA</span>
            <span className="yellow-loader__subtitle">SRI JAYAWARDENEPURA KOTTE</span>
          </div>
          <button className="start-bake-btn" onClick={handleStartBake}>
            🔥 START TO BAKE 🍕
          </button>
          <p className="start-bake-hint">Tap to ignite woodfire oven & enter</p>
        </div>
      ) : (
        <div className="yellow-loader__content baking-progress-screen">
          <div className="yellow-loader__stage-pill">
            <span className="stage-pill-txt">{currentStage.tag}</span>
          </div>
          <div className="yellow-loader__logo-container">
            <div className="yellow-loader__logo-glow"></div>
            <img src={logo} alt="Cargo Pizza" className="yellow-loader__logo" />
          </div>
          <p className="yellow-loader__stage-msg">{currentStage.text}</p>
          <div className="yellow-loader__brand-meta">
            <span className="yellow-loader__title">CARGO PIZZA</span>
            <span className="yellow-loader__subtitle">SRI JAYAWARDENEPURA KOTTE</span>
          </div>
          <div className="yellow-loader__progress-section">
            <div className="yellow-loader__progress-track">
              <div className="yellow-loader__progress-fill" style={{ width: `${progress}%` }}>
                <div className="progress-flame-head">🔥</div>
              </div>
            </div>
            <div className="yellow-loader__counter-row">
              <span>WOODFIRE BAKING IN PROGRESS</span>
              <span className="counter-val">{progress}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loading;
