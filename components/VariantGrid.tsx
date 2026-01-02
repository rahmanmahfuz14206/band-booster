
import React from 'react';
import { WritingVariant } from '../types';
import { Copy, Check } from 'lucide-react';

interface VariantGridProps {
  variants: WritingVariant[];
}

const VariantItem: React.FC<{ variant: WritingVariant }> = ({ variant }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(variant.sentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 transition-all">
      <div className="flex justify-between items-start mb-3">
        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider">
          {variant.category}
        </span>
        <button 
          onClick={handleCopy}
          className="text-slate-400 hover:text-blue-600 transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <p className="text-slate-800 text-sm font-medium leading-relaxed mb-3">
        {variant.sentence}
      </p>
      <p className="text-xs text-slate-500 italic border-t border-slate-100 pt-3">
        {variant.explanation}
      </p>
    </div>
  );
};

const VariantGrid: React.FC<VariantGridProps> = ({ variants }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
        Structural Varieties
        <span className="text-sm font-normal text-slate-400">(Enhance Cohesion & Range)</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {variants.map((v, idx) => (
          <VariantItem key={idx} variant={v} />
        ))}
      </div>
    </div>
  );
};

export default VariantGrid;
