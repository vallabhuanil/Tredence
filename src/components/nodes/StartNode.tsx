import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { Play, Activity } from 'lucide-react';
import type { StartNodeData } from '../../types/workflow.types';
import { memo } from 'react';
import { NodeCard } from './NodeCard';
import { MetricBadge } from './MetricBadge';

const StartNode = ({ id, data, selected }: NodeProps<StartNodeData>) => {
  if (!data) return null;

  return (
    <>
      <NodeCard
        id={id}
        selected={selected}
        headerIcon={<Play size={16} className="text-emerald-600" />}
        headerTitle="Start Trigger"
        headerColorClass="bg-emerald-50 border-emerald-100 text-emerald-800"
        metrics={
          <>
            <MetricBadge icon={<Activity size={12} />} value="Active" colorClass="text-emerald-600 bg-emerald-50 border-emerald-100" />
            <MetricBadge icon={null} value="0ms" />
          </>
        }
      >
        <div>
          <div className="text-base font-bold text-slate-800">{data.title || "Workflow Start"}</div>
          <div className="text-sm text-slate-500 mt-1">Initializes the process automation.</div>
        </div>
      </NodeCard>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-4 h-4 border-[3px] border-white bg-emerald-500 hover:scale-125 transition-transform" 
      />
    </>
  );
};

export default memo(StartNode);
