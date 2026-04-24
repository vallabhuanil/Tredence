import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { ShieldCheck, Users, Clock, CheckCircle } from 'lucide-react';
import type { ApprovalData } from '../../types/workflow.types';
import { memo } from 'react';
import { NodeCard } from './NodeCard';
import { MetricBadge } from './MetricBadge';

const ApprovalNode = ({ id, data, selected }: NodeProps<ApprovalData>) => {
  if (!data) return null;

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-4 h-4 border-[3px] border-white bg-purple-500 hover:scale-125 transition-transform" />
      <NodeCard
        id={id}
        selected={selected}
        headerIcon={<ShieldCheck size={16} className="text-purple-600" />}
        headerTitle="Approval Step"
        headerColorClass="bg-purple-50 border-purple-100 text-purple-800"
        metrics={
          <>
            <MetricBadge icon={<CheckCircle size={12} />} value="18" colorClass="text-emerald-600 bg-emerald-50" />
            <MetricBadge icon={<Clock size={12} />} value="3h avg" colorClass="text-slate-500 bg-slate-50" />
          </>
        }
      >
        <div>
          <div className="text-base font-bold text-slate-800 mb-3">{data.title || "Pending Approval"}</div>
          
          <div className="flex items-center justify-between text-sm p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center gap-2 text-slate-600">
              <Users size={14} className="text-purple-500" />
              <span className="font-medium">Role</span>
            </div>
            <span className="font-bold text-slate-800">{data.approverRole || "Manager"}</span>
          </div>
        </div>
      </NodeCard>
      <Handle type="source" position={Position.Bottom} className="w-4 h-4 border-[3px] border-white bg-purple-500 hover:scale-125 transition-transform" />
    </>
  );
};

export default memo(ApprovalNode);
