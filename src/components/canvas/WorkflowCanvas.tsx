import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  Panel,
  useReactFlow,
  ConnectionLineType
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useWorkflowStore } from '../../store/workflowStore';
import StartNode from '../nodes/StartNode';
import TaskNode from '../nodes/TaskNode';
import ApprovalNode from '../nodes/ApprovalNode';
import AutomatedNode from '../nodes/AutomatedNode';
import EndNode from '../nodes/EndNode';
import type { NodeType, WorkflowNode } from '../../types/workflow.types';
import { AlertCircle } from 'lucide-react';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

const generateId = () => `node_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

const FlowRenderer = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNodeId,
    validationErrors
  } = useWorkflowStore();
  
  const reactFlowInstance = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      });

      const defaultData: Record<string, string> = { title: "New Node" };
      if (type === 'task') {
        defaultData.title = "New Task";
        defaultData.description = "";
        defaultData.assignee = "";
        defaultData.dueDate = "";
      } else if (type === 'approval') {
        defaultData.title = "Approval Step";
        defaultData.approverRole = "Manager";
      } else if (type === 'automated') {
        defaultData.title = "Automated Action";
        defaultData.action = "";
      } else if (type === 'end') {
        defaultData.title = "End Process";
        defaultData.message = "Process Complete";
      }

      const newNode: WorkflowNode = {
        id: generateId(),
        type,
        position,
        data: defaultData,
      } as WorkflowNode;

      addNode(newNode);
    },
    [addNode, reactFlowInstance]
  );

  const onSelectionChange = useCallback(({ nodes }: { nodes: import('reactflow').Node[] }) => {
    if (nodes.length === 1) {
      setSelectedNodeId(nodes[0].id);
    } else {
      setSelectedNodeId(null);
    }
  }, [setSelectedNodeId]);

  return (
    <div className="flex-1 h-full w-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onSelectionChange={onSelectionChange}
        onNodeClick={(_, node) => setSelectedNodeId(node?.id || null)}
        onPaneClick={() => setSelectedNodeId(null)}
        defaultEdgeOptions={{ 
          type: 'smoothstep', 
          animated: true,
          style: { strokeWidth: 2, stroke: '#818cf8' } // Indigo-400
        }}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ strokeWidth: 2, stroke: '#818cf8' }}
        fitView
        className="bg-slate-50/50"
      >
        <Background color="#cbd5e1" gap={16} />
        <Controls className="bg-white border-slate-200 shadow-sm rounded-lg" />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.type) {
              case 'start': return '#10b981';
              case 'task': return '#3b82f6';
              case 'approval': return '#a855f7';
              case 'automated': return '#f59e0b';
              case 'end': return '#1e293b';
              default: return '#cbd5e1';
            }
          }}
          className="rounded-lg border border-slate-200 shadow-sm"
        />
        
        {validationErrors.length > 0 && nodes.length > 0 && (
          <Panel position="top-center" className="bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200 shadow-sm flex items-center gap-2 max-w-lg">
            <AlertCircle size={18} className="shrink-0" />
            <div className="text-sm font-medium">
              {validationErrors[0]} {validationErrors.length > 1 && `(+${validationErrors.length - 1} more issues)`}
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export const WorkflowCanvasFixed = () => {
  return (
    <ReactFlowProvider>
      <FlowRenderer />
    </ReactFlowProvider>
  );
};

export default WorkflowCanvasFixed;
