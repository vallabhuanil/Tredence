import { useSimulation } from '../../hooks/useSimulation';
import { useWorkflowStore } from '../../store/workflowStore';
import { Play, Loader2, X, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export const SimulationPanel = () => {
  const { isValid } = useWorkflowStore();
  const { isSimulating, simulationSteps, runSimulation, clearSimulation } = useSimulation();

  return (
    <div className="absolute bottom-6 right-[340px] left-72 z-20">
      {!simulationSteps.length && !isSimulating ? (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-800 text-sm">Test Workflow</h4>
            <p className="text-xs text-slate-500 mt-0.5">Run a simulation to verify the execution path.</p>
          </div>
          <button
            onClick={runSimulation}
            disabled={!isValid || isSimulating}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              isValid 
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            )}
          >
            {isSimulating ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            {isSimulating ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[400px]">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h4 className="font-semibold text-slate-800 text-sm">Execution Logs</h4>
            </div>
            <button 
              onClick={clearSimulation}
              className="p-1 hover:bg-slate-200 rounded-md text-slate-500 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-1 bg-slate-50/50">
            {isSimulating && simulationSteps.length === 0 ? (
              <div className="flex items-center justify-center p-8 text-slate-400 flex-col gap-3">
                <Loader2 size={24} className="animate-spin" />
                <span className="text-sm">Analyzing graph execution...</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {simulationSteps.map((step, index) => (
                  <div key={index} className="flex gap-3 animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 ring-4 ring-white">
                        {step.step}
                      </div>
                      {index < simulationSteps.length - 1 && (
                        <div className="w-px h-full bg-slate-200 my-1" />
                      )}
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex-1 mb-2">
                      <p className="text-sm text-slate-700">{step.message}</p>
                    </div>
                  </div>
                ))}
                {!isSimulating && (
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mt-2 pl-9 animate-in fade-in duration-500 delay-300">
                    <CheckCircle2 size={16} />
                    Simulation Complete
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
