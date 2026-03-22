import { RefreshCw } from 'lucide-react';

interface RetryButtonProps {
  onClick: () => void;
  loading?: boolean;
  label?: string;
  variant?: 'primary' | 'secondary';
}

export function RetryButton({
  onClick,
  loading = false,
  label = 'Try Again',
  variant = 'primary',
}: RetryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
        variant === 'primary'
          ? 'bg-[#1a7a4a] text-white hover:bg-[#1a7a4a]/90 disabled:opacity-50'
          : 'bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:border-[#1a7a4a] disabled:opacity-50'
      }`}
    >
      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
      {label}
    </button>
  );
}
