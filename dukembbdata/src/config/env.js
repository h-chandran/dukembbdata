// Environment configuration
export const config = {
  apiBase: import.meta.env.VITE_API_BASKETBALL_BASE || 'https://v3.basketball.api-sports.io',
  apiKey: import.meta.env.VITE_API_BASKETBALL_KEY,
  defaultLeagueId: import.meta.env.VITE_DEFAULT_LEAGUE_ID || 12,
  defaultSeason: import.meta.env.VITE_DEFAULT_SEASON || 2024,
  defaultTeamId: import.meta.env.VITE_DEFAULT_TEAM_ID,
};

export const isConfigValid = () => {
  return !!(config.apiKey && config.defaultTeamId);
};

export const getMissingConfig = () => {
  const missing = [];
  if (!config.apiKey) missing.push('API Key');
  if (!config.defaultTeamId) missing.push('Duke Team ID');
  return missing;
};
