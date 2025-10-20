import { useState, useEffect, useCallback } from 'react';
import { getPlayers, getPlayerStatistics, isApiAvailable } from '../lib/api.js';
import { transformPlayerData, aggregateTeamAverages, calculateHypeIndex } from '../lib/transform.js';
import { mockPlayers, mockTeamAverages, mockHypeIndex } from '../lib/mock.js';

export const usePlayersData = (teamId, season) => {
  const [players, setPlayers] = useState([]);
  const [teamAverages, setTeamAverages] = useState(mockTeamAverages);
  const [hypeIndex, setHypeIndex] = useState(mockHypeIndex);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  const fetchPlayersData = useCallback(async (teamId, season) => {
    if (!teamId || !season) {
      setPlayers([]);
      setTeamAverages(mockTeamAverages);
      setHypeIndex(mockHypeIndex);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Check if API is available
      if (!isApiAvailable()) {
        throw new Error('API configuration missing');
      }

      // Fetch both players and statistics in parallel
      const [playersResponse, statsResponse] = await Promise.all([
        getPlayers(teamId, season),
        getPlayerStatistics(teamId, season)
      ]);

      // Transform the data
      const transformedPlayers = transformPlayerData(playersResponse, statsResponse);
      
      if (transformedPlayers.length === 0) {
        throw new Error('No player data found');
      }

      setPlayers(transformedPlayers);
      setTeamAverages(aggregateTeamAverages(transformedPlayers));
      setHypeIndex(calculateHypeIndex(transformedPlayers));
      setUsingMockData(false);

    } catch (err) {
      console.warn('API failed, using mock data:', err.message);
      
      // Fallback to mock data
      setPlayers(mockPlayers);
      setTeamAverages(mockTeamAverages);
      setHypeIndex(mockHypeIndex);
      setUsingMockData(true);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data when teamId or season changes
  useEffect(() => {
    fetchPlayersData(teamId, season);
  }, [teamId, season, fetchPlayersData]);

  // Get top performers for summary
  const topPerformers = players
    .sort((a, b) => (b.perGame.pts || 0) - (a.perGame.pts || 0))
    .slice(0, 3);

  return {
    players,
    teamAverages,
    hypeIndex,
    topPerformers,
    loading,
    error,
    usingMockData,
    refetch: () => fetchPlayersData(teamId, season),
  };
};
