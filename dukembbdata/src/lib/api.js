import { config } from '../config/env.js';

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCacheKey = (endpoint, params = {}) => {
  return `${endpoint}_${JSON.stringify(params)}`;
};

const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

const apiClient = async (endpoint, params = {}) => {
  const url = new URL(`${config.apiBase}/${endpoint}`);
  
  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  const headers = {
    'x-apisports-key': config.apiKey,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url.toString(), { headers });
    
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors && data.errors.length > 0) {
      throw new Error(data.errors[0]);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// API functions
export const getLeagues = async () => {
  const cacheKey = getCacheKey('leagues');
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const data = await apiClient('leagues');
  setCachedData(cacheKey, data);
  return data;
};

export const getTeams = async (leagueId, season) => {
  const cacheKey = getCacheKey('teams', { league: leagueId, season });
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const data = await apiClient('teams', { league: leagueId, season });
  setCachedData(cacheKey, data);
  return data;
};

export const searchTeams = async (query, leagueId, season) => {
  const cacheKey = getCacheKey('teams', { search: query, league: leagueId, season });
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const data = await apiClient('teams', { search: query, league: leagueId, season });
  setCachedData(cacheKey, data);
  return data;
};

export const getPlayers = async (teamId, season) => {
  const cacheKey = getCacheKey('players', { team: teamId, season });
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const data = await apiClient('players', { team: teamId, season });
  setCachedData(cacheKey, data);
  return data;
};

export const getPlayerStatistics = async (teamId, season) => {
  const cacheKey = getCacheKey('players/statistics', { team: teamId, season });
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const data = await apiClient('players/statistics', { team: teamId, season });
  setCachedData(cacheKey, data);
  return data;
};

// Helper to check if API is available
export const isApiAvailable = () => {
  return !!(config.apiKey && config.apiBase);
};
