import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import NBAAlumniCard from './NBAAlumniCard';

export default function NBAAlumniSection({ alumniData }) {
  const [filter, setFilter] = useState('All');

  const filteredAlumni = useMemo(() => {
    if (filter === 'All') return alumniData;
    if (filter === 'Current NBA') return alumniData.filter(player => player.active);
    if (filter === 'Legends') return alumniData.filter(player => !player.active);
    return alumniData;
  }, [alumniData, filter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="space-y-12"
    >
      {/* Header */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            NBA Brotherhood
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg">
            From Cameron Indoor to the NBA's biggest stages. Duke's alumni continue to shape professional basketball with championship DNA and relentless excellence.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {['All', 'Current NBA', 'Legends'].map((filterOption) => (
            <motion.button
              key={filterOption}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterOption)}
              className={`rounded-full border px-6 py-3 text-sm font-medium transition ${
                filter === filterOption
                  ? 'border-duke-blue-300/60 bg-duke-blue-500/20 text-duke-blue-100 shadow-[0_0_20px_rgba(0,83,155,0.3)]'
                  : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:text-white'
              }`}
            >
              {filterOption}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[200px]"
      >
        {filteredAlumni.map((player, index) => {
          // Create varied card sizes for bento effect
          const isLarge = index === 0 || (index % 7 === 0); // First card and every 7th card is large
          const isWide = index === 2 || (index % 9 === 0); // 3rd card and every 9th card is wide
          
          return (
            <motion.div
              key={player.full_name}
              className={`${isLarge ? 'md:col-span-2 md:row-span-2' : ''} ${isWide ? 'md:col-span-2' : ''}`}
            >
              <NBAAlumniCard player={player} isLarge={isLarge} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Stats summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="text-3xl font-bold text-duke-blue-200 mb-2">
            {alumniData.length}
          </div>
          <div className="text-sm text-slate-300">Total Alumni</div>
        </div>
        
        <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="text-3xl font-bold text-duke-blue-200 mb-2">
            {alumniData.filter(p => p.active).length}
          </div>
          <div className="text-sm text-slate-300">Current NBA Players</div>
        </div>
        
        <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="text-3xl font-bold text-duke-blue-200 mb-2">
            {alumniData.filter(p => p.career_stats?.nba_championships > 0).length}
          </div>
          <div className="text-sm text-slate-300">NBA Champions</div>
        </div>
      </motion.div>
    </motion.section>
  );
}
