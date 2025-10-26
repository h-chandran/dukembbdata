import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

export default function TeamGrid({ players }) {
  const [positionFilter, setPositionFilter] = useState('All');

  const positions = useMemo(() => {
    const unique = new Set(players.map((player) => player.position));
    return ['All', ...unique];
  }, [players]);

  const filteredPlayers = useMemo(() => {
    if (positionFilter === 'All') return players;
    return players.filter((player) => player.position === positionFilter);
  }, [positionFilter, players]);

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Filter buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-wrap justify-center gap-3"
      >
        {positions.map((position) => (
          <motion.button
            key={position}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPositionFilter(position)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              positionFilter === position
                ? 'border-duke-blue-300/60 bg-duke-blue-500/20 text-duke-blue-100 shadow-[0_0_20px_rgba(0,83,155,0.3)]'
                : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:text-white'
            }`}
          >
            {position}
          </motion.button>
        ))}
      </motion.div>

      {/* Player grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredPlayers.map((player, index) => (
          <motion.div
            key={`${player.full_name}-${index}`}
            variants={cardVariants}
            whileHover="hover"
            className="group relative"
          >
            <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm shadow-lg transition-all duration-300 group-hover:border-duke-blue-400/30 group-hover:shadow-[0_0_30px_rgba(0,83,155,0.2)]">
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={player.image || '/src/assets/placeholder.png'}
                  alt={player.full_name}
                  className="h-full w-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-between p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-duke-blue-500/20 px-3 py-1 text-xs font-medium text-duke-blue-200">
                      #{player.jersey_number || 'TBD'}
                    </span>
                    <span className="text-xs text-slate-300">
                      {player.position}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-duke-blue-100 transition-colors">
                      {player.full_name}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {player.class_year} • {player.height} • {player.weight}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {player.hometown}
                    </p>
                  </div>

                  <p className="text-sm text-slate-200/80 line-clamp-3">
                    {player.playing_style}
                  </p>
                </div>

                {/* Stats overlay on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-transparent rounded-2xl flex items-end p-4"
                >
                  <div className="w-full space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-lg bg-white/10 p-2">
                        <div className="text-xs text-slate-300">PPG</div>
                        <div className="text-sm font-bold text-white">
                          {player.projected_stats?.ppg || 'TBD'}
                        </div>
                      </div>
                      <div className="rounded-lg bg-white/10 p-2">
                        <div className="text-xs text-slate-300">RPG</div>
                        <div className="text-sm font-bold text-white">
                          {player.projected_stats?.rpg || 'TBD'}
                        </div>
                      </div>
                      <div className="rounded-lg bg-white/10 p-2">
                        <div className="text-xs text-slate-300">APG</div>
                        <div className="text-sm font-bold text-white">
                          {player.projected_stats?.apg || 'TBD'}
                        </div>
                      </div>
                    </div>
                    
                    {player.strengths && player.strengths.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {player.strengths.slice(0, 3).map((strength, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-duke-blue-500/20 px-2 py-1 text-xs text-duke-blue-200"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Default bottom content */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{player.class_year}</span>
                  <span>Hover for stats</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
