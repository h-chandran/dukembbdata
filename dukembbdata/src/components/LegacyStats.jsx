import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Custom hook for animated counter
function useAnimatedCounter(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (end - start) + start));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration, start]);

  return { count, ref };
}

function AnimatedCounter({ end, duration = 2000, start = 0, suffix = '', prefix = '' }) {
  const { count, ref } = useAnimatedCounter(end, duration, start);
  
  return (
    <span ref={ref} className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

function StatCard({ title, children, delay = 0, isHighlight = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        ease: 'easeOut', 
        delay: delay 
      }}
      className={`relative overflow-hidden rounded-3xl border p-8 text-center ${
        isHighlight 
          ? 'border-duke-blue-400/40 bg-gradient-to-br from-duke-blue-500/20 via-slate-900/80 to-slate-900 shadow-[0_0_40px_rgba(0,83,155,0.3)]' 
          : 'border-white/10 bg-white/5 backdrop-blur-sm'
      }`}
    >
      {isHighlight && (
        <div className="absolute inset-0 bg-gradient-to-r from-duke-blue-500/10 via-transparent to-duke-blue-500/10 animate-pulse" />
      )}
      <div className="relative z-10">
        <h3 className="text-sm font-medium text-slate-300 mb-4 uppercase tracking-wider">
          {title}
        </h3>
        {children}
      </div>
    </motion.div>
  );
}

export default function LegacyStats({ legacyData }) {
  const { national_championships, nba_pipeline, all_time_records } = legacyData;

  return (
    <div className="space-y-16">
      {/* Championship Banners */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center space-y-8"
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Championship Legacy
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Five national championships spanning three decades of excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {national_championships.titles.map((title, index) => (
            <motion.div
              key={title.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.6, 
                ease: 'easeOut', 
                delay: index * 0.1 
              }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-duke-blue-400/30 bg-gradient-to-br from-duke-blue-500/20 to-slate-900/80 p-6 shadow-lg hover:shadow-[0_0_30px_rgba(0,83,155,0.4)] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-duke-blue-500/10 to-transparent" />
                <div className="relative z-10 space-y-3">
                  <div className="text-2xl font-bold text-duke-blue-200">
                    {title.year}
                  </div>
                  <div className="text-sm text-slate-300">
                    vs {title.opponent}
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {title.final_score}
                  </div>
                  <div className="text-xs text-duke-blue-200">
                    MVP: {title.tournament_mvp}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* NBA Pipeline Stats */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            NBA Pipeline
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Duke's unmatched track record of developing NBA talent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total NBA Alumni" delay={0.1} isHighlight>
            <AnimatedCounter end={nba_pipeline.total_alumni_in_nba_history} />
          </StatCard>
          
          <StatCard title="Current NBA Players" delay={0.2}>
            <AnimatedCounter end={nba_pipeline.current_nba_players} />
          </StatCard>
          
          <StatCard title="First Round Picks" delay={0.3}>
            <AnimatedCounter end={nba_pipeline.first_round_draft_picks} />
          </StatCard>
          
          <StatCard title="Hall of Famers" delay={0.4}>
            <AnimatedCounter end={nba_pipeline.hall_of_famers} />
          </StatCard>
        </div>
      </motion.section>

      {/* All-Time Records */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            All-Time Records
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Decades of dominance in college basketball
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Program Wins" delay={0.1} isHighlight>
            <AnimatedCounter end={all_time_records.program_wins} />
          </StatCard>
          
          <StatCard title="Cameron Win %" delay={0.2}>
            <AnimatedCounter 
              end={Math.round(all_time_records.cameron_indoor_win_percentage * 100)} 
              suffix="%" 
            />
          </StatCard>
          
          <StatCard title="ACC Titles" delay={0.3}>
            <AnimatedCounter end={all_time_records.acc_titles.regular_season + all_time_records.acc_titles.tournament} />
            <div className="text-sm text-slate-400 mt-2">
              {all_time_records.acc_titles.regular_season} Regular • {all_time_records.acc_titles.tournament} Tournament
            </div>
          </StatCard>
          
          <StatCard title="Final Four Appearances" delay={0.4}>
            <AnimatedCounter end={all_time_records.final_four_appearances} />
          </StatCard>
          
          <StatCard title="Coach K Wins" delay={0.5}>
            <AnimatedCounter end={all_time_records.coach_k_career_wins} />
          </StatCard>
        </div>
      </motion.section>
    </div>
  );
}
