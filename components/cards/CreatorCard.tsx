import { Github, Linkedin, Twitter } from 'lucide-react';

interface CreatorCardProps {
  creator: {
    id: string | number;
    name: string;
    role: string;
    avatar?: string;
    bio?: string;
    social?: {
      github?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <div className="bg-gradient-to-br from-[#1a7a4a]/20 to-[#e8a045]/10 rounded-lg p-6 border border-[#1a7a4a]/30 text-center">
      {creator.avatar && (
        <img
          src={creator.avatar}
          alt={creator.name}
          className="w-16 h-16 rounded-full mx-auto mb-4 object-cover border-2 border-[#1a7a4a]"
        />
      )}

      <h3 className="font-display text-xl font-bold text-white mb-1">
        {creator.name}
      </h3>
      <p className="text-[#e8a045] text-sm font-medium mb-3">{creator.role}</p>

      {creator.bio && (
        <p className="text-[#8b949e] text-sm mb-4 leading-relaxed">
          {creator.bio}
        </p>
      )}

      {creator.social && (
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#30363d]">
          {creator.social.github && (
            <a
              href={creator.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#161b22] rounded-lg border border-[#30363d] text-[#8b949e] hover:text-[#1a7a4a] hover:border-[#1a7a4a] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {creator.social.twitter && (
            <a
              href={creator.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#161b22] rounded-lg border border-[#30363d] text-[#8b949e] hover:text-blue-400 hover:border-blue-400 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {creator.social.linkedin && (
            <a
              href={creator.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#161b22] rounded-lg border border-[#30363d] text-[#8b949e] hover:text-blue-500 hover:border-blue-500 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
