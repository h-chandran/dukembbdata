import { useState, useEffect } from 'react';
import { config, isConfigValid } from './config/env.js';
import { usePlayersData } from './hooks/usePlayersData.js';
import ControlsBar from './components/ControlsBar.jsx';
import PlayerStatsCarousel from './components/PlayerStatsCarousel.jsx';
import SummaryBar from './components/SummaryBar.jsx';
import SetupPanel from './components/SetupPanel.jsx';
import EmptyState from './components/EmptyState.jsx';
import Toast from './components/Toast.jsx';

function App() {
  const [selectedLeague, setSelectedLeague] = useState(config.defaultLeagueId?.toString() || '');
  const [selectedSeason, setSelectedSeason] = useState(config.defaultSeason?.toString() || '');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showSetup, setShowSetup] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Load players data
  const {
    players,
    teamAverages,
    hypeIndex,
    topPerformers,
    loading,
    error,
    usingMockData,
  } = usePlayersData(selectedTeam?.id, selectedSeason);

  // Check if we need to show setup panel
  useEffect(() => {
    if (!isConfigValid() && !selectedTeam) {
      setShowSetup(true);
    }
  }, [selectedTeam]);

  // URL state management
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const teamId = params.get('team');
    const season = params.get('season');
    const league = params.get('league');

    if (teamId && season) {
      setSelectedSeason(season);
      setSelectedLeague(league || '');
      // Note: In a real app, you'd fetch team details by ID
    }
  }, []);

  const updateURL = (teamId, season, league) => {
    const params = new URLSearchParams();
    if (teamId) params.set('team', teamId);
    if (season) params.set('season', season);
    if (league) params.set('league', league);
    
    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newURL);
  };

  const handleLeagueChange = (leagueId) => {
    setSelectedLeague(leagueId);
    setSelectedTeam(null);
    updateURL(null, selectedSeason, leagueId);
  };

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
    updateURL(selectedTeam?.id, season, selectedLeague);
  };

  const handleTeamChange = (team) => {
    setSelectedTeam(team);
    updateURL(team?.id, selectedSeason, selectedLeague);
    setShowSetup(false);
  };

  const handleUseDuke = () => {
    if (config.defaultTeamId) {
      setSelectedLeague(config.defaultLeagueId?.toString() || '');
      setSelectedSeason(config.defaultSeason?.toString() || '');
      setSelectedTeam({
        id: config.defaultTeamId,
        name: 'Duke',
        logo: 'https://a.espncdn.com/i/teamlogos/ncaa/500/150.png',
      });
      updateURL(config.defaultTeamId, config.defaultSeason, config.defaultLeagueId);
      setShowSetup(false);
    } else {
      setToastMessage('Duke team ID not configured. Please set VITE_DEFAULT_TEAM_ID in your .env file.');
    }
  };

  const handleShare = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSetup = () => {
    setShowSetup(true);
  };

  // Show setup panel if needed
  if (showSetup) {
    return (
      <div className="min-h-screen bg-gray-900 p-4">
        <SetupPanel onTeamSelected={handleTeamChange} />
      </div>
    );
  }

  // Show empty state if no team selected
  if (!selectedTeam) {
    return (
      <div className="min-h-screen bg-gray-900 p-4">
        <EmptyState onSetup={handleSetup} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🏀</div>
              <div>
                <h1 className="text-3xl font-bold text-white">Duke Basketball Stats Hub</h1>
                <p className="text-gray-400">
                  {selectedTeam.name} • Season {selectedSeason}-{parseInt(selectedSeason) + 1}
                </p>
              </div>
            </div>
            {selectedTeam.logo && (
              <img 
                src={selectedTeam.logo} 
                alt={`${selectedTeam.name} logo`}
                className="w-16 h-16 object-contain"
              />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Controls */}
        <ControlsBar
          selectedLeague={selectedLeague}
          selectedSeason={selectedSeason}
          selectedTeam={selectedTeam}
          onLeagueChange={handleLeagueChange}
          onSeasonChange={handleSeasonChange}
          onTeamChange={handleTeamChange}
          onUseDuke={handleUseDuke}
        />

        {/* Summary Bar */}
        <SummaryBar
          teamAverages={teamAverages}
          hypeIndex={hypeIndex}
          topPerformers={topPerformers}
          usingMockData={usingMockData}
        />

        {/* Player Carousel */}
        <PlayerStatsCarousel
          players={players}
          season={selectedSeason}
          loading={loading}
          onShare={handleShare}
        />

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-400">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}
      </main>

      {/* Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
}

export default App;
