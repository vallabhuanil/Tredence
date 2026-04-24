import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWorkflowStore } from '../../store/workflowStore';
import { X, Trash2 } from 'lucide-react';
import { getAutomations } from '../../api/workflowApi';

const ConfigPanelContent = () => {
  const { nodes, selectedNodeId, updateNodeData, deleteNode, setSelectedNodeId } = useWorkflowStore();
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const [automations, setAutomations] = useState<{id: string, label: string}[]>([]);

  console.log("Selected Node:", selectedNode);

  useEffect(() => {
    if (selectedNode?.type === 'automated') {
      getAutomations().then(setAutomations);
    }
  }, [selectedNode?.type]);

  const { register, handleSubmit, reset, watch } = useForm();

  useEffect(() => {
    if (selectedNode) {
      reset(selectedNode.data);
    }
  }, [selectedNode, reset]);

  if (!selectedNode) {
    return <div className="w-80 bg-white border-l border-slate-200 h-full p-6 flex flex-col items-center justify-center text-slate-400">Select a node</div>;
  }

  const onSubmit = (data: any) => {
    if (selectedNodeId) {
      updateNodeData(selectedNodeId, data);
    }
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (selectedNodeId) {
        updateNodeData(selectedNodeId, value);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, selectedNodeId, updateNodeData]);

  return (
    <div className="w-80 bg-white border-l border-slate-200 h-full flex flex-col shadow-sm z-10">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <h3 className="font-semibold text-slate-800 capitalize">{selectedNode?.type || 'Unknown'} Node Settings</h3>
        <button 
          onClick={() => setSelectedNodeId(null)}
          className="p-1 hover:bg-slate-200 rounded-md text-slate-500 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Title</label>
            <input 
              {...register('title')} 
              defaultValue={selectedNode?.data?.title || "Untitled"}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="e.g. Initial Step"
            />
          </div>

          {selectedNode?.type === 'task' && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Description</label>
                <textarea 
                  {...register('description')} 
                  rows={3}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  placeholder="Task details..."
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Assignee</label>
                <input 
                  {...register('assignee')} 
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="e.g. HR Team"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Due Date</label>
                <input 
                  type="date"
                  {...register('dueDate')} 
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </>
          )}

          {selectedNode?.type === 'approval' && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Approver Role</label>
                <select 
                  {...register('approverRole')} 
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                >
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                  <option value="VP">VP</option>
                  <option value="HR Admin">HR Admin</option>
                </select>
              </div>
            </>
          )}

          {selectedNode?.type === 'automated' && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Action</label>
                <select 
                  {...register('action')} 
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                >
                  <option value="">Select an action</option>
                  {automations.map(a => (
                    <option key={a.id} value={a.id}>{a.label}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {selectedNode?.type === 'end' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Completion Message</label>
              <input 
                {...register('message')} 
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="Workflow finished successfully"
              />
            </div>
          )}
        </form>
      </div>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={() => deleteNode(selectedNode.id)}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
        >
          <Trash2 size={16} />
          Delete Node
        </button>
      </div>
    </div>
  );
};

export const ConfigPanel = () => {
  try {
    return <ConfigPanelContent />;
  } catch (e) {
    console.error(e);
    return <div className="w-80 bg-white border-l border-slate-200 h-full p-6 flex flex-col items-center justify-center text-red-500">Error loading panel</div>;
  }
};

