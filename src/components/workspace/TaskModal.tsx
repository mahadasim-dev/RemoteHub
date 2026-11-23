import { useState } from 'react';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (title: string, priority: 'Low' | 'Medium' | 'High') => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
    const [error, setError] = useState<string>('');
    if (!isOpen) return null;
    const handleClose = () => {
        setInputValue('');
        setPriority('Medium');
        setError('');
        onClose();
    }
    const handleSubmit = () => {
        if (!inputValue.trim()) {
            setError('Task title is required.');
            return;
        }
        setError('');
        onAdd(inputValue.trim(), priority);
        setInputValue('');
        setPriority('Medium');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="flex flex-col gap-5 w-full max-w-md p-6 relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl transition-all">                
                <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Create New Task</h2>
                    <button onClick={handleClose} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm font-medium cursor-pointer">✕</button>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Task Title</label>
                        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} placeholder="e.g., Complete project documentation..." className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 text-sm placeholder-zinc-400 rounded-lg p-3 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"/>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Priority</label>
                        <select value={priority} onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')} className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 text-sm rounded-lg p-3 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer">
                            <option value="Low">🟢 Low Priority</option>
                            <option value="Medium">🟡 Medium Priority</option>
                            <option value="High">🔴 High Priority</option>
                        </select>
                    </div>
                </div>
                {error && (
                    <p className="p-2.5 text-xs font-medium text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">{error}</p>
                )}
                <div className="flex justify-end gap-3 mt-2">
                    <button onClick={handleClose} className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer">Cancel</button>
                    <button onClick={handleSubmit} className="bg-brand-btn hover:bg-brand-btn-hover px-4 py-2 text-white text-sm rounded-lg font-medium shadow-sm transition-all active:scale-95 cursor-pointer">Add Task</button>
                </div>
            </div>
        </div>
    );
}