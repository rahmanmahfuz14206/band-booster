
export interface WritingVariant {
  category: string;
  sentence: string;
  explanation: string;
}

export interface EnhancementResult {
  original: string;
  targetVersion: string;
  explanation: string;
  variants: WritingVariant[];
  targetBand: number;
}

export interface UserProfile {
  name: string;
  email: string;
  photo: string;
  targetBand: number;
}

export enum VariantType {
  ACTIVE = 'Active Voice',
  PASSIVE = 'Passive Voice',
  COMPLEX = 'Complex Structure',
  COMPOUND = 'Compound Structure',
  PARAPHRASED = 'Paraphrased (Academic)',
  CONDITIONAL = 'Conditional Structure',
  PAST_PERFECT = 'Past Perfect Tense'
}
