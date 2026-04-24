import { useState } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { getExecutionOrder } from '../utils/graph';
import { simulateWorkflowApi } from '../api/workflowApi';
import { toast } from 'sonner';

export type SimulationStep = {
  step: number;
  nodeId: string;
  message: string;
};

export const useSimulation = () => {
  const { nodes, edges, isValid } = useWorkflowStore();
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSteps, setSimulationSteps] = useState<SimulationStep[]>([]);

  const runSimulation = async () => {
    if (!isValid) {
      toast.error('Cannot simulate an invalid workflow.');
      return;
    }

    try {
      setIsSimulating(true);
      setSimulationSteps([]);
      
      const orderedNodes = getExecutionOrder(nodes, edges);
      if (orderedNodes.length === 0) {
        toast.error('Execution order could not be determined.');
        return;
      }

      toast.info('Starting workflow simulation...');
      const steps = await simulateWorkflowApi(orderedNodes);
      setSimulationSteps(steps);
      toast.success('Simulation completed successfully!');
    } catch (error) {
      toast.error('Simulation failed.');
      console.error(error);
    } finally {
      setIsSimulating(false);
    }
  };

  const clearSimulation = () => {
    setSimulationSteps([]);
  };

  return {
    isSimulating,
    simulationSteps,
    runSimulation,
    clearSimulation
  };
};
