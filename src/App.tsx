import { useState, useEffect } from 'react';
import { WorkspaceTab } from './components/workspace/WorkspaceTab';
import { GithubTab } from './components/github/GithubTab';
import { CurrencyTab } from './components/currency/CurrencyTab';
import { DictionaryTab } from './components/dictionary/DictionaryTab';

type ActiveTab = 'workspace' | 'github' | 'currency' | 'dictionary';

export default function App() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('workspace');
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem('page_theme');
        return (savedTheme as 'light' | 'dark') || 'dark';
    });
    
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('page_theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme(theme => theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="flex h-screen w-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 overflow-hidden font-sans transition-colors duration-200">
            <aside className="w-64 bg-gray-50 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col justify-between p-5 z-20 transition-colors duration-200">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                                <span className="font-black">●</span> RemoteHub
                            </h2>
                            <p className="text-xs text-zinc-400 mt-0.5">Analyze my Portfolio</p>
                        </div>
                        <button onClick={toggleTheme} className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-brand-teal dark:hover:text-orange-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm border border-zinc-200/40 dark:border-zinc-700/50 flex items-center justify-center w-9 h-9" title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                            {theme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-400 animate-fade-in">
                                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-zinc-700 animate-fade-in">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <nav className="flex flex-col gap-1">
                        <button onClick={() => setActiveTab('workspace')} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                                activeTab === 'workspace' 
                                    ? 'bg-zinc-100 dark:bg-orange-950/30 text-brand-teal dark:text-orange-400 font-semibold' 
                                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                            }`}>
                            Task List Workspace
                        </button>
                        <button onClick={() => setActiveTab('github')} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                                activeTab === 'github' 
                                    ? 'bg-zinc-100 dark:bg-orange-950/30 text-brand-teal dark:text-orange-400 font-semibold' 
                                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                            }`}>
                            Github Profile Scout
                        </button>
                        <button onClick={() => setActiveTab('currency')}className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                                activeTab === 'currency' 
                                    ? 'bg-zinc-100 dark:bg-orange-950/30 text-brand-teal dark:text-orange-400 font-semibold' 
                                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                            }`}>
                            Currency Ledger
                        </button>
                        <button onClick={() => setActiveTab('dictionary')}className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                                activeTab === 'dictionary' 
                                    ? 'bg-zinc-100 dark:bg-orange-950/30 text-brand-teal dark:text-orange-400 font-semibold' 
                                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                            }`}>
                            Dictionary
                        </button>
                    </nav>
                </div>
                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 flex items-center gap-3 transition-colors duration-200">
                    <div className="w-8 h-8 rounded-full bg-brand-teal dark:bg-orange-600 flex items-center justify-center font-bold text-white text-xs shadow-sm">MA</div>
                    <div className="flex flex-col min-w-0">
                        <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">Junior Developer</p>
                        <p className="text-[10px] text-zinc-400 font-medium tracking-wide">Active</p>
                    </div>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-950 p-2 relative transition-colors duration-200">
                {activeTab === 'workspace' && <WorkspaceTab/>}
                {activeTab === 'github' && <GithubTab/>}
                {activeTab === 'currency' && <CurrencyTab/>}
                {activeTab === 'dictionary' && <DictionaryTab/>}
            </main>
        </div>
);
}