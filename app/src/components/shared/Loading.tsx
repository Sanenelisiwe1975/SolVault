import { RefreshCw } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

export function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <RefreshCw className="w-8 h-8 text-purple-400 animate-spin mb-4" />
      <p className="text-purple-200">{message}</p>
    </div>
  );
}