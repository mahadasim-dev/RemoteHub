import { useState, useEffect } from 'react';
import { TaskItem } from './TaskItem';
import type { Task } from './TaskItem';
import { TaskModal } from './TaskModal';

export const WorkspaceTab: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const localData = localStorage.getItem('_tasks');
        return localData ? JSON.parse(localData) : [];
    });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        localStorage.setItem('_tasks', JSON.stringify(tasks));
    }, [tasks]);
    const handleAddTask = (title: string, priority: 'Low' | 'Medium' | 'High') => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            completed: false,
            priority
        };
        setTasks([...tasks, newTask]);
    };
    const handleToggleTask = (id: string): void => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };
    const handleDeleteTask = (id: string): void => {
        setTasks(tasks.filter(t => t.id !== id));
    };
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;

    return (
        <div className="p-6 max-w-4xl mx-auto w-full h-full bg-transparent">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Task Board</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Track and manage everyday tasks and milestones.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-brand-btn hover:bg-brand-btn-hover text-white font-medium px-4 py-2 rounded-lg text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer">
                    <span>+</span> New Task
                </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">All Tasks</p>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">{totalTasks}</p>
                </div>
                <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Completed Tasks</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{totalTasks > 0 ? `${completedTasks} / ${totalTasks}` : '0'}</p>
                </div>
            </div>
            {totalTasks === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-white/50 dark:bg-zinc-900/50">
                    <p className="text-sm text-zinc-400 dark:text-zinc-500 italic">No tasks added. Click "New Task" to add one.</p>
                </div>
            ) : (
                <ul className="flex flex-col gap-2.5">
                    {tasks.map(t => (
                        <TaskItem key={t.id} task={t} onToggle={handleToggleTask} onDelete={handleDeleteTask}/>
                    ))}
                </ul>
            )}
            <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddTask}/>
        </div>
    );
}