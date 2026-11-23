export interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: 'Low' | 'Medium' | 'High';
}

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
    const priorityStyles = {
        Low: 'bg-green-100 text-green-800 border-green-200',
        Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        High: 'bg-red-100 text-red-800 border-red-200',
    };

    return (
        <li className="flex items-center justify-between bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200">
            <div className="flex items-center justify-between w-full gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} className="w-4 h-4 rounded border-zinc-300 text-orange-600 focus:ring-orange-500 cursor-pointer accent-orange-600"/>
                    <div className="flex flex-col min-w-0">
                        <p className={`text-sm font-medium truncate ${task.completed ? 'line-through text-zinc-400 dark:text-zinc-500' : ''}`}>{task.title}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${priorityStyles[task.priority]}`}>{task.priority}</span>
                    <button onClick={() => onDelete(task.id)} className="text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 p-1.5 rounded-lg transition-colors cursor-pointer" title="Delete Task">✕</button>
                </div>
            </div>
        </li>
    );
}