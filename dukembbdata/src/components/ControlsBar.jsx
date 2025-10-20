import { useState, useEffect } from 'react';
import { getLeagues, searchTeams } from '../lib/api.js';
import { isApiAvailable } from '../lib/api.js';

const ControlsBar = ({ 
  selectedLeague, 
  selectedSeason, 
  selectedTeam, 
  onLeagueChange, 
  onSeasonChange, 
  onTeamChange,
  onUseDuke 
}) => {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Load leagues on mount
  useEffect(() => {
    if (isApiAvailable()) {
      loadLeagues();
    }
  }, []);

  const loadLeagues = async () => {
    try {
      const response = await getLeagues();
      setLeagues(response.response || []);
    } catch (err) {
      console.warn('Failed to load leagues:', err.message);
    }
  };

  const searchForTeams = async (query, leagueId) => {
    if (!query.trim() || !leagueId) return;

    try {
      setLoading(true);
      const response = await searchTeams(query, leagueId);
      setTeams(response.response || []);
    } catch (err) {
      console.warn('Failed to search teams:', err.message);
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
    onTeamChange({
      id: team.id,
      name: team.name,
      logo: team.logo,
    });
    setSearchQuery('');
    setTeams([]);
  };

  const currentYear = new Date().getFullYear();
  const seasons = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* League Selection */}
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            League
          </label>
          <select
            value={selectedLeague || ''}
            onChange={(e) => onLeagueChange(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-duke-blue focus:border-transparent"
          >
            <option value="">Select League...</option>
            {leagues.map(league => (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            ))}
          </select>
        </div>

        {/* Season Selection */}
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Season
          </label>
          <select
            value={selectedSeason || ''}
            onChange={(e) => onSeasonChange(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-duke-blue focus:border-transparent"
          >
            {seasons.map(year => (
              <option key={year} value={year}>
                {year}-{year + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Team Selection */}
        <div className="flex-1 min-w-0">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Team
          </label>
          <div className="relative">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for team..."
                className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-duke-blue focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading || !searchQuery.trim() || !selectedLeague}
                className="duke-gradient text-white px-4 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
              >
                {loading ? '...' : 'Search'}
              </button>
            </form>

            {/* Team Results Dropdown */}
            {teams.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {teams.map(team => (
                  <button
                    key={team.id}
                    onClick={() => handleTeamSelect(team)}
                    className="w-full p-3 hover:bg-gray-600 text-left transition-colors flex items-center gap-3"
                  >
                    {team.logo && (
                      <img src={team.logo} alt="" className="w-6 h-6 object-contain" />
                    )}
                    <span className="text-white">{team.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Selected Team Display */}
          {selectedTeam && (
            <div className="mt-2 p-3 bg-gray-700 rounded-lg flex items-center gap-3">
              {selectedTeam.logo && (
                <img src={selectedTeam.logo} alt="" className="w-6 h-6 object-contain" />
              )}
              <span className="text-white font-medium">{selectedTeam.name}</span>
              <button
                onClick={() => onTeamChange(null)}
                className="ml-auto text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* Use Duke Button */}
        <div className="flex-shrink-0">
          <button
            onClick={onUseDuke}
            className="duke-gradient text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            🏀 Use Duke
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlsBar;
