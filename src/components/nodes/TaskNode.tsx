import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { CheckSquare, User, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import type { TaskNodeData } from '../../types/workflow.types';
import { memo } from 'react';
import { NodeCard } from './NodeCard';
import { MetricBadge } from './MetricBadge';

const TaskNode = ({ id, data, selected }: NodeProps<TaskNodeData>) => {
  if (!data) return null;

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-4 h-4 border-[3px] border-white bg-blue-500 hover:scale-125 transition-transform" />
      <NodeCard
        id={id}
        selected={selected}
        headerIcon={<CheckSquare size={16} className="text-blue-600" />}
        headerTitle="Manual Task"
        headerColorClass="bg-blue-50 border-blue-100 text-blue-800"
        metrics={
          <>
            <MetricBadge icon={<CheckCircle2 size={12} />} value="41" colorClass="text-emerald-600 bg-emerald-50" />
            <MetricBadge icon={<AlertCircle size={12} />} value="2" colorClass="text-orange-600 bg-orange-50" />
          </>
        }
      >
        <div>
          <div className="text-base font-bold text-slate-800 mb-1">{data.title || "New Task"}</div>
          {data.description && (
            <div className="text-sm text-slate-500 line-clamp-2 mb-3 leading-relaxed">{data.description}</div>
          )}
          
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <User size={14} className="text-blue-500" />
              <span className="font-medium">{data.assignee || "Unassigned"}</span>
            </div>
            {data.dueDate && (
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Clock size={14} className="text-orange-500" />
                <span className="font-medium">Due: {data.dueDate}</span>
              </div>
            )}
          </div>
        </div>
      </NodeCard>
      <Handle type="source" position={Position.Bottom} className="w-4 h-4 border-[3px] border-white bg-blue-500 hover:scale-125 transition-transform" />
    </>
  );
};

export default memo(TaskNode);
