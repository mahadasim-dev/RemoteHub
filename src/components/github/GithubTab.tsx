import { useState } from 'react';

export interface GitHubUserData {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

function StatBox({label, value}: {label: string; value: number}) {
  return (
    <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-850">
      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-0.5">{value}</p>
    </div>
  );
}

export const GithubTab: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [profile, setProfile] = useState<GitHubUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function findProfile() {
    if (query.trim() === '') {
      setErrorMessage('Please write a username to see their profile.');
      setProfile(null);
      return;
    } 
    setLoading(true);
    setErrorMessage('');
    setProfile(null);

    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(query.trim())}`);
      if (!response.ok) {
        throw new Error('No profile found for the given username.');
      }

      const data: GitHubUserData = await response.json();
      setProfile(data);
    }
    catch (error: any) {
      console.error('Error fetching data: ', error);
      setErrorMessage(error.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto w-full h-full bg-transparent font-sans">
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Github Profile Scout</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Scout and analyze GitHub profiles directly from the API.</p>
      </div>

      <div className="flex gap-3 w-full mb-6 flex-wrap md:flex-nowrap">
        <input type="text" placeholder="Enter GitHub username..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && findProfile()} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 text-sm placeholder-zinc-400 rounded-xl p-3.5 flex-1 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm transition-all"/>
        <button onClick={findProfile} disabled={loading} className="bg-brand-btn hover:bg-brand-btn-hover text-white font-medium px-6 py-3.5 rounded-xl text-sm shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap">Search Profile</button>
      </div>
      {errorMessage && (
        <p className="p-3 mb-6 text-sm font-medium text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl animate-fade-in">{errorMessage}</p>
      )}      
      {loading && (
        <div className="text-center py-12 border border-zinc-100 dark:border-zinc-800 rounded-xl bg-white/40 dark:bg-zinc-900/40">
          <p className="text-sm text-zinc-400 dark:text-zinc-500 animate-pulse font-medium">Fetching profile data...</p>
        </div>
      )}
      {profile && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-md md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start animate-fade-in">  
          <img src={profile.avatar_url} alt="Scouted Avatar" className="w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-zinc-200 dark:border-zinc-700 object-cover shadow-sm bg-zinc-100"/>
          <div className="flex-1 w-full flex flex-col gap-4">
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{profile.name || 'Anonymous Developer'}</h3>
              <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">@{profile.login}</p>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-850">
              {profile.bio || <span className="italic text-zinc-400">No bio provided by user.</span>}
            </p>
            <div className="grid grid-cols-3 gap-3 text-center my-1">
              <StatBox label="Repositories" value={profile.public_repos}/>
              <StatBox label="Followers" value={profile.followers}/>
              <StatBox label="Following" value={profile.following}/>
            </div>
            <a href={profile.html_url} target="_blank" rel="noreferrer" className="mt-2 text-center bg-brand-btn hover:bg-brand-btn-hover text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all shadow-sm active:scale-95 block cursor-pointer">Click to View GitHub Profile</a>
          </div>
        </div>
      )}
    </div>
  );
}