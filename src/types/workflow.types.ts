export type StartNodeData = {
  title: string;
  metadata?: Record<string, string>;
};

export type TaskNodeData = {
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
};

export type ApprovalData = {
  title: string;
  approverRole?: string;
  autoApproveThreshold?: number;
};

export type AutomatedData = {
  title: string;
  action?: string; // from API
  parameters?: Record<string, string>;
};

export type EndData = {
  message: string;
  summaryToggle?: boolean;
};

export type NodeType = "start" | "task" | "approval" | "automated" | "end";

export type WorkflowNodeData = 
  | StartNodeData
  | TaskNodeData
  | ApprovalData
  | AutomatedData
  | EndData;

// For React Flow compatibility, we often need a unified type that can be mapped.
export type WorkflowNode =
  | { id: string; type: "start"; position: { x: number; y: number }; data: StartNodeData }
  | { id: string; type: "task"; position: { x: number; y: number }; data: TaskNodeData }
  | { id: string; type: "approval"; position: { x: number; y: number }; data: ApprovalData }
  | { id: string; type: "automated"; position: { x: number; y: number }; data: AutomatedData }
  | { id: string; type: "end"; position: { x: number; y: number }; data: EndData };
