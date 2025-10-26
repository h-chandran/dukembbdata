import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PlayerCard from './PlayerCard.jsx';

const activeVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 140 : -140,
    opacity: 0,
    rotate: direction > 0 ? 4 : -4,
    scale: 0.9,
  }),
  animate: {
    x: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 26,
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 140 : -140,
    opacity: 0,
    rotate: direction < 0 ? -6 : 6,
    scale: 0.9,
    transition: {
      duration: 0.25,
    },
  }),
};

const secondaryVariants = {
  initial: { opacity: 0, scale: 0.85, filter: 'blur(2px)' },
  animate: {
    opacity: 1,
    scale: 0.9,
    filter: 'blur(0)',
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function PlayerCarousel({ players }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = players.length;
  const currentPlayer = players[index] ?? null;

  const adjacent = useMemo(() => {
    if (!total) return { previous: null, next: null };
    const previous = players[(index - 1 + total) % total];
    const next = players[(index + 1) % total];
    return { previous, next };
  }, [index, players, total]);

  const paginate = (step) => {
    if (!total) return;
    setDirection(step);
    setIndex((prev) => (prev + step + total) % total);
  };

  if (!currentPlayer) {
    return null;
  }

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10">
      <div className="absolute inset-x-0 top-1/2 h-[22rem] -translate-y-1/2 rounded-full bg-duke-blue-500/10 blur-3xl" aria-hidden />

      <div className="flex w-full items-center justify-between gap-6">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          className="hidden rounded-full border border-white/10 bg-white/10 p-4 text-white/80 shadow-lg backdrop-blur-md transition hover:bg-white/20 hover:text-white/100 md:inline-flex"
          onClick={() => paginate(-1)}
          aria-label="Show previous player"
        >
          ‹
        </motion.button>

        <div className="relative flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPlayer.name}
              custom={direction}
              variants={activeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-20 w-full max-w-lg"
            >
              <PlayerCard player={currentPlayer} />
            </motion.div>
          </AnimatePresence>

          {adjacent.previous && (
            <motion.div
              key={`${currentPlayer.name}-prev-${adjacent.previous.name}`}
              variants={secondaryVariants}
              initial="initial"
              animate="animate"
              className="absolute left-8 z-10 hidden max-w-xs -rotate-3 opacity-80 md:block"
            >
              <PlayerCard player={adjacent.previous} />
            </motion.div>
          )}

          {adjacent.next && (
            <motion.div
              key={`${currentPlayer.name}-next-${adjacent.next.name}`}
              variants={secondaryVariants}
              initial="initial"
              animate="animate"
              className="absolute right-8 z-10 hidden max-w-xs rotate-3 opacity-80 md:block"
            >
              <PlayerCard player={adjacent.next} />
            </motion.div>
          )}
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          className="hidden rounded-full border border-white/10 bg-white/10 p-4 text-white/80 shadow-lg backdrop-blur-md transition hover:bg-white/20 hover:text-white/100 md:inline-flex"
          onClick={() => paginate(1)}
          aria-label="Show next player"
        >
          ›
        </motion.button>
      </div>

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-slate-300/70">
        {players.map((player, idx) => (
          <button
            key={player.name}
            type="button"
            onClick={() => {
              if (idx === index) return;
              setDirection(idx > index ? 1 : -1);
              setIndex(idx);
            }}
            className="group flex flex-col items-center gap-2"
          >
            <span
              className={`h-2 w-8 rounded-full transition ${
                idx === index
                  ? 'bg-duke-blue-400 shadow-[0_0_20px_rgba(0,83,155,0.6)]'
                  : 'bg-white/20 group-hover:bg-white/40'
              }`}
            />
            <span className="text-[0.55rem] tracking-[0.3em] text-white/50 group-hover:text-white/80">
              {player.number.toString().padStart(2, '0')}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
