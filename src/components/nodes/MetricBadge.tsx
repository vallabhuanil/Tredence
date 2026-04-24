import { memo } from 'react';
import clsx from 'clsx';

interface MetricBadgeProps {
  icon: React.ReactNode;
  value: string | number;
  colorClass?: string;
}

export const MetricBadge = memo(({ icon, value, colorClass = "text-slate-500 bg-slate-50" }: MetricBadgeProps) => {
  return (
    <div className={clsx("flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium border border-slate-100", colorClass)}>
      {icon}
      <span>{value}</span>
    </div>
  );
});

MetricBadge.displayName = 'MetricBadge';
