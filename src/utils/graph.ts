import type { Edge } from 'reactflow';
import type { WorkflowNode } from '../types/workflow.types';

/**
 * Validates the workflow graph for structural issues.
 */
export const validateWorkflowGraph = (nodes: WorkflowNode[], edges: Edge[]) => {
  const errors: string[] = [];
  
  // 1. Check for Exactly One Start Node
  const startNodes = nodes.filter((n) => n.type === 'start');
  if (startNodes.length === 0) {
    errors.push("Workflow must have a Start Node.");
  } else if (startNodes.length > 1) {
    errors.push("Workflow can only have one Start Node.");
  }

  // 2. Check for At Least One End Node
  const endNodes = nodes.filter((n) => n.type === 'end');
  if (endNodes.length === 0) {
    errors.push("Workflow must have at least one End Node.");
  }

  // 3. Check for Disconnected (Orphan) Nodes
  // A node is connected if it has at least one edge where it is the source or target.
  // Exception: if there is only 1 node in total, it's technically disconnected but valid to just be empty.
  if (nodes.length > 1) {
    nodes.forEach((node) => {
      const isConnected = edges.some((edge) => edge.source === node.id || edge.target === node.id);
      if (!isConnected) {
        const title = 'title' in node.data ? node.data.title : '';
        errors.push(`Node "${title || node.type}" is disconnected.`);
      }
    });
  }

  // 4. Check for Cycles
  if (detectCycle(nodes, edges)) {
    errors.push("Workflow contains a cycle (loop). Only Directed Acyclic Graphs are allowed.");
  }

  return errors;
};

/**
 * Detects if the graph contains a cycle using DFS.
 */
export const detectCycle = (nodes: WorkflowNode[], edges: Edge[]): boolean => {
  const adjList = new Map<string, string[]>();
  nodes.forEach(node => adjList.set(node.id, []));
  edges.forEach(edge => {
    if (adjList.has(edge.source)) {
      adjList.get(edge.source)!.push(edge.target);
    }
  });

  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const isCyclic = (nodeId: string): boolean => {
    if (recursionStack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visited.add(nodeId);
    recursionStack.add(nodeId);

    const neighbors = adjList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (isCyclic(neighbor)) return true;
    }

    recursionStack.delete(nodeId);
    return false;
  };

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (isCyclic(node.id)) return true;
    }
  }

  return false;
};

/**
 * Returns a topologically sorted list of nodes for step-by-step execution.
 * Kahn's algorithm for Topological Sorting.
 */
export const getExecutionOrder = (nodes: WorkflowNode[], edges: Edge[]): WorkflowNode[] => {
  if (detectCycle(nodes, edges)) return []; // Cannot sort if there's a cycle.

  const inDegree = new Map<string, number>();
  const adjList = new Map<string, string[]>();

  nodes.forEach(node => {
    inDegree.set(node.id, 0);
    adjList.set(node.id, []);
  });

  edges.forEach(edge => {
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    adjList.get(edge.source)!.push(edge.target);
  });

  const queue: string[] = [];
  inDegree.forEach((count, id) => {
    if (count === 0) queue.push(id);
  });

  const sortedIds: string[] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    sortedIds.push(current);

    const neighbors = adjList.get(current) || [];
    neighbors.forEach(neighbor => {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    });
  }

  // Map sorted IDs back to actual node objects
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  return sortedIds.map(id => nodeMap.get(id)!).filter(Boolean);
};
