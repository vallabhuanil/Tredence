import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { Zap, Settings2, Database } from 'lucide-react';
import type { AutomatedData } from '../../types/workflow.types';
import { memo } from 'react';
import { NodeCard } from './NodeCard';
import { MetricBadge } from './MetricBadge';

const AutomatedNode = ({ id, data, selected }: NodeProps<AutomatedData>) => {
  if (!data) return null;

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-4 h-4 border-[3px] border-white bg-amber-500 hover:scale-125 transition-transform" />
      <NodeCard
        id={id}
        selected={selected}
        headerIcon={<Zap size={16} className="text-amber-600" />}
        headerTitle="Automation"
        headerColorClass="bg-amber-50 border-amber-100 text-amber-800"
        metrics={
          <>
            <MetricBadge icon={<Database size={12} />} value="255 ms" />
            <MetricBadge icon={<Zap size={12} />} value="99.9%" colorClass="text-emerald-600 bg-emerald-50" />
          </>
        }
      >
        <div>
          <div className="text-base font-bold text-slate-800 mb-2">{data.title || "System Action"}</div>
          
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <Settings2 size={14} className="text-amber-500 shrink-0" />
            <span className="font-mono text-xs font-semibold text-slate-700 truncate" title={data.action}>
              {data.action ? `run(${data.action})` : "await config()"}
            </span>
          </div>
        </div>
      </NodeCard>
      <Handle type="source" position={Position.Bottom} className="w-4 h-4 border-[3px] border-white bg-amber-500 hover:scale-125 transition-transform" />
    </>
  );
};

export default memo(AutomatedNode);
