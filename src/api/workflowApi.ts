import type { WorkflowNode } from '../types/workflow.types';

export const getAutomations = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: "send_email", label: "Send Email", params: ["to", "subject"] },
    { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
    { id: "slack_notify", label: "Slack Notification", params: ["channel", "message"] }
  ];
};

export const simulateWorkflowApi = async (orderedNodes: WorkflowNode[]) => {
  // Mock API that supposedly processes the simulation
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return orderedNodes.map((node, index) => {
    let message = `Executed ${node.type} node`;
    
    switch (node.type) {
      case 'start':
        message = `Started workflow: ${node.data.title}`;
        break;
      case 'task':
        message = `Task assigned to ${node.data.assignee || 'Unassigned'}: ${node.data.title}`;
        break;
      case 'approval':
        message = `Pending approval from ${node.data.approverRole || 'Manager'}`;
        break;
      case 'automated':
        message = `System Action: ${node.data.action || 'Unknown Action'} executed`;
        break;
      case 'end':
        message = `Workflow completed: ${node.data.message || 'Done'}`;
        break;
    }
    
    return {
      step: index + 1,
      nodeId: node.id,
      message
    };
  });
};
