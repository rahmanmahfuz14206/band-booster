
import React, { useState } from 'react';
import { Copy, Check, Sparkles, Info } from 'lucide-react';

interface ResultCardProps {
  targetVersion: string;
  explanation: string;
  targetBand: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ targetVersion, explanation, targetBand }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(targetVersion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBandColor = (band: number) => {
    if (band >= 8) return 'from-purple-600 to-indigo-700';
    if (band >= 7) return 'from-blue-600 to-indigo-600';
    if (band >= 6) return 'from-teal-600 to-emerald-600';
    return 'from-slate-600 to-slate-700';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-blue-50 overflow-hidden mb-8 transform transition-all hover:shadow-2xl">
      <div className={`bg-gradient-to-r ${getBandColor(targetBand)} px-6 py-4 flex justify-between items-center`}>
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5" />
          <h2 className="font-bold text-lg tracking-tight">Band {targetBand.toFixed(1)} Proficiency Upgrade</h2>
        </div>
        <button 
          onClick={handleCopy}
          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="p-6">
        <p className="text-xl text-slate-800 font-medium leading-relaxed mb-4 italic">
          "{targetVersion}"
        </p>
        <div className="flex gap-3 items-start bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-sm text-slate-600 leading-relaxed">
            <span className="font-bold text-blue-800 uppercase text-[10px] tracking-widest block mb-1">Examiner Note</span>
            {explanation}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
