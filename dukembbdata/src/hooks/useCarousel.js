import { useState, useEffect, useCallback, useRef } from 'react';

export const useCarousel = (items = [], autoPlayInterval = 6000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const totalItems = items.length;
  const hasItems = totalItems > 0;

  // Auto-play functionality
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (hasItems && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % totalItems);
      }, autoPlayInterval);
    }
  }, [hasItems, isPaused, totalItems, autoPlayInterval]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Navigation functions
  const goToNext = useCallback(() => {
    if (hasItems) {
      setCurrentIndex(prev => (prev + 1) % totalItems);
    }
  }, [hasItems, totalItems]);

  const goToPrevious = useCallback(() => {
    if (hasItems) {
      setCurrentIndex(prev => (prev - 1 + totalItems) % totalItems);
    }
  }, [hasItems, totalItems]);

  const goToSlide = useCallback((index) => {
    if (hasItems && index >= 0 && index < totalItems) {
      setCurrentIndex(index);
    }
  }, [hasItems, totalItems]);

  // Pause/resume functions
  const pause = useCallback(() => {
    setIsPaused(true);
    stopAutoPlay();
  }, [stopAutoPlay]);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    } else if (event.key === ' ') {
      event.preventDefault();
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    }
  }, [goToPrevious, goToNext, isPaused, pause, resume]);

  // Effects
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    if (hasItems) {
      setCurrentIndex(0);
    }
  }, [hasItems]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAutoPlay();
  }, [stopAutoPlay]);

  return {
    currentIndex,
    isPaused,
    hasItems,
    totalItems,
    goToNext,
    goToPrevious,
    goToSlide,
    pause,
    resume,
    handleKeyDown,
  };
};
