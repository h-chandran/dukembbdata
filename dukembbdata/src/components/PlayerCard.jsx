import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { normalizeForRadar, formatPlayerStats } from '../lib/transform.js';

const PlayerCard = ({ player, season, onShare }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const pg = player.perGame;
  const radarData = normalizeForRadar(player);
  
  // Convert to Recharts format
  const chartData = [
    { stat: 'PTS', value: radarData.pts, fullMark: 1 },
    { stat: 'REB', value: radarData.reb, fullMark: 1 },
    { stat: 'AST', value: radarData.ast, fullMark: 1 },
    { stat: 'STL', value: radarData.stl, fullMark: 1 },
    { stat: 'BLK', value: radarData.blk, fullMark: 1 },
  ];

  const handleShare = () => {
    const shareText = formatPlayerStats(player, season);
    navigator.clipboard.writeText(shareText).then(() => {
      onShare?.(`Copied: ${shareText}`);
    }).catch(() => {
      onShare?.('Failed to copy to clipboard');
    });
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div 
      className="bg-gray-800 rounded-2xl p-6 border border-gray-700 card-hover relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Player Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-duke-blue flex items-center justify-center text-white font-bold text-xl">
          {player.photoUrl ? (
            <img 
              src={player.photoUrl} 
              alt={player.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(player.name)
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white truncate">{player.name}</h3>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>#{player.number}</span>
            <span>•</span>
            <span>{player.position}</span>
            {player.height && (
              <>
                <span>•</span>
                <span>{player.height}</span>
              </>
            )}
          </div>
        </div>
        {player.teamLogo && (
          <img 
            src={player.teamLogo} 
            alt="Team logo" 
            className="w-8 h-8 object-contain"
          />
        )}
      </div>

      {/* Key Stats Row */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {[
          { label: 'PTS', value: pg.pts?.toFixed(1) || '0.0' },
          { label: 'REB', value: pg.reb?.toFixed(1) || '0.0' },
          { label: 'AST', value: pg.ast?.toFixed(1) || '0.0' },
          { label: 'STL', value: pg.stl?.toFixed(1) || '0.0' },
          { label: 'BLK', value: pg.blk?.toFixed(1) || '0.0' },
        ].map((stat, index) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-duke-blue">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Percentages */}
      <div className="flex justify-center gap-4 mb-6">
        {[
          { label: 'FG%', value: Math.round(pg.fgPct || 0) },
          { label: '3P%', value: Math.round(pg.tpPct || 0) },
          { label: 'FT%', value: Math.round(pg.ftPct || 0) },
        ].map(stat => (
          <div key={stat.label} className="stat-badge">
            {stat.label} {stat.value}
          </div>
        ))}
      </div>

      {/* Radar Chart */}
      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis 
              dataKey="stat" 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={0} 
              domain={[0, 1]} 
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Stats"
              dataKey="value"
              stroke="#003087"
              fill="#003087"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="w-full duke-gradient text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        📤 Share Stats
      </button>

      {/* Hover Effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-duke-blue/5 rounded-2xl pointer-events-none" />
      )}
    </div>
  );
};

export default PlayerCard;
