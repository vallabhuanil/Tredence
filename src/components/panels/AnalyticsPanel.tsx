import { Activity, CheckCircle, AlertCircle, Clock, BarChart } from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';

export const AnalyticsPanel = () => {
  const { nodes, edges, validationErrors, isValid } = useWorkflowStore();

  return (
    <div className="w-80 bg-white border-l border-slate-200 h-full flex flex-col shadow-sm z-10 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <BarChart size={18} className="text-indigo-600" />
        <h3 className="font-semibold text-slate-800">Workflow Insights</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* Overall Status */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Health</h4>
          <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm flex items-center gap-3">
            {isValid ? (
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                <CheckCircle size={20} />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                <AlertCircle size={20} />
              </div>
            )}
            <div>
              <div className="text-sm font-bold text-slate-800">{isValid ? 'Ready to Deploy' : 'Configuration Needed'}</div>
              <div className="text-xs text-slate-500 mt-0.5">
                {validationErrors.length} validation error(s)
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Structure</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium">Nodes</span>
              <span className="text-2xl font-bold text-slate-800">{nodes.length}</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium">Edges</span>
              <span className="text-2xl font-bold text-slate-800">{edges.length}</span>
            </div>
          </div>
        </div>

        {/* Mock Analytics Progress */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Historical Performance</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-600 flex items-center gap-1.5"><Activity size={14} className="text-indigo-500"/> Completion Rate</span>
              <span className="text-slate-800">92%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-600 flex items-center gap-1.5"><Clock size={14} className="text-orange-500"/> Avg. Execution Time</span>
              <span className="text-slate-800">1m 24s</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-600 flex items-center gap-1.5"><AlertCircle size={14} className="text-red-500"/> Error Rate</span>
              <span className="text-slate-800">8%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" style={{ width: '8%' }}></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
