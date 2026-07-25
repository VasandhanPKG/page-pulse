import { useMemo, useState } from 'react';
import axios from 'axios';
import { FiCopy, FiDownload, FiMoon, FiSun, FiZap } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL;

const metricCards = [
  { key: 'status', label: 'HTTP Status', formatter: (value) => value },
  { key: 'responseTime', label: 'Response Time', formatter: (value) => value },
  { key: 'title', label: 'Page Title', formatter: (value) => value },
  { key: 'metaDescription', label: 'Meta Description', formatter: (value) => value },
  { key: 'h1Count', label: 'H1 Count', formatter: (value) => value },
  { key: 'missingAltImages', label: 'Missing ALT Images', formatter: (value) => value },
  { key: 'wordCount', label: 'Word Count', formatter: (value) => value },
];

function App() {
  const [url, setUrl] = useState('https://example.com');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [notice, setNotice] = useState('');

  const handleAnalyze = async (event) => {
    event.preventDefault();
    if (!url.trim()) {
      setError('Please enter a website URL.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    setNotice('');

    try {
    const response = await axios.post(
  `${API_URL.replace(/\/$/, "")}/api/audit`,
  { url }
);
      setResult(response.data);
      setNotice('Audit completed successfully.');
    } catch (err) {
      const message = err?.response?.data?.error || 'Unable to process request.';
      setError(message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const copyReport = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setNotice('Report copied to clipboard.');
  };

  const downloadReport = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'page-pulse-report.json';
    link.click();
    URL.revokeObjectURL(link.href);
    setNotice('Report downloaded.');
  };

  const themeClasses = useMemo(() => {
    return darkMode
      ? 'bg-slate-950 text-slate-100'
      : 'bg-slate-50 text-slate-900';
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors ${themeClasses}`}>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between rounded-3xl border border-slate-800/70 bg-white/10 p-4 shadow-2xl shadow-blue-950/20 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600">
              <FiZap className="text-2xl text-white" />
            </div>
            <div>
              <p className="text-xl font-semibold">Page Pulse</p>
              <p className="text-sm text-slate-400">Website audit intelligence</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDarkMode((value) => !value)}
            className="rounded-full border border-slate-700 bg-slate-900/70 p-3 transition hover:-translate-y-0.5"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </header>

        <main className="grid flex-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[32px] border border-slate-800/70 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-8 shadow-2xl shadow-blue-950/30">
            <div className="mb-6 max-w-2xl space-y-3">
              <p className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
                Production-ready web auditing
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Audit any website in seconds.
              </h1>
              <p className="text-lg text-slate-300">
                Understand page quality, content structure, and SEO signals with one streamlined report.
              </p>
            </div>

            <form onSubmit={handleAnalyze} className="space-y-4">
              <label className="block text-sm font-medium text-slate-300" htmlFor="url">
                Website URL
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none ring-0 transition focus:border-cyan-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? 'Analyzing…' : 'Analyze'}
                </button>
              </div>
            </form>

            <div className="mt-6 flex min-h-8 flex-col gap-2">
              {loading && (
                <div className="flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-200">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
                  Fetching and parsing the page…
                </div>
              )}
              {error && (
                <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-300">
                  {error}
                </div>
              )}
              {notice && (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                  {notice}
                </div>
              )}
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-800/70 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Report</p>
                <h2 className="text-2xl font-semibold">Live insights</h2>
              </div>
              {result && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={copyReport}
                    className="rounded-full border border-slate-700 p-2 transition hover:bg-slate-800"
                  >
                    <FiCopy />
                  </button>
                  <button
                    type="button"
                    onClick={downloadReport}
                    className="rounded-full border border-slate-700 p-2 transition hover:bg-slate-800"
                  >
                    <FiDownload />
                  </button>
                </div>
              )}
            </div>

            {!result && !loading && (
              <div className="flex h-[320px] items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-950/40 p-6 text-center text-slate-400">
                Your report will appear here after the first audit.
              </div>
            )}

            {result && (
              <div className="grid gap-3 sm:grid-cols-2">
                {metricCards.map((card) => (
                  <div key={card.key} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">{card.label}</p>
                    <p className="mt-2 break-words text-lg font-semibold text-slate-100">
                      {card.formatter(result[card.key])}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        <footer className="mt-8 flex justify-center py-4 text-sm text-slate-400">
          <a href="https://digitalheroesco.com" className="transition hover:text-cyan-300">
            Built for Digital Heroes Training Task
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
