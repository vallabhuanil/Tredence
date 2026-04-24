import { Sidebar } from '../components/sidebar/Sidebar';
import { WorkflowCanvasFixed } from '../components/canvas/WorkflowCanvas';
import { ConfigPanel } from '../components/panels/ConfigPanel';
import { AnalyticsPanel } from '../components/panels/AnalyticsPanel';
import { SimulationPanel } from '../components/panels/SimulationPanel';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useWorkflowStore } from '../store/workflowStore';

export const Builder = () => {
  const selectedNodeId = useWorkflowStore(state => state.selectedNodeId);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-slate-50 font-sans text-slate-800">
      <Sidebar />
      <div className="flex-1 relative flex">
        <ErrorBoundary>
          <WorkflowCanvasFixed />
        </ErrorBoundary>
        <SimulationPanel />
      </div>
      {selectedNodeId ? <ConfigPanel /> : <AnalyticsPanel />}
    </div>
  );
};
