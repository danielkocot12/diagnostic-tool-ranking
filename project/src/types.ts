export interface DiagnosticCheck {
  category: string;
  name: string;
  description: string;
  tools: string[];
}

export interface RankedCheck extends DiagnosticCheck {
  rank: number;
}

export interface Category {
  name: string;
  checks: DiagnosticCheck[];
}