import { Link as LinkIcon, Calendar } from 'lucide-react';

interface CitationCardProps {
  citation: {
    id: string | number;
    source: string;
    url?: string;
    accessedDate?: string;
    description?: string;
  };
}

export function CitationCard({ citation }: CitationCardProps) {
  return (
    <div className="bg-[#161b22] rounded-lg p-4 border border-[#30363d] hover:border-[#1a7a4a]/50 transition-colors group">
      <div className="flex items-start gap-3">
        <LinkIcon className="w-5 h-5 text-[#e8a045] flex-shrink-0 mt-1" />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white truncate group-hover:text-[#1a7a4a] transition-colors">
            {citation.source}
          </h4>

          {citation.description && (
            <p className="text-[#8b949e] text-sm mt-1 line-clamp-2">
              {citation.description}
            </p>
          )}

          <div className="mt-2 space-y-1">
            {citation.url && (
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#1a7a4a] text-xs hover:text-[#e8a045] transition-colors truncate"
              >
                <LinkIcon className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{new URL(citation.url).hostname}</span>
              </a>
            )}

            {citation.accessedDate && (
              <p className="text-[#8b949e] text-xs flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Accessed: {new Date(citation.accessedDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
