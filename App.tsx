
import React, { useState, KeyboardEvent } from 'react';
import { BookOpen, ChevronRight, Loader2, PenTool, RefreshCcw, LogOut, User, Target, ChevronDown } from 'lucide-react';
import { enhanceWriting } from './services/geminiService';
import { EnhancementResult, UserProfile } from './types';
import ResultCard from './components/ResultCard';
import VariantGrid from './components/VariantGrid';

const BANDS = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EnhancementResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showBandPicker, setShowBandPicker] = useState(false);

  const handleLogin = () => {
    // Simulate Google Login
    setUser({
      name: 'IELTS Student',
      email: 'student@example.com',
      photo: 'https://ui-avatars.com/api/?name=IELTS+Student&background=2563eb&color=fff',
      targetBand: 7.0
    });
  };

  const handleLogout = () => {
    setUser(null);
    setResult(null);
    setInput('');
  };

  const handleEnhance = async () => {
    if (!input.trim() || loading || !user) return;

    setLoading(true);
    setError(null);
    try {
      const data = await enhanceWriting(input, user.targetBand);
      setResult(data);
    } catch (err) {
      setError('Connection timeout. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEnhance();
    }
  };

  const updateTargetBand = (band: number) => {
    if (user) {
      setUser({ ...user, targetBand: band });
      setShowBandPicker(false);
      // Clear results if band changes to encourage fresh learning
      setResult(null);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="serif text-4xl text-slate-900 mb-2">BandBooster</h1>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Personalized writing enhancement tailored to your target band score. Achieve your dreams with achievable AI guidance.
          </p>
          
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-4 bg-white border border-slate-200 py-4 px-6 rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-50 transition-all font-semibold text-slate-700"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
            Sign in with Google
          </button>
          
          <div className="mt-8 pt-8 border-t border-slate-200 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">50k+</p>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Students</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">Band 9</p>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Logic</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-slate-900 hidden sm:block">
                Band<span className="text-blue-600">Booster</span>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setShowBandPicker(!showBandPicker)}
                  className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-bold border border-blue-100 hover:bg-blue-100 transition-colors"
                >
                  <Target className="w-4 h-4" />
                  Target: Band {user.targetBand.toFixed(1)}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showBandPicker ? 'rotate-180' : ''}`} />
                </button>
                
                {showBandPicker && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 grid grid-cols-3 gap-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {BANDS.map(band => (
                      <button
                        key={band}
                        onClick={() => updateTargetBand(band)}
                        className={`py-2 text-sm font-bold rounded-lg transition-colors ${
                          user.targetBand === band 
                          ? 'bg-blue-600 text-white' 
                          : 'hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        {band.toFixed(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="h-8 w-px bg-slate-200 mx-2"></div>

              <div className="group relative">
                <button className="flex items-center gap-3">
                  <img src={user.photo} className="w-8 h-8 rounded-full border border-slate-200" alt="Profile" />
                  <span className="text-sm font-medium text-slate-700 hidden md:block">{user.name}</span>
                </button>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-2 w-48">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <section className="text-center mb-10">
          <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Personalized Learning Path
          </div>
          <h2 className="serif text-4xl text-slate-900 mb-4">
            Master the <span className="text-blue-600 underline decoration-blue-200">Sentence Level</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Get suggestions tailored to <span className="text-slate-900 font-semibold italic">Band {user.targetBand.toFixed(1)}</span>, making them easy to understand and replicate in your exam.
          </p>
        </section>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-2 mb-12 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your sentence here..."
              className="w-full min-h-[140px] p-6 text-xl text-slate-700 bg-transparent focus:outline-none resize-none placeholder:text-slate-300"
              disabled={loading}
            />
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium px-2">
                <PenTool className="w-3 h-3 text-blue-500"/> 
                <span>AI will optimize for Band {user.targetBand.toFixed(1)} criteria</span>
              </div>
              <button
                onClick={handleEnhance}
                disabled={loading || !input.trim()}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  loading || !input.trim() 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                }`}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Enhance Sentence
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {loading && !result && (
          <div className="text-center py-20 animate-pulse">
            <RefreshCcw className="w-10 h-10 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-slate-400 font-medium">Calibrating for Band {user.targetBand.toFixed(1)} accuracy...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-5 rounded-2xl mb-8 text-center font-medium">
            {error}
          </div>
        )}

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
             <ResultCard 
               targetVersion={result.targetVersion} 
               explanation={result.explanation} 
               targetBand={user.targetBand}
             />
             <VariantGrid variants={result.variants} />
             
             <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-white text-center">
                <p className="text-slate-400 text-sm mb-2 uppercase tracking-widest font-bold">Why this level?</p>
                <h3 className="text-2xl font-bold mb-4">Comprehensible Input = Faster Progress</h3>
                <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
                  We've provided grammar and vocabulary that is exactly one step above your current level. This makes it easier to memorize and use naturally compared to overly complex structures.
                </p>
             </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 mt-20 py-12 bg-white text-center">
        <p className="text-slate-400 text-sm mb-4">
          © Creation of <a href="https://www.facebook.com/mahfuz14206" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold transition-colors">Mah Fuz</a>
        </p>
        <div className="flex justify-center gap-6">
          <div className="w-2 h-2 rounded-full bg-teal-400"></div>
          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
