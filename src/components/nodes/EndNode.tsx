import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { CheckCircle2, Flag } from 'lucide-react';
import type { EndData } from '../../types/workflow.types';
import { memo } from 'react';
import { NodeCard } from './NodeCard';
import { MetricBadge } from './MetricBadge';

const EndNode = ({ id, data, selected }: NodeProps<EndData>) => {
  if (!data) return null;

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-4 h-4 border-[3px] border-white bg-slate-800 hover:scale-125 transition-transform" />
      <NodeCard
        id={id}
        selected={selected}
        headerIcon={<Flag size={16} className="text-slate-700" />}
        headerTitle="End Process"
        headerColorClass="bg-slate-100 border-slate-200 text-slate-800"
        metrics={
          <>
            <MetricBadge icon={<CheckCircle2 size={12} />} value="Success Rate: 100%" colorClass="text-emerald-600 bg-emerald-50 border-emerald-100" />
          </>
        }
      >
        <div className="py-2">
          <div className="text-base font-bold text-slate-800 text-center">{data.message || "Workflow Complete"}</div>
        </div>
      </NodeCard>
    </>
  );
};

export default memo(EndNode);
