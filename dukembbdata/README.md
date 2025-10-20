# 🏀 Duke Basketball Stats Hub

A modern, interactive web application that displays rotating player statistics using the API-Basketball API. Built with Vite + React, featuring Duke-inspired styling and a fun "Cameron Hype Index" to track team energy levels.

## ✨ Features

- **Rotating Player Stats Carousel**: Auto-rotating player cards with smooth transitions
- **Interactive Radar Charts**: Visualize player performance across multiple categories
- **Cameron Hype Index**: Proprietary algorithm to track team energy levels
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Keyboard Navigation**: Full accessibility support with arrow keys
- **Swipe Support**: Mobile-friendly touch gestures
- **Shareable URLs**: Bookmark and share specific team/season combinations
- **Mock Data Fallback**: Works without API configuration for development

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn
- API-Basketball account (optional, for real data)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo>
   cd dukembbdata
   npm install
   ```

2. **Configure environment (optional):**
   Create a `.env` file in the project root:
   ```env
   VITE_API_BASKETBALL_BASE=https://v3.basketball.api-sports.io
   VITE_API_BASKETBALL_KEY=your_api_key_here
   VITE_DEFAULT_LEAGUE_ID=12
   VITE_DEFAULT_SEASON=2024
   VITE_DEFAULT_TEAM_ID=150
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Getting API Keys

1. Visit [API-Basketball](https://www.api-basketball.com/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

### Finding Team IDs

The app includes a built-in setup panel that helps you find team IDs:

1. Click "Get Started" or the setup button
2. Select a league (e.g., NCAA)
3. Search for "Duke" or your preferred team
4. The app will remember your selection

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASKETBALL_BASE` | API base URL | `https://v3.basketball.api-sports.io` |
| `VITE_API_BASKETBALL_KEY` | Your API key | Required for real data |
| `VITE_DEFAULT_LEAGUE_ID` | Default league ID | `12` (NCAA) |
| `VITE_DEFAULT_SEASON` | Default season year | `2024` |
| `VITE_DEFAULT_TEAM_ID` | Duke team ID | Required for "Use Duke" button |

## 🎮 Usage

### Basic Navigation

- **Auto-rotation**: Player cards rotate every 6 seconds
- **Pause/Resume**: Hover over carousel or press spacebar
- **Manual Navigation**: Use arrow keys (←/→) or click controls
- **Mobile**: Swipe left/right to navigate

### Controls

- **League Selection**: Choose from available leagues
- **Season Selection**: Pick from recent seasons (2015-2025)
- **Team Search**: Search for teams by name
- **"Use Duke" Button**: Quick setup with Duke defaults

### Player Cards

Each player card displays:
- **Basic Info**: Name, number, position, height
- **Key Stats**: Points, Rebounds, Assists, Steals, Blocks
- **Shooting Percentages**: FG%, 3P%, FT%
- **Radar Chart**: Visual performance comparison
- **Share Button**: Copy formatted stats to clipboard

### Cameron Hype Index

The proprietary algorithm calculates team energy based on:
- Points per game (40% weight)
- Rebounds per game (20% weight)  
- Assists per game (20% weight)
- Field goal percentage (20% weight)

Hype levels:
- 🔥 **80-100**: Cameron Crazies Level!
- ⚡ **60-79**: Blue Devil Energy!
- 📈 **40-59**: Building Momentum
- 🚀 **20-39**: Getting Started
- 😴 **0-19**: Needs More Hype

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── ControlsBar.jsx   # League/Season/Team controls
│   ├── PlayerCard.jsx    # Individual player display
│   ├── PlayerStatsCarousel.jsx # Main carousel component
│   ├── SummaryBar.jsx    # Team averages & hype index
│   ├── SetupPanel.jsx    # Initial configuration
│   ├── EmptyState.jsx    # Welcome screen
│   ├── LoadingSkeleton.jsx # Loading animation
│   └── Toast.jsx         # Notification system
├── hooks/               # Custom React hooks
│   ├── useCarousel.js   # Carousel logic & controls
│   └── usePlayersData.js # Data fetching & caching
├── lib/                 # Utilities & API
│   ├── api.js           # API-Basketball client
│   ├── transform.js     # Data normalization
│   └── mock.js          # Fallback mock data
├── config/
│   └── env.js           # Environment configuration
└── App.jsx              # Main application
```

## 🎨 Styling

Built with **Tailwind CSS** featuring:
- **Dark mode** by default
- **Duke blue** color scheme (#003087)
- **Smooth animations** with Framer Motion
- **Responsive design** for all screen sizes
- **Accessibility** with proper ARIA roles

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Key Technologies

- **Vite**: Fast build tool and dev server
- **React 19**: Latest React with hooks
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Recharts**: Data visualization
- **react-swipeable**: Touch gestures

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The `dist` folder will contain the production build.

### Deploy to Vercel/Netlify

1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Deploy automatically on push

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `VITE_API_BASKETBALL_KEY`
- `VITE_DEFAULT_TEAM_ID` (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - feel free to use this project for your own basketball stats needs!

## 🆘 Troubleshooting

### Common Issues

**"No Players Found"**
- Check your API key configuration
- Verify team ID is correct
- Ensure season has data available

**"API configuration missing"**
- Add `VITE_API_BASKETBALL_KEY` to your `.env` file
- Restart the development server

**Carousel not rotating**
- Check browser console for errors
- Verify players data is loading
- Try refreshing the page

### Getting Help

- Check the browser console for error messages
- Verify your API key is valid
- Ensure you have an active internet connection
- Try the mock data fallback first

---

**Go Blue Devils! 🏀💙**