import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PlayerCarousel from './components/PlayerCarousel.jsx';
import { players as basePlayers } from './data/players.js';
import cameronStadium from './assets/cameron-indoor-stadium.jpg';

const heroBadges = ['The Brotherhood', 'Duke MBB', 'Cameron Indoor'];

const statBlocks = [
  { label: 'National Championships', value: '5', caption: '1991 • 1992 • 2001 • 2010 • 2015' },
  { label: 'First-Round NBA Draft Picks', value: '46', caption: 'Brotherhood alumni thriving in the League' },
  { label: 'Wins at Cameron Since 2000', value: '340+', caption: 'Home-court energy from the Crazies' },
];

const brotherhoodPillars = [
  {
    title: 'Built on Brotherhood',
    description:
      'Every class adds a new chapter to Duke basketball. Veterans mentor the next wave, and newcomers bring fresh fire to the family.',
  },
  {
    title: 'Powered by the Crazies',
    description:
      'Cameron Indoor is a sonic laboratory. The Cameron Crazies fuel late-game runs, drown out opponents, and turn momentum in seconds.',
  },
  {
    title: 'Future-Focused Development',
    description:
      'From film rooms to the nutrition lab, Duke MBB blends tradition with tech so the roster peaks when March arrives.',
  },
];

const timelineMoments = [
  {
    season: 'Freshman Focus',
    headline: 'Cooper Flagg takes the stage',
    blurb:
      'The top prospect in America steps onto Coach Scheyer’s court with length, instincts, and a flair for big moments that feel born for Cameron.',
  },
  {
    season: 'Backcourt Command',
    headline: 'Tyrese Proctor pilots the tempo',
    blurb:
      'Junior leadership stabilises the offense, orchestrating pace, pushing in transition, and keeping shooters fed on the perimeter.',
  },
  {
    season: 'Perimeter Fireworks',
    headline: 'Jared McCain ignites the arc',
    blurb:
      'Sophomore confidence and effortless range keep defenses scrambling, stretching the floor for the Brotherhood to attack mismatches.',
  },
];

const tickerItems = [
  'Brotherhood Energy',
  'Duke MBB Tradition',
  'Cameron Crazies Live',
  'Next Play Mindset',
  'Stand with the Brotherhood',
];

const heroGlowClass =
  'pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.25),_rgba(2,6,23,0.98))]';

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
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${cameronStadium})`,
          backgroundSize: 'contain',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-slate-950/70 to-slate-950" aria-hidden />
      <div className={heroGlowClass} aria-hidden />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-16 -z-10 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.55, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle,_rgba(12,74,110,0.25),_transparent_65%)]"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex w-full flex-col px-4 sm:px-6">
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex min-h-screen items-center justify-center"
        >
          <div className="w-full max-w-6xl mx-auto text-center space-y-12">
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
                className="text-6xl font-semibold leading-tight text-white sm:text-7xl lg:text-8xl"
              >
                The next wave of the Brotherhood is ready to light up Duke MBB.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                className="max-w-4xl mx-auto text-lg text-slate-300/80 sm:text-xl"
              >
                From the roar of Cameron Indoor to the grind in Krzyzewskiville, this roster is wired for big moments. Scroll to
                meet the players shaping Duke basketball&apos;s present and future.
              </motion.p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-xs uppercase tracking-[0.4em] text-blue-100/80">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />
                Brotherhood Pulse Live
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.8)]" />
                Duke DNA Tracker
              </span>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-blue-400/50 bg-blue-500/20 px-6 py-3 text-[0.65rem] uppercase tracking-[0.45em] text-blue-100 transition hover:border-blue-300 hover:bg-blue-500/40"
              >
                Explore The Brotherhood
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-[0.65rem] uppercase tracking-[0.45em] text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Watch Cameron Moments
              </motion.button>
            </div>
          </div>
        </motion.section>

        <div className="flex flex-col gap-24 pb-24">

        <section className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
          <motion.div
            className="flex flex-wrap justify-between gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
            }}
          >
            {statBlocks.map((stat) => (
              <motion.div
                key={stat.label}
                className="flex-1 min-w-[200px] space-y-3 rounded-2xl border border-white/10 bg-slate-900/80 p-6"
                variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
              >
                <p className="text-[0.6rem] uppercase tracking-[0.45em] text-blue-100/70">{stat.label}</p>
                <p className="text-3xl font-semibold text-white sm:text-4xl">{stat.value}</p>
                <p className="text-xs text-slate-300/70">{stat.caption}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="grid gap-6 md:grid-cols-3"
          >
            {brotherhoodPillars.map((pillar) => (
              <div key={pillar.title} className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/60 p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-blue-100/70">{pillar.title}</p>
                <p className="text-sm text-slate-200/80">{pillar.description}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-10 backdrop-blur">
          <div className="flex flex-col gap-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Brotherhood Spotlight
            </motion.h2>
            <p className="mx-auto max-w-3xl text-sm text-slate-300/80 sm:text-base">
              The spotlight is trained on the leaders of Duke MBB&apos;s current charge. Each moment in the timeline pulses with the confidence of a program that expects April basketball.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {timelineMoments.map((moment, index) => (
              <motion.div
                key={moment.headline}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="absolute -left-16 top-12 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl" aria-hidden />
                <p className="text-[0.55rem] uppercase tracking-[0.45em] text-blue-100/70">{moment.season}</p>
                <p className="mt-4 text-lg font-semibold text-white">{moment.headline}</p>
                <p className="mt-3 text-sm text-slate-300/80">{moment.blurb}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-blue-400/30 bg-gradient-to-b from-blue-500/20 via-slate-950/80 to-slate-950 p-10 shadow-[0_0_60px_rgba(37,99,235,0.25)]">
          <motion.div
            aria-hidden
            className="absolute inset-x-6 -top-10 h-20 rounded-full border border-blue-400/40 bg-blue-500/30 blur-lg"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          <div className="relative flex flex-col gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Player Holograms</h2>
              <p className="mx-auto max-w-2xl text-sm text-slate-200/80 sm:text-base">
                Cycle through the standouts driving Duke basketball. Filter by position to watch how the Brotherhood balances size, shooting, and leadership across the floor.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-wrap justify-center gap-3 text-[0.6rem] uppercase tracking-[0.4em] text-blue-100/80"
            >
              {positions.map((position) => (
                <motion.button
                  key={position}
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setPositionFilter(position)}
                  className={`rounded-full border px-4 py-2 transition ${
                    positionFilter === position
                      ? 'border-blue-300/60 bg-blue-500/20 text-blue-100 shadow-[0_0_30px_rgba(37,99,235,0.45)]'
                      : 'border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {position}
                </motion.button>
              ))}
            </motion.div>
          </div>

          <div className="relative mt-12 rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <PlayerCarousel players={filteredPlayers} />
          </div>
        </section>

        <motion.div
          aria-label="Brotherhood ticker"
          className="relative overflow-hidden rounded-full border border-white/10 bg-white/5 py-4"
        >
          <motion.div
            className="flex gap-12 text-[0.6rem] uppercase tracking-[0.5em] text-blue-100/70"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
          >
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}
