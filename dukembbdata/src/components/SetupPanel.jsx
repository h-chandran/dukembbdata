import { useState } from 'react';
import { getLeagues, searchTeams } from '../lib/api.js';
import { isApiAvailable } from '../lib/api.js';

const SetupPanel = ({ onTeamSelected }) => {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadLeagues = async () => {
    if (!isApiAvailable()) {
      setError('API key not configured. Please add VITE_API_BASKETBALL_KEY to your .env file.');
      return;
    }

    try {
      setLoading(true);
      const response = await getLeagues();
      setLeagues(response.response || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchForTeams = async (query, leagueId) => {
    if (!query.trim() || !leagueId) return;

    try {
      setLoading(true);
      const response = await searchTeams(query, leagueId);
      setTeams(response.response || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedLeague && searchQuery.trim()) {
      searchForTeams(searchQuery, selectedLeague);
    }
  };

  const handleTeamSelect = (team) => {
    onTeamSelected({
      teamId: team.id,
      teamName: team.name,
      leagueId: selectedLeague,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-2xl border border-gray-700">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          🏀 Duke Basketball Stats Hub
        </h1>
        <p className="text-gray-300 text-lg">
          Configure your API settings to get started
        </p>
      </div>

      {!isApiAvailable() && (
        <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
          <h3 className="text-yellow-400 font-semibold mb-2">⚠️ API Configuration Required</h3>
          <p className="text-yellow-200 text-sm mb-3">
            To use real data, you need to configure your API key:
          </p>
          <ol className="text-yellow-200 text-sm space-y-1 ml-4">
            <li>1. Get an API key from <a href="https://www.api-basketball.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">API-Basketball</a></li>
            <li>2. Create a <code className="bg-gray-700 px-1 rounded">.env</code> file in your project root</li>
            <li>3. Add: <code className="bg-gray-700 px-1 rounded">VITE_API_BASKETBALL_KEY=your_key_here</code></li>
            <li>4. Restart the development server</li>
          </ol>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Step 1: Select League</h3>
          <button
            onClick={loadLeagues}
            disabled={loading}
            className="duke-gradient text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load Leagues'}
          </button>
          
          {leagues.length > 0 && (
            <div className="mt-4">
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <option value="">Select a league...</option>
                {leagues.map(league => (
                  <option key={league.id} value={league.id}>
                    {league.name} {league.type && `(${league.type})`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {selectedLeague && (
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Step 2: Find Duke</h3>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Duke..."
                className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={loading || !searchQuery.trim()}
                className="duke-gradient text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>

            {teams.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-gray-300 text-sm">Found teams:</p>
                {teams.map(team => (
                  <button
                    key={team.id}
                    onClick={() => handleTeamSelect(team)}
                    className="w-full p-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {team.logo && (
                        <img src={team.logo} alt="" className="w-8 h-8 object-contain" />
                      )}
                      <div>
                        <div className="font-medium text-white">{team.name}</div>
                        <div className="text-sm text-gray-400">
                          {team.code} • Founded: {team.founded}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold mb-2">💡 Quick Start</h4>
          <p className="text-blue-200 text-sm">
            For NCAA basketball, try searching for "Duke" in the NCAA league. 
            The app will remember your selection and use it as the default.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetupPanel;
