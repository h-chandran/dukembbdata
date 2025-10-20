const EmptyState = ({ onSetup }) => {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="text-8xl mb-6">🏀</div>
      <h2 className="text-3xl font-bold text-white mb-4">
        Welcome to Duke Basketball Stats Hub
      </h2>
      <p className="text-gray-400 text-lg mb-8">
        Get ready to dive into player statistics, team performance, and the legendary Cameron Hype Index!
      </p>
      
      <div className="space-y-4">
        <button
          onClick={onSetup}
          className="duke-gradient text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity"
        >
          🚀 Get Started
        </button>
        
        <div className="text-sm text-gray-500">
          Configure your API settings to load real data
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-lg font-semibold text-white mb-2">Player Stats</h3>
          <p className="text-gray-400 text-sm">
            View detailed statistics for each player including points, rebounds, assists, and shooting percentages.
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="text-lg font-semibold text-white mb-2">Radar Charts</h3>
          <p className="text-gray-400 text-sm">
            Visualize player performance across multiple categories with interactive radar charts.
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-3xl mb-3">🔥</div>
          <h3 className="text-lg font-semibold text-white mb-2">Cameron Hype</h3>
          <p className="text-gray-400 text-sm">
            Track the team's energy level with our proprietary Cameron Hype Index algorithm.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
