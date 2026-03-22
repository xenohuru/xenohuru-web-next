import { CitationCard } from '@/components/cards/CitationCard';
import { BookOpen } from 'lucide-react';
import { Citation as APICitation } from '@/lib/types';

interface DisplayCitation {
  id: string | number;
  source: string;
  url?: string;
  accessedDate?: string;
  description?: string;
}

interface CitationsSectionProps {
  citations: APICitation[] | APICitation | string | undefined;
  isLoading?: boolean;
  error?: string;
}

export function CitationsSection({ citations, isLoading, error }: CitationsSectionProps) {
  if (error) {
    return (
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <p className="text-blue-400 text-sm">ℹ️ Citation information unavailable</p>
      </div>
    );
  }

  // Handle string format citations
  if (typeof citations === 'string' && citations.length > 0) {
    return (
      <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d]">
        <h3 className="font-display text-xl font-bold text-white mb-4">
          <BookOpen className="w-5 h-5 inline mr-2" />
          Sources & Citations
        </h3>
        <p className="text-[#8b949e] whitespace-pre-wrap text-sm leading-relaxed">
          {citations}
        </p>
      </div>
    );
  }

  // Handle array format citations - convert API format to display format
  let citationArray: DisplayCitation[] = [];
  
  if (Array.isArray(citations)) {
    citationArray = citations.map(c => ({
      id: c.id,
      source: c.source_name,
      url: c.source_url,
      accessedDate: c.accessed_date,
    }));
  } else if (citations && typeof citations === 'object' && 'id' in citations) {
    // Single citation object
    citationArray = [{
      id: citations.id,
      source: citations.source_name,
      url: citations.source_url,
      accessedDate: citations.accessed_date,
    }];
  }

  if (citationArray.length === 0) {
    return (
      <div className="bg-[#161b22] rounded-lg p-12 border border-[#30363d] text-center">
        <BookOpen className="w-12 h-12 text-[#30363d] mx-auto mb-4" />
        <p className="text-[#8b949e]">No citations available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {citationArray.map((citation) => (
        <CitationCard key={citation.id} citation={citation} />
      ))}
    </div>
  );
}
