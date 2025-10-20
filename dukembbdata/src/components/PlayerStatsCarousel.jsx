import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import { useCarousel } from '../hooks/useCarousel.js';
import PlayerCard from './PlayerCard.jsx';
import LoadingSkeleton from './LoadingSkeleton.jsx';

const PlayerStatsCarousel = ({ 
  players, 
  season, 
  loading, 
  onShare 
}) => {
  const {
    currentIndex,
    isPaused,
    hasItems,
    goToNext,
    goToPrevious,
    goToSlide,
    pause,
    resume,
    handleKeyDown,
  } = useCarousel(players, 6000);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Get visible players based on screen size
  const getVisiblePlayers = () => {
    const startIndex = currentIndex;
    const visibleCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    return players.slice(startIndex, startIndex + visibleCount);
  };

  const visiblePlayers = getVisiblePlayers();

  if (loading) {
    return (
      <div className="carousel-container bg-gray-800 rounded-2xl p-6">
        <div className="flex gap-6">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (!hasItems) {
    return (
      <div className="carousel-container bg-gray-800 rounded-2xl p-12 text-center">
        <div className="text-6xl mb-4">🏀</div>
        <h3 className="text-xl font-semibold text-white mb-2">No Players Found</h3>
        <p className="text-gray-400">
          Select a team and season to view player statistics
        </p>
      </div>
    );
  }

  return (
    <div 
      className="carousel-container bg-gray-800 rounded-2xl p-6"
      role="region"
      aria-roledescription="carousel"
      aria-live="polite"
      aria-label="Player statistics carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      {...swipeHandlers}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Player Stats</h2>
          <p className="text-gray-400">
            {players.length} players • Auto-rotating every 6s
            {isPaused && <span className="text-duke-blue ml-2">(Paused)</span>}
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevious}
            disabled={!hasItems}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous player"
          >
            ←
          </button>
          <button
            onClick={isPaused ? resume : pause}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            aria-label={isPaused ? 'Resume rotation' : 'Pause rotation'}
          >
            {isPaused ? '▶' : '⏸'}
          </button>
          <button
            onClick={goToNext}
            disabled={!hasItems}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next player"
          >
            →
          </button>
        </div>
      </div>

      {/* Carousel Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visiblePlayers.map((player, index) => (
              <PlayerCard
                key={`${player.id}-${currentIndex + index}`}
                player={player}
                season={season}
                onShare={onShare}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Indicator */}
      {players.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(players.length / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                Math.floor(currentIndex / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)) === index
                  ? 'bg-duke-blue'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Use ← → keys, swipe, or click controls to navigate
      </div>
    </div>
  );
};

export default PlayerStatsCarousel;
