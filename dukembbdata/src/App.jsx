import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PlayerCarousel from './components/PlayerCarousel.jsx';
import { players as basePlayers } from './data/players.js';

const heroGradient =
  'pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),rgba(15,23,42,0.95))]';

const badgeStyles =
  'rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.4em] text-blue-100/70 backdrop-blur';

export default function App() {
  const [positionFilter, setPositionFilter] = useState('All');

  const positions = useMemo(() => {
    const unique = new Set(basePlayers.map((player) => player.position));
    return ['All', ...unique];
  }, []);

  const filteredPlayers = useMemo(() => {
    if (positionFilter === 'All') return basePlayers;
    return basePlayers.filter((player) => player.position === positionFilter);
  }, [positionFilter]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className={heroGradient} aria-hidden />

      <div className="absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-blue-500/20 via-slate-950/80 to-slate-950" aria-hidden />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-24 pt-12 sm:px-8 lg:px-12">
        <header className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.5em] text-blue-200/70">
              <span className={badgeStyles}>Duke Blue Devils</span>
              <span className={badgeStyles}>Cameron Legends</span>
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              The next era of Duke hoops, captured on a rotating stage.
            </h1>
            <p className="max-w-xl text-base text-slate-300/80 sm:text-lg">
              Meet the players electrifying Cameron Indoor Stadium. Swipe through spotlights crafted with TailwindCSS and brought to life with Framer Motion.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm uppercase tracking-[0.35em] text-blue-100/70">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
                Hype Index Live
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                Freshman Phenoms
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass flex w-full max-w-sm flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200/80 backdrop-blur lg:max-w-md"
          >
            <div className="space-y-3 text-xs uppercase tracking-[0.3em] text-blue-200/80">
              <p>Inside Cameron</p>
              <div className="grid grid-cols-2 gap-3 text-[0.65rem]">
                <div className="rounded-2xl bg-white/5 p-3 text-center text-slate-200/90">
                  <p className="text-xs text-blue-100/80">National Titles</p>
                  <p className="text-2xl font-semibold text-white">5</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-3 text-center text-slate-200/90">
                  <p className="text-xs text-blue-100/80">NBA Alumni</p>
                  <p className="text-2xl font-semibold text-white">100+</p>
                </div>
              </div>
              <p className="text-[0.65rem] leading-6 text-slate-200/80">
                Cameron Indoor is more than a gym—it's a rite of passage. These cards spotlight the Duke stars writing the next chapter.
              </p>
            </div>
          </motion.div>
        </header>

        <section className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Player spotlights
            </h2>
            <div className="flex flex-wrap gap-3">
              {positions.map((position) => (
                <motion.button
                  key={position}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPositionFilter(position)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.35em] transition ${
                    positionFilter === position
                      ? 'border-blue-300/60 bg-blue-500/20 text-blue-100 shadow-[0_0_30px_rgba(96,165,250,0.45)]'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {position}
                </motion.button>
              ))}
            </div>
          </div>

          <PlayerCarousel players={filteredPlayers} />
        </section>
      </div>
    </div>
  );
}
