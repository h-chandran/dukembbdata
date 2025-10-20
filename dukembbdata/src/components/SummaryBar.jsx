import { motion } from 'framer-motion';

const SummaryBar = ({ teamAverages, hypeIndex, topPerformers, usingMockData }) => {
  const getHypeColor = (index) => {
    if (index >= 80) return 'from-cameron-hype-5 to-cameron-hype-4';
    if (index >= 60) return 'from-cameron-hype-4 to-cameron-hype-3';
    if (index >= 40) return 'from-cameron-hype-3 to-cameron-hype-2';
    if (index >= 20) return 'from-cameron-hype-2 to-cameron-hype-1';
    return 'from-gray-600 to-gray-500';
  };

  const getHypeLabel = (index) => {
    if (index >= 80) return 'Cameron Crazies Level!';
    if (index >= 60) return 'Blue Devil Energy!';
    if (index >= 40) return 'Building Momentum';
    if (index >= 20) return 'Getting Started';
    return 'Needs More Hype';
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Averages */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Team Averages</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Points', value: teamAverages.pts, icon: '🏀' },
              { label: 'Rebounds', value: teamAverages.reb, icon: '📊' },
              { label: 'Assists', value: teamAverages.ast, icon: '🎯' },
              { label: 'Steals', value: teamAverages.stl, icon: '⚡' },
              { label: 'Blocks', value: teamAverages.blk, icon: '🛡️' },
              { label: 'FG%', value: teamAverages.fgPct, icon: '🎯' },
            ].map(stat => (
              <div key={stat.label} className="bg-gray-700 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-duke-blue">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cameron Hype Index */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Cameron Hype Index</h3>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Hype Level</span>
              <span className="text-2xl font-bold text-duke-blue">{hypeIndex}</span>
            </div>
            
            <div className="relative mb-3">
              <div className="h-3 bg-gray-600 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${getHypeColor(hypeIndex)} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${hypeIndex}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-sm font-medium ${
                hypeIndex >= 60 ? 'text-cameron-hype-4' : 
                hypeIndex >= 40 ? 'text-cameron-hype-3' : 
                'text-gray-400'
              }`}>
                {getHypeLabel(hypeIndex)}
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Top Scorers</h3>
          <div className="space-y-3">
            {topPerformers.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700 rounded-lg p-3 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-duke-blue flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white truncate">{player.name}</div>
                  <div className="text-sm text-gray-400">
                    #{player.number} • {player.position}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-duke-blue">
                    {player.perGame.pts?.toFixed(1) || '0.0'}
                  </div>
                  <div className="text-xs text-gray-400">PPG</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mock Data Notice */}
      {usingMockData && (
        <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/50 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-400 text-sm">
            <span>⚠️</span>
            <span>Showing mock data. Configure API key for real statistics.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryBar;
