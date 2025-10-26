import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NBAAlumniCard({ player, isLarge = false }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
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
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  };

  const flipVariants = {
    front: { 
      rotateY: 0,
      transition: { duration: 0.6, ease: 'easeInOut' }
    },
    back: { 
      rotateY: 180,
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  };

  const formatStats = (stats) => {
    if (!stats) return 'N/A';
    return stats.toLocaleString();
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative h-full cursor-pointer perspective-1000 ${
        isLarge ? 'col-span-2 row-span-2' : ''
      }`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={isFlipped ? "back" : "front"}
        variants={flipVariants}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm shadow-lg">
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={player.image || '/src/assets/placeholder.png'}
                alt={player.full_name}
                className="h-full w-full object-cover opacity-40"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-duke-blue-500/20 px-3 py-1 text-xs font-medium text-duke-blue-200">
                    {player.position}
                  </span>
                  <span className="text-xs text-slate-300">
                    {player.years_at_duke}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  {player.full_name}
                </h3>
                <p className="text-sm text-slate-300">
                  {player.current_nba_team}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${
                    player.active ? 'bg-green-400 animate-pulse' : 'bg-slate-400'
                  }`} />
                  <span className="text-xs text-slate-300">
                    {player.active ? 'Active' : 'Retired'}
                  </span>
                </div>
                <div className="text-xs text-duke-blue-200">
                  Hover for details
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-duke-blue-400/30 bg-gradient-to-br from-duke-blue-900/80 to-slate-900/80 backdrop-blur-sm shadow-lg shadow-duke-blue-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-duke-blue-500/10 to-transparent" />
            
            <div className="relative z-10 flex h-full flex-col justify-between p-4">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  {player.full_name}
                </h3>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-lg bg-white/10 p-2 text-center">
                      <div className="text-slate-300">Championships</div>
                      <div className="text-lg font-bold text-white">
                        {formatStats(player.career_stats?.nba_championships)}
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-2 text-center">
                      <div className="text-slate-300">All-Stars</div>
                      <div className="text-lg font-bold text-white">
                        {formatStats(player.career_stats?.all_star_appearances)}
                      </div>
                    </div>
                  </div>
                </div>

                {player.notable_achievements && player.notable_achievements.length > 0 && (
                  <div className="space-y-1">
                    <div className="text-xs text-slate-300">Achievements</div>
                    <div className="flex flex-wrap gap-1">
                      {player.notable_achievements.slice(0, 3).map((achievement, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-duke-blue-500/20 px-2 py-1 text-xs text-duke-blue-200"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-xs text-duke-blue-200 text-center">
                Duke: {player.years_at_duke}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
