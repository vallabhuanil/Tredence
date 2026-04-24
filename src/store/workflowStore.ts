import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';
import type {
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from 'reactflow';
import type { WorkflowNode } from '../types/workflow.types';
import { validateWorkflowGraph } from '../utils/graph';

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNodeId: string | null;
  validationErrors: string[];
  isValid: boolean;
  
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: WorkflowNode) => void;
  updateNodeData: (id: string, data: Record<string, unknown>) => void;
  deleteNode: (id: string) => void;
  setSelectedNodeId: (id: string | null) => void;
  validateGraph: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  validationErrors: [],
  isValid: false,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes as unknown as import('reactflow').Node[]) as unknown as WorkflowNode[],
    });
    get().validateGraph();
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
    get().validateGraph();
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
    get().validateGraph();
  },
  setNodes: (nodes: WorkflowNode[]) => {
    set({ nodes });
    get().validateGraph();
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
    get().validateGraph();
  },
  addNode: (node: WorkflowNode) => {
    set({ nodes: [...get().nodes, node] });
    get().validateGraph();
  },
  updateNodeData: (id: string, data: Record<string, unknown>) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...data } } as WorkflowNode;
        }
        return node;
      }),
    });
    get().validateGraph();
  },
  deleteNode: (id: string) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
    });
    get().validateGraph();
  },
  setSelectedNodeId: (id: string | null) => {
    set({ selectedNodeId: id });
  },
  validateGraph: () => {
    const { nodes, edges } = get();
    // Validate only if there are nodes, otherwise clear errors
    if (nodes.length === 0) {
      set({ validationErrors: [], isValid: false });
      return;
    }
    const errors = validateWorkflowGraph(nodes, edges);
    set({ validationErrors: errors, isValid: errors.length === 0 });
  },
}));
