import { useState } from 'react';

interface Definition {
  definition: string;
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface ApiResponse {
  word: string;
  meanings: Meaning[];
}

export const DictionaryTab: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const [meanings, setMeanings] = useState<Meaning[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  async function searchWord() {
    const cleanQuery = query.trim();
    if (cleanQuery === '') {
      setError('Please type a word to look up its meaning(s).');
      setMeanings([]);
      return;
    }
    setLoading(true);
    setError('');
    setMeanings([]);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanQuery.toLowerCase())}`);
      if (!response.ok) {
        throw new Error(`The word "${cleanQuery}" was not found.`);
      }
      const data: ApiResponse[] = await response.json();   
      if (data && data.length > 0) {
        setMeanings(data[0].meanings);
        setWord(data[0].word);
      }
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Something went wrong. (Note: The API used for this interface is unstable. If you are connected to the Internet, Please click "Search" several times to get the result.)');
    } finally {
      setLoading(false);
    }
  }
  const Examples: string[] = [];
  meanings.forEach(meaning => {
    meaning.definitions.forEach(def => {
      if (def.example) {
        Examples.push(def.example);
      }
    });
  });

  return (
    <div className="p-6 max-w-4xl mx-auto w-full h-full bg-transparent font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">English Dictionary</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Look up definitions and usage examples for any English word.</p>
      </div>
      <div className="flex gap-3 w-full mb-6 flex-wrap md:flex-nowrap">
        <input type="text" placeholder="Search any word" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchWord()} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 text-sm placeholder-zinc-400 rounded-xl p-3.5 flex-1 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm transition-all"/>
        <button onClick={searchWord} disabled={loading} className="bg-brand-btn hover:bg-brand-btn-hover disabled:bg-zinc-300 dark:disabled:bg-zinc-800 text-white font-medium px-6 py-3.5 rounded-xl text-sm shadow-sm transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap">{loading ? 'Searching...' : 'Search'}</button>
      </div>
      {error && (
        <p className="p-3 mb-6 text-sm font-medium text-red-700 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl animate-fade-in">{error}</p>
      )}
      {loading && (
        <div className="text-center py-12 border border-zinc-100 dark:border-zinc-800 rounded-xl bg-white/40 dark:bg-zinc-900/40">
          <p className="text-sm text-zinc-400 dark:text-zinc-500 animate-pulse font-medium">Fetching word details...</p>
        </div>
      )}
      {meanings.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-md md:p-8 flex flex-col gap-6 animate-fade-in">  
          <div>
            <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1 rounded-md border border-orange-100 dark:border-orange-900/30">Word</span>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 capitalize mt-3 tracking-tight">{word}</h2>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Meanings</h3> 
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
              {meanings.map((meaning, mIndex) => (
                <div key={mIndex} className="bg-zinc-50 dark:bg-zinc-950/40 p-4 rounded-xl border border-zinc-100 dark:border-zinc-850 flex flex-col gap-2">
                  <span className="text-[9px] font-semibold px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md self-start uppercase tracking-wide">{meaning.partOfSpeech}</span> 
                  <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">  {meaning.definitions[0]?.definition || 'Definition not available'}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-zinc-100 dark:border-zinc-800 pt-4">
            <h3 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Usage Examples</h3>    
            {Examples.length > 0 ? (
              <ul className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-1">
                {Examples.map((ex, index) => (
                  <li key={index} className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50/30 dark:bg-zinc-950/20 p-3 rounded-xl border border-zinc-100 dark:border-zinc-850 flex items-start gap-2.5">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="italic leading-relaxed">"{ex}"</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950/30 rounded-xl text-center border border-dashed border-zinc-200 dark:border-zinc-800">
                <p className="text-xs text-zinc-400 dark:text-zinc-500 italic">There are no examples for this word.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}