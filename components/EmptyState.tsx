import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
  variant?: 'default' | 'compact';
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = 'default',
}: EmptyStateProps) {
  const isCompact = variant === 'compact';

  return (
    <div className={`bg-[#161b22] rounded-lg border border-[#30363d] ${isCompact ? 'p-8' : 'p-16'} text-center`}>
      <div className={`flex justify-center mb-${isCompact ? 3 : 4}`}>
        <Icon className={`w-${isCompact ? 8 : 12} h-${isCompact ? 8 : 12} text-[#30363d]`} />
      </div>
      
      <h3 className={`font-display font-bold text-white mb-2 ${isCompact ? 'text-lg' : 'text-2xl'}`}>
        {title}
      </h3>
      
      {description && (
        <p className={`text-[#8b949e] ${isCompact ? 'text-sm' : 'text-base'} mb-4`}>
          {description}
        </p>
      )}
      
      {action && (
        <a
          href={action.href}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a7a4a]/20 border border-[#1a7a4a]/30 text-[#1a7a4a] rounded-lg hover:bg-[#1a7a4a]/30 transition-colors font-medium text-sm"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
