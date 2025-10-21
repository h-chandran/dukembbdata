import { motion } from 'framer-motion';

const overlayGradient =
  'bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent';

export default function PlayerCard({ player }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -12 }}
      className="relative h-[32rem] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-lg shadow-black/20"
    >
      <div className="absolute inset-0">
        <img
          src={player.image}
          alt={player.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className={`absolute inset-0 ${overlayGradient}`} aria-hidden />
      </div>

      <div className="relative flex h-full flex-col justify-between p-6">
        <header className="space-y-2">
          <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-blue-200/80">
            <span className="rounded-full border border-blue-300/30 px-3 py-1 text-blue-100/90">
              #{player.number}
            </span>
            <span>{player.position}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{player.classYear}</span>
          </div>
          <h3 className="text-3xl font-semibold text-white drop-shadow-md sm:text-4xl">
            {player.name}
          </h3>
          <p className="max-w-sm text-base text-slate-200/90">
            {player.blurb}
          </p>
        </header>

        <dl className="grid grid-cols-3 gap-4 text-center text-sm uppercase tracking-wide text-slate-200/80">
          <div className="rounded-2xl bg-white/5 p-3 backdrop-blur">
            <dt className="text-[0.65rem] text-slate-300/80">PPG</dt>
            <dd className="text-2xl font-semibold text-white">
              {player.stats.ppg}
            </dd>
          </div>
          <div className="rounded-2xl bg-white/5 p-3 backdrop-blur">
            <dt className="text-[0.65rem] text-slate-300/80">RPG</dt>
            <dd className="text-2xl font-semibold text-white">
              {player.stats.rpg}
            </dd>
          </div>
          <div className="rounded-2xl bg-white/5 p-3 backdrop-blur">
            <dt className="text-[0.65rem] text-slate-300/80">APG</dt>
            <dd className="text-2xl font-semibold text-white">
              {player.stats.apg}
            </dd>
          </div>
        </dl>

        <footer className="space-y-3 text-xs uppercase tracking-[0.2em] text-slate-200/70">
          <div className="flex flex-wrap gap-2">
            {player.strengths.map((strength) => (
              <span
                key={strength}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] text-blue-100/80 backdrop-blur"
              >
                {strength}
              </span>
            ))}
          </div>
          <p className="text-[0.65rem] text-slate-300/80">
            {player.height} • {player.weight} • {player.hometown}
          </p>
        </footer>
      </div>
    </motion.article>
  );
}
