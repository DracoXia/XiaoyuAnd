




import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, X, Leaf, Loader2, AlertCircle, ChevronRight, Send, Check, Users, ArrowLeft, Heart, Sparkles, Quote, Sun, CloudRain, Wind, MessageCircleHeart } from 'lucide-react';
import { AppPhase } from './types';
import { TEXT_CONTENT, DEFAULT_AUDIO_URL, TRANSITION_AUDIO_URL, IMMERSION_DURATION, MOOD_OPTIONS, CONTEXT_OPTIONS, AMBIANCE_MODES, FRAGRANCE_LIST } from './constants';
import DynamicBackground from './components/DynamicBackground';
import AudioPlayer from './components/AudioPlayer';
import Ritual from './components/Ritual';
import Dashboard from './components/Dashboard';
import { GeminiService, TreeholeResult } from './components/GeminiService';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.LANDING);
  
  // Transition Control States
  const [showRitualLayer, setShowRitualLayer] = useState(true); // Is Ritual component mounted?
  const [fadeRitual, setFadeRitual] = useState(false); // Should Ritual component fade opacity to 0?

  // Audio State
  const [currentAudioUrl, setCurrentAudioUrl] = useState(DEFAULT_AUDIO_URL);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [volume, setVolume] = useState(1);
  
  // Fragrance & Ambiance State
  // Default to the first owned fragrance
  const [activeFragranceId, setActiveFragranceId] = useState(FRAGRANCE_LIST[0].id);
  const [activeAmbianceId, setActiveAmbianceId] = useState('default');
  
  // Ref to track volume in closures (fixes stale closure bug in timers)
  const volumeRef = useRef(1);

  // AI States
  const [dailySign, setDailySign] = useState<string>("");
  
  // Treehole Multi-step State
  const [treeholeStep, setTreeholeStep] = useState<0 | 1 | 2>(0); 
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [selectedContext, setSelectedContext] = useState<string>("");
  const [userText, setUserText] = useState("");
  
  // New structured result state
  const [aiResult, setAiResult] = useState<TreeholeResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Social Proof State
  const [residentCount, setResidentCount] = useState(0);

  const timerRef = useRef<number | null>(null);

  // Sync ref with state
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // Pre-fetch Sign when entering Ritual
  useEffect(() => {
    if (phase === AppPhase.RITUAL || phase === AppPhase.LANDING) {
        GeminiService.getDailySign().then(setDailySign);
    }
  }, [phase]);

  // Generate random resident count once when entering Treehole
  useEffect(() => {
    if (phase === AppPhase.TREEHOLE && residentCount === 0) {
        setResidentCount(Math.floor(Math.random() * (500 - 120 + 1)) + 120);
    }
  }, [phase]);

  const handleFragranceChange = (id: string) => {
      setActiveFragranceId(id);
      // Optional: Change audio URL based on fragrance if defined
      const frag = FRAGRANCE_LIST.find(f => f.id === id);
      if (frag && frag.audioUrl) {
          setCurrentAudioUrl(frag.audioUrl);
      }
  };

  // --- NEW: Handle Start of Interaction on Ritual Page ---
  // This is the "Prime Audio" trick. We start playing at Volume 0 when user touches screen.
  // This satisfies iOS/Android policy while keeping the experience silent until the right moment.
  const handleRitualInteractionStart = () => {
      if (!isPlaying) {
          setVolume(0); // Ensure silence
          setIsPlaying(true); // Start the stream (Unlock Audio Context)
      }
  };

  const handleRitualComplete = () => {
    // 1. Play transition sound (Effect)
    const transitionAudio = new Audio(TRANSITION_AUDIO_URL);
    transitionAudio.volume = 0.9;
    transitionAudio.play().catch(console.warn);

    // 2. Transition Phase Change
    setPhase(AppPhase.IMMERSION);
    setFadeRitual(true);

    // 3. Start Background Music FADE IN
    // Note: The audio is ALREADY playing (at volume 0) thanks to handleRitualInteractionStart
    // We just need to fade it up now.
    
    let currentVol = 0;
    const fadeInterval = setInterval(() => {
        currentVol += 0.05;
        if (currentVol >= 1) {
            currentVol = 1;
            clearInterval(fadeInterval);
        }
        setVolume(currentVol);
    }, 100);

    // 4. Unmount Ritual layer after transition finishes
    setTimeout(() => {
        setShowRitualLayer(false);
    }, 3000); 

    startImmersionTimer();
  };

  const startImmersionTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        handleSessionEnd();
      }, IMMERSION_DURATION);
  };

  // Called when timer ends naturally
  const handleSessionEnd = () => {
    if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
    }

    // Fade out audio using REF to avoid stale closure (volume was 0 when this function was created 10m ago)
    let currentVol = volumeRef.current;
    
    const fadeInterval = setInterval(() => {
      currentVol -= 0.05;
      if (currentVol <= 0) {
        currentVol = 0;
        clearInterval(fadeInterval);
        setIsPlaying(false);
      }
      setVolume(currentVol);
    }, 100); 
    
    // Delay phase change slightly to allow fade to start perceiving
    setTimeout(() => {
        setPhase(AppPhase.TREEHOLE);
    }, 1500);
  };

  // Called when user manually clicks Heart to record mood
  const handleManualMoodEntry = () => {
      // Clear timer so it doesn't interrupt the user later, 
      // but keep music playing as requested
      if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
      }
      setPhase(AppPhase.TREEHOLE);
      // NOTE: We do NOT stop isPlaying here
  };

  const handleBackToImmersion = () => {
      setPhase(AppPhase.IMMERSION);
      // Optionally restart timer if we want to enforce the 10min rule again,
      // or just let them chill indefinitely. Let's restart to be safe.
      startImmersionTimer();
  };

  const handleMoodSelect = (moodLabel: string) => {
      setSelectedMood(moodLabel);
      setTimeout(() => setTreeholeStep(1), 300);
  };

  const handleContextSelect = (ctx: string) => {
      setSelectedContext(ctx);
      setTimeout(() => setTreeholeStep(2), 300);
  };

  const handleFinalSubmit = async () => {
      setIsGenerating(true);
      const result = await GeminiService.getTreeHoleReply(selectedMood, selectedContext, userText);
      setAiResult(result);
      setIsGenerating(false);
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggling tuner
    setIsPlaying((prev) => !prev);
    if (!isPlaying && volume < 0.1) setVolume(1);
  };

  const handleDashboardScenarioClick = (id: string) => {
    if (id === 'relax') {
        // Reset states for a fresh session
        setVolume(1);
        setIsPlaying(false);
        setTreeholeStep(0);
        setSelectedMood("");
        setSelectedContext("");
        setUserText("");
        setAiResult(null);
        setActiveAmbianceId('default');
        // Reset fragrance to default or keep current? Let's keep current.
        setCurrentAudioUrl(DEFAULT_AUDIO_URL);
        
        // Reset Ritual Transition States
        setShowRitualLayer(true);
        setFadeRitual(false);
        
        // Navigate to Ritual
        setPhase(AppPhase.RITUAL);
    }
  };

  const handleAmbianceChange = (e: React.MouseEvent, modeId: string) => {
      e.stopPropagation();
      const mode = AMBIANCE_MODES.find(m => m.id === modeId);
      if (mode) {
          setActiveAmbianceId(modeId);
          // Only change if different to avoid reload
          if (currentAudioUrl !== mode.audioUrl) {
              setCurrentAudioUrl(mode.audioUrl);
          }
      }
  };

  // Derive current theme from active ambiance
  const currentTheme = AMBIANCE_MODES.find(m => m.id === activeAmbianceId)?.theme || 'warm';

  // --- RENDERERS ---

  const renderImmersion = () => (
    <div 
        className="absolute inset-0 z-30 overflow-y-auto no-scrollbar animate-fade-in flex flex-col font-sans cursor-pointer"
        onClick={() => {}} // Cleaned up toggle
    >
      {isAudioLoading && isPlaying && !audioError && volume > 0 && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/30 backdrop-blur-md pointer-events-none animate-fade-in">
          <Loader2 className="w-8 h-8 text-dopamine-orange animate-spin mb-4" />
          <p className="text-xs font-bold text-ink-light tracking-[0.3em] animate-pulse">调频中...</p>
        </div>
      )}

      {/* Main Poem Area */}
      {/* Revised Padding: pt-32 (enough clearance from top controls/heart) and pb-48 (clearance from bottom ambiance tuner) */}
      <div className="flex-grow flex flex-col justify-center items-center relative p-8 pt-32 pb-48 min-h-[85vh]">
        <div className="max-w-md w-full text-center flex flex-col items-center mix-blend-multiply">
          {(TEXT_CONTENT.immersion as string[]).map((line, idx) => {
            if (line === "") return <div key={idx} className="h-8 md:h-10" />; 
            return (
              <p 
                key={idx}
                className="text-lg md:text-xl font-serif text-ink-gray leading-relaxed tracking-[0.25em] opacity-90 animate-float my-3 drop-shadow-sm" 
                style={{ animationDelay: `${idx * 0.5}s`, animationDuration: '14s' }}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>

      {/* Ambiance Tuner (Moved to Bottom) */}
      <div className="fixed bottom-16 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <div 
            className="bg-white/40 backdrop-blur-xl hover:bg-white/60 transition-all duration-500 p-1.5 rounded-full shadow-sm border border-white/20 flex items-center gap-2 scale-90 md:scale-100 pointer-events-auto"
            onClick={(e) => e.stopPropagation()} 
          >
              {AMBIANCE_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={(e) => handleAmbianceChange(e, mode.id)}
                    className={`
                        w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative group
                        ${activeAmbianceId === mode.id ? 'bg-ink-gray text-white shadow-md' : 'bg-transparent text-ink-gray/40 hover:text-ink-gray hover:bg-white/30'}
                    `}
                  >
                      {mode.icon === 'tea' && <Leaf className="w-5 h-5" strokeWidth={activeAmbianceId === mode.id ? 2 : 1.5} />}
                      {mode.icon === 'rain' && <CloudRain className="w-5 h-5" strokeWidth={activeAmbianceId === mode.id ? 2 : 1.5} />}
                      {mode.icon === 'wind' && <Wind className="w-5 h-5" strokeWidth={activeAmbianceId === mode.id ? 2 : 1.5} />}
                      
                      {/* Tooltip */}
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          {mode.label}
                      </span>
                  </button>
              ))}
          </div>
      </div>

    </div>
  );

  const renderTreehole = () => {
    return (
      <div className="fixed inset-0 z-50 bg-black/5 backdrop-blur-sm flex flex-col items-center justify-center p-0 animate-fade-in font-sans">
          
          {/* Main Card Container - Full Screen/Modal Hybrid */}
          {/* REMOVED: max-w-sm, height restrictions */}
          <div className={`w-full h-full md:h-auto md:max-w-md md:rounded-[3rem] bg-[#F5F5F7]/95 backdrop-blur-2xl transition-all duration-500 overflow-hidden flex flex-col relative ${aiResult ? '' : 'justify-center'}`}>
              
              {/* Soft Color Splash Top - Aesthetic Background */}
              <div className="absolute top-[-100px] right-[-50px] w-64 h-64 bg-dopamine-orange/20 rounded-full blur-[80px] pointer-events-none mix-blend-multiply" />
              <div className="absolute bottom-[-100px] left-[-50px] w-64 h-64 bg-dopamine-blue/20 rounded-full blur-[80px] pointer-events-none mix-blend-multiply" />
              <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-80 h-80 bg-white/40 rounded-full blur-[100px] pointer-events-none" />

              {/* Progress Bar (Only during input phases) */}
              {!aiResult && (
                  <div className="absolute top-12 left-0 right-0 flex justify-center space-x-2 z-10">
                      {[0, 1, 2].map(step => (
                          <div key={step} className={`h-1 rounded-full transition-all duration-500 ease-spring ${treeholeStep >= step ? 'w-8 bg-dopamine-orange' : 'w-2 bg-gray-300/50'}`} />
                      ))}
                  </div>
              )}

              {/* Content Area */}
              <div className={`flex-1 flex flex-col relative z-20 overflow-y-auto no-scrollbar ${aiResult ? 'pt-10 px-6 pb-32' : 'px-8 pb-8 justify-center'}`}>
                  
                  {/* Step 0: Mood Selection */}
                  {treeholeStep === 0 && (
                      <div className="animate-fade-in flex flex-col items-center">
                          {/* Back Button specifically for Manual Entry from Immersion */}
                          {isPlaying && (
                            <button onClick={handleBackToImmersion} className="absolute top-10 left-6 p-2 text-ink-light hover:text-ink-gray transition-colors bg-white/50 rounded-full shadow-sm">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                          )}

                          <h3 className="text-center font-bold text-ink-gray text-3xl mb-3 mt-10">此刻心情</h3>
                          <p className="text-center text-ink-light text-sm mb-12 font-medium bg-white/60 px-5 py-2 rounded-full backdrop-blur-sm shadow-sm border border-white/40">把心事交给小屿，没关系的</p>
                          
                          <div className="grid grid-cols-2 gap-5 w-full">
                              {MOOD_OPTIONS.map((mood) => (
                                  <button
                                      key={mood.id}
                                      onClick={() => handleMoodSelect(mood.label)}
                                      className={`
                                        group relative p-6 rounded-[2rem] flex flex-col items-center justify-center space-y-3 transition-all duration-300 transform active:scale-95 border
                                        ${selectedMood === mood.label ? mood.style + ' shadow-xl scale-[1.02] border-white' : 'bg-white/70 text-gray-400 border-white/40 hover:bg-white hover:shadow-lg hover:shadow-gray-100/50'}
                                      `}
                                  >
                                      <span className="text-5xl transition-transform duration-300 group-hover:-translate-y-2 drop-shadow-sm filter grayscale-[0.2] group-hover:grayscale-0">{mood.icon}</span>
                                      <span className="text-base font-bold tracking-wide">{mood.label}</span>
                                  </button>
                              ))}
                          </div>
                      </div>
                  )}

                  {/* Step 1: Context Selection */}
                  {treeholeStep === 1 && (
                      <div className="animate-fade-in flex flex-col items-center">
                           <button onClick={() => setTreeholeStep(0)} className="absolute top-10 left-6 p-2 text-ink-light hover:text-ink-gray transition-colors bg-white/50 rounded-full shadow-sm">
                                <ArrowLeft className="w-5 h-5" />
                           </button>

                           <h3 className="text-center font-bold text-ink-gray text-3xl mb-3 mt-10">因为什么呢？</h3>
                           <p className="text-center text-ink-light text-sm mb-10 font-medium">找到源头，才能更好的抱抱你</p>
                           
                           {/* Social Proof Badge */}
                           <div className="flex items-center space-x-2 mb-10 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm border border-white/60">
                                <div className="flex -space-x-1.5">
                                    {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white" />)}
                                </div>
                                <span className="text-xs font-bold text-ink-light">
                                    {Math.floor(residentCount / 3)} 人此刻与你共鸣
                                </span>
                           </div>

                           <div className="flex flex-wrap justify-center gap-3 w-full">
                               {CONTEXT_OPTIONS.map((ctx) => (
                                   <button
                                       key={ctx}
                                       onClick={() => handleContextSelect(ctx)}
                                       className={`px-6 py-4 rounded-2xl text-sm font-bold border transition-all duration-300 hover:-translate-y-1 active:scale-95 ${selectedContext === ctx ? 'bg-ink-gray text-white border-ink-gray shadow-xl shadow-gray-200' : 'border-white/50 text-ink-light bg-white/70 hover:bg-white hover:shadow-md'}`}
                                   >
                                       {ctx}
                                   </button>
                               ))}
                           </div>
                      </div>
                  )}

                  {/* Step 2: Text Input & Result */}
                  {treeholeStep === 2 && (
                      <div className="animate-fade-in h-full flex flex-col">
                          {aiResult ? (
                               <div className="flex flex-col items-center w-full space-y-6 animate-fade-in">
                                    
                                    {/* 1. Letter Card (Warm, Paper-like) */}
                                    <div className="w-full bg-[#FFF9F0] p-8 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(255,160,0,0.15)] relative border border-[#F2E8D5] flex flex-col gap-4">
                                        <div className="flex items-center gap-3 mb-2 opacity-80">
                                            <div className="w-8 h-8 rounded-full bg-dopamine-orange/20 flex items-center justify-center text-dopamine-orange">
                                                <MessageCircleHeart className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-ink-gray text-sm tracking-wide">小屿的回信</span>
                                        </div>
                                        
                                        <p className="font-serif text-ink-gray text-[17px] leading-8 text-justify opacity-90">
                                            {aiResult.reply}
                                        </p>

                                        {/* Decorative Stamp/Signature */}
                                        <div className="self-end mt-2 flex items-center gap-2 opacity-60">
                                            <span className="font-serif text-xs italic text-ink-light">Yours, Xiaoyu</span>
                                            <Leaf className="w-4 h-4 text-dopamine-green" />
                                        </div>
                                    </div>
                                    
                                    {/* 2. Echo Card (Modern, Glassy, Realistic) */}
                                    <div className="w-full relative pl-4 mt-2">
                                        {/* Vertical line connector */}
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-dopamine-blue/30 to-transparent"></div>
                                        
                                        <div className="bg-white/60 backdrop-blur-md border border-white/60 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4 text-dopamine-blue" />
                                                    <h4 className="font-bold text-ink-gray text-sm">远方的回响</h4>
                                                </div>
                                                <span className="text-[10px] font-bold text-dopamine-blue bg-dopamine-blue/10 px-2 py-1 rounded-md">
                                                    @{aiResult.nickname}
                                                </span>
                                            </div>
                                            
                                            <p className="text-sm text-ink-gray leading-7 text-justify font-normal opacity-80">
                                                "{aiResult.story}"
                                            </p>

                                            {/* Reaction Bar (Mock) */}
                                            <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100/50">
                                                <div className="flex items-center gap-1 opacity-40 text-xs font-bold">
                                                    <Heart className="w-3 h-3" /> 124
                                                </div>
                                                <div className="flex items-center gap-1 opacity-40 text-xs font-bold">
                                                    <span className="text-[10px]">🫂</span> 抱抱
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-8"></div> {/* Spacer */}
                                    
                                    {/* Action Button */}
                                    <button 
                                        onClick={() => setPhase(AppPhase.DASHBOARD)}
                                        className="w-full bg-ink-gray text-white py-4 rounded-[1.5rem] font-bold text-lg flex items-center justify-center space-x-2 hover:bg-black transition-all shadow-xl shadow-gray-200 hover:scale-[1.02] active:scale-95 group"
                                    >
                                        <span>带着能量出发</span>
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                               </div>
                          ) : (
                              <div className="flex flex-col items-center justify-center min-h-[50vh]">
                                  <button onClick={() => setTreeholeStep(1)} className="absolute top-10 left-6 p-2 text-ink-light hover:text-ink-gray transition-colors bg-white/50 rounded-full shadow-sm">
                                        <ArrowLeft className="w-5 h-5" />
                                  </button>
                                  
                                  {/* FIXED: Overlapping UI. Changed to flex-wrap with gap. */}
                                  <div className="flex flex-wrap items-center justify-center gap-3 mb-8 mt-10 w-full max-w-[80%]">
                                      <span className="text-xs font-bold bg-white text-ink-gray px-4 py-1.5 rounded-full border border-gray-100 shadow-sm whitespace-nowrap">{selectedMood}</span>
                                      <span className="text-xs text-gray-300">+</span>
                                      <span className="text-xs font-bold bg-white text-ink-gray px-4 py-1.5 rounded-full border border-gray-100 shadow-sm whitespace-nowrap">{selectedContext}</span>
                                  </div>
                                  
                                  <h3 className="text-center font-bold text-ink-gray text-2xl mb-3">还有想说的吗？</h3>
                                  <p className="text-center text-xs text-ink-light mb-8">（悄悄告诉小屿，风会带走烦恼）</p>
                                  
                                  <div className="w-full relative">
                                      <textarea
                                        value={userText}
                                        onChange={(e) => setUserText(e.target.value)}
                                        placeholder="可以不写哦，小屿懂你的..."
                                        className="w-full bg-white border-0 focus:ring-2 focus:ring-dopamine-orange/20 rounded-[2rem] p-8 text-ink-gray focus:outline-none text-center resize-none h-48 placeholder:text-ink-light/30 placeholder:font-medium transition-all shadow-sm text-lg leading-relaxed"
                                      />
                                      {/* Character count or decoration could go here */}
                                  </div>

                                  <div className="flex justify-center mt-10">
                                      <button 
                                        onClick={handleFinalSubmit}
                                        disabled={isGenerating}
                                        className="w-20 h-20 rounded-full bg-ink-gray text-white flex items-center justify-center hover:shadow-xl hover:shadow-gray-300 transition-all disabled:opacity-80 shadow-lg hover:scale-110 active:scale-90 group"
                                      >
                                          {isGenerating ? <Loader2 className="w-8 h-8 animate-spin" /> : <Send className="w-8 h-8 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                      </button>
                                  </div>
                              </div>
                          )}
                      </div>
                  )}
              </div>
          </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden select-none bg-[#F5F5F7]">
        
      {/* Dynamic Background is now ALWAYS visible and light (z-10) */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-1000 opacity-100`}>
        <DynamicBackground theme={currentTheme} />
      </div>

      <AudioPlayer 
        url={currentAudioUrl} 
        // Allow playing in RITUAL phase if explicitly triggered (for preloading)
        isPlaying={isPlaying && (phase === AppPhase.RITUAL || phase === AppPhase.IMMERSION || phase === AppPhase.TREEHOLE || phase === AppPhase.LANDING)} 
        volume={volume} 
        onLoadingStatusChange={setIsAudioLoading}
        onError={() => setAudioError(true)}
      />

      {/* Early Exit Button (Left Top) - CHANGED to Heart for Mood Entry */}
      {phase === AppPhase.IMMERSION && (
         <div className="absolute top-10 left-10 z-50 opacity-40 hover:opacity-100 transition-opacity duration-1000">
            <button onClick={handleManualMoodEntry} className="p-3 bg-white/40 backdrop-blur-md rounded-full hover:bg-white transition-colors group">
                <Heart strokeWidth={2} className="w-5 h-5 text-ink-gray group-hover:text-dopamine-pink group-hover:fill-dopamine-pink transition-colors" />
            </button>
        </div>
      )}

      {/* Control Overlay (Right Top) */}
      {phase === AppPhase.IMMERSION && (
         <div className="absolute top-10 right-10 z-50 opacity-40 hover:opacity-100 transition-opacity duration-1000">
            <button onClick={toggleAudio} className="p-3 bg-white/40 backdrop-blur-md rounded-full hover:bg-white transition-colors">
            {isPlaying ? (
                <Volume2 strokeWidth={2} className="w-5 h-5 text-ink-gray" />
            ) : (
                <VolumeX strokeWidth={2} className="w-5 h-5 text-ink-gray" />
            )}
            </button>
        </div>
      )}

      {/* 
          Main Content Switcher 
      */}

      {/* 
          LAYER 1: IMMERSION (The Destination)
          Rendered when phase is IMMERSION.
          Sits at z-30.
          Initially hidden by Ritual Layer (z-50).
      */}
      {phase === AppPhase.IMMERSION && renderImmersion()}

      {/* 
          LAYER 2: RITUAL (The Entry & Transition Overlay)
          Rendered if phase is LANDING/RITUAL OR if showRitualLayer is true (during transition).
          Sits at z-50 (on top).
          Fades out using CSS opacity when fadeRitual is true.
      */}
      {showRitualLayer && (
          <div className={`absolute inset-0 z-50 transition-opacity duration-[3000ms] ease-in-out ${fadeRitual ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <Ritual 
                onComplete={handleRitualComplete} 
                onInteractionStart={handleRitualInteractionStart}
                activeFragranceId={activeFragranceId}
                onFragranceChange={handleFragranceChange}
              />
          </div>
      )}

      {/* Other Phases */}
      {phase === AppPhase.TREEHOLE && renderTreehole()}
      {phase === AppPhase.DASHBOARD && <Dashboard onScenarioClick={handleDashboardScenarioClick} />}
    </div>
  );
};

export default App;