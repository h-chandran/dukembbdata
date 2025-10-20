import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 z-50 max-w-sm"
      >
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="text-green-400">✓</div>
            <div className="text-white text-sm flex-1">{message}</div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-lg leading-none"
            >
              ×
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
