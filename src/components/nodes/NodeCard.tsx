import { memo } from 'react';
import clsx from 'clsx';
import { useWorkflowStore } from '../../store/workflowStore';

interface NodeCardProps {
  id: string;
  selected: boolean;
  headerIcon: React.ReactNode;
  headerTitle: string;
  headerColorClass: string;
  children: React.ReactNode;
  metrics?: React.ReactNode;
}

export const NodeCard = memo(({ 
  id, 
  selected, 
  headerIcon, 
  headerTitle, 
  headerColorClass, 
  children,
  metrics 
}: NodeCardProps) => {
  const validationErrors = useWorkflowStore(state => state.validationErrors);
  const isDisconnected = validationErrors.some(err => err.includes(id) && err.includes('disconnected'));

  return (
    <div className={clsx(
      "w-72 bg-white rounded-xl shadow-md border-2 transition-all duration-200",
      selected ? "border-primary ring-4 ring-primary/10 scale-[1.02]" : "border-slate-200 hover:border-slate-300 hover:shadow-lg",
      isDisconnected && "border-red-500 bg-red-50"
    )}>
      <div className={clsx("px-4 py-3 border-b rounded-t-[10px] flex items-center gap-2", headerColorClass)}>
        <div className="p-1.5 bg-white/60 rounded-md shadow-sm">
          {headerIcon}
        </div>
        <div className="font-semibold text-sm tracking-wide">{headerTitle}</div>
      </div>
      
      <div className="p-4 flex flex-col gap-3">
        {children}
      </div>

      {metrics && (
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 rounded-b-[10px] flex items-center gap-2">
          {metrics}
        </div>
      )}
    </div>
  );
});

NodeCard.displayName = 'NodeCard';
