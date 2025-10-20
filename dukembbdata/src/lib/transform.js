// Transform API data into normalized player stats
export const transformPlayerData = (profiles, statistics) => {
  const statsMap = new Map();
  
  // Create a map of statistics by player ID
  if (statistics?.response) {
    statistics.response.forEach(stat => {
      if (stat.player?.id) {
        statsMap.set(stat.player.id, stat);
      }
    });
  }

  // Transform profiles and merge with statistics
  return profiles?.response?.map(player => {
    const stats = statsMap.get(player.id);
    const games = stats?.games?.played || 0;
    
    return {
      id: player.id.toString(),
      name: player.firstname && player.lastname 
        ? `${player.firstname} ${player.lastname}` 
        : player.name || 'Unknown Player',
      number: player.number?.toString(),
      position: player.position,
      height: player.height,
      weight: player.weight,
      photoUrl: player.photo,
      teamLogo: player.team?.logo,
      perGame: {
        pts: stats?.points?.total ? (stats.points.total / games) : 0,
        reb: stats?.rebounds?.total ? (stats.rebounds.total / games) : 0,
        ast: stats?.assists?.total ? (stats.assists.total / games) : 0,
        stl: stats?.steals?.total ? (stats.steals.total / games) : 0,
        blk: stats?.blocks?.total ? (stats.blocks.total / games) : 0,
        fgPct: stats?.fieldGoals?.percentage ? parseFloat(stats.fieldGoals.percentage) : 0,
        tpPct: stats?.threePointers?.percentage ? parseFloat(stats.threePointers.percentage) : 0,
        ftPct: stats?.freeThrows?.percentage ? parseFloat(stats.freeThrows.percentage) : 0,
        min: stats?.minutes?.total ? (stats.minutes.total / games) : 0,
        plusMinus: stats?.plusMinus?.total ? (stats.plusMinus.total / games) : 0,
      },
      last5: {
        pts: stats?.points?.total ? (stats.points.total / games) : 0, // Simplified for now
        reb: stats?.rebounds?.total ? (stats.rebounds.total / games) : 0,
        ast: stats?.assists?.total ? (stats.assists.total / games) : 0,
      }
    };
  }) || [];
};

// Aggregate team averages
export const aggregateTeamAverages = (players) => {
  if (!players || players.length === 0) {
    return {
      pts: 0,
      reb: 0,
      ast: 0,
      stl: 0,
      blk: 0,
      fgPct: 0,
      tpPct: 0,
      ftPct: 0,
    };
  }

  const totals = players.reduce((acc, player) => {
    const pg = player.perGame;
    return {
      pts: acc.pts + (pg.pts || 0),
      reb: acc.reb + (pg.reb || 0),
      ast: acc.ast + (pg.ast || 0),
      stl: acc.stl + (pg.stl || 0),
      blk: acc.blk + (pg.blk || 0),
      fgPct: acc.fgPct + (pg.fgPct || 0),
      tpPct: acc.tpPct + (pg.tpPct || 0),
      ftPct: acc.ftPct + (pg.ftPct || 0),
    };
  }, { pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, fgPct: 0, tpPct: 0, ftPct: 0 });

  const count = players.length;
  return {
    pts: Math.round((totals.pts / count) * 10) / 10,
    reb: Math.round((totals.reb / count) * 10) / 10,
    ast: Math.round((totals.ast / count) * 10) / 10,
    stl: Math.round((totals.stl / count) * 10) / 10,
    blk: Math.round((totals.blk / count) * 10) / 10,
    fgPct: Math.round((totals.fgPct / count) * 10) / 10,
    tpPct: Math.round((totals.tpPct / count) * 10) / 10,
    ftPct: Math.round((totals.ftPct / count) * 10) / 10,
  };
};

// Normalize data for radar chart (scale 0-1)
export const normalizeForRadar = (player) => {
  const pg = player.perGame;
  
  // Define max values for scaling (adjust based on typical NCAA/NBA ranges)
  const maxValues = {
    pts: 30,
    reb: 15,
    ast: 10,
    stl: 3,
    blk: 3,
  };

  return {
    pts: Math.min((pg.pts || 0) / maxValues.pts, 1),
    reb: Math.min((pg.reb || 0) / maxValues.reb, 1),
    ast: Math.min((pg.ast || 0) / maxValues.ast, 1),
    stl: Math.min((pg.stl || 0) / maxValues.stl, 1),
    blk: Math.min((pg.blk || 0) / maxValues.blk, 1),
  };
};

// Calculate Cameron Hype Index (0-100)
export const calculateHypeIndex = (players) => {
  if (!players || players.length === 0) return 0;
  
  const teamAvg = aggregateTeamAverages(players);
  
  // Weighted formula: PTS (40%), REB (20%), AST (20%), FG% (20%)
  const hypeScore = (
    (teamAvg.pts / 30) * 40 +
    (teamAvg.reb / 15) * 20 +
    (teamAvg.ast / 10) * 20 +
    (teamAvg.fgPct / 100) * 20
  );
  
  return Math.min(Math.round(hypeScore), 100);
};

// Format player stats for sharing
export const formatPlayerStats = (player, season) => {
  const pg = player.perGame;
  const stats = `${pg.pts?.toFixed(1) || 0} PTS | ${pg.reb?.toFixed(1) || 0} REB | ${pg.ast?.toFixed(1) || 0} AST`;
  const percentages = `FG% ${Math.round(pg.fgPct || 0)} • 3P% ${Math.round(pg.tpPct || 0)} • FT% ${Math.round(pg.ftPct || 0)}`;
  
  return `${player.name} — ${stats} • ${percentages} (Season ${season})`;
};
