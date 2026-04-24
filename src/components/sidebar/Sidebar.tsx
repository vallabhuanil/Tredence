import { Play, CheckSquare, ShieldCheck, Zap, CheckCircle2, LayoutDashboard, GitMerge, BarChart3, Puzzle } from 'lucide-react';
import type { NodeType } from '../../types/workflow.types';
import clsx from 'clsx';

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={18} />, active: false },
  { label: 'Workflows', icon: <GitMerge size={18} />, active: true },
  { label: 'Analytics', icon: <BarChart3 size={18} />, active: false },
  { label: 'Integrations', icon: <Puzzle size={18} />, active: false },
];

const nodeTypes: { type: NodeType; label: string; icon: React.ReactNode; colorClass: string; textColor: string }[] = [
  { type: 'start', label: 'Start Trigger', icon: <Play size={16} />, colorClass: 'bg-emerald-50 border-emerald-200 hover:border-emerald-400', textColor: 'text-emerald-700' },
  { type: 'task', label: 'Manual Task', icon: <CheckSquare size={16} />, colorClass: 'bg-blue-50 border-blue-200 hover:border-blue-400', textColor: 'text-blue-700' },
  { type: 'approval', label: 'Approval Step', icon: <ShieldCheck size={16} />, colorClass: 'bg-purple-50 border-purple-200 hover:border-purple-400', textColor: 'text-purple-700' },
  { type: 'automated', label: 'Automation', icon: <Zap size={16} />, colorClass: 'bg-amber-50 border-amber-200 hover:border-amber-400', textColor: 'text-amber-700' },
  { type: 'end', label: 'End Process', icon: <CheckCircle2 size={16} />, colorClass: 'bg-slate-100 border-slate-300 hover:border-slate-500', textColor: 'text-slate-700' },
];

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full shadow-xl z-10 text-slate-300">
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-md ring-1 ring-white/20">
          T
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">Tredences</h1>
      </div>

      <nav className="p-4 border-b border-slate-800">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <div 
              key={item.label}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 text-sm font-medium",
                item.active 
                  ? "bg-indigo-500/10 text-indigo-400" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </nav>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Node Library</h2>
          <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded-full">{nodeTypes.length}</span>
        </div>
        
        <div className="flex flex-col gap-3">
          {nodeTypes.map((node) => (
            <div
              key={node.type}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-xl border-2 cursor-grab active:cursor-grabbing transition-all hover:scale-[1.02] shadow-sm",
                node.colorClass
              )}
              onDragStart={(event) => onDragStart(event, node.type)}
              draggable
            >
              <div className="p-1.5 bg-white rounded-lg shadow-sm">
                <div className={node.textColor}>{node.icon}</div>
              </div>
              <span className={clsx("font-semibold text-sm", node.textColor)}>{node.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="bg-slate-800 rounded-lg p-3 border border-slate-700/50">
          <p className="text-xs text-slate-400 text-center leading-relaxed">
            Drag nodes to the canvas to build your workflow graph.
          </p>
        </div>
      </div>
    </aside>
  );
};
