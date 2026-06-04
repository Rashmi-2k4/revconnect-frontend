# RevConnect Frontend

A sophisticated React + Vite frontend for the RevConnect social platform.

## Tech Stack

- **React 18** with React Router v6
- **Vite** (dev server, build, proxy)
- **CSS Variables** (no external UI library — fully custom)
- **Syne + DM Sans** fonts from Google Fonts

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (proxies /api to localhost:5000)
npm run dev

# Build for production
npm run build
```

Open http://localhost:3000

## File Structure

```
revconnect-frontend/
├── index.html                   # HTML entry point
├── vite.config.js               # Vite config (proxy to backend)
├── package.json
│
└── src/
    ├── main.jsx                 # ReactDOM root, BrowserRouter
    ├── App.jsx                  # Routes, PrivateRoute guard
    │
    ├── styles/
    │   └── globals.css          # CSS variables, animations, resets
    │
    ├── api/
    │   └── client.js            # All API calls (auth, posts, profile, social, notif)
    │
    ├── hooks/
    │   ├── useAuth.jsx          # AuthContext — token, user, saveSession, logout
    │   └── useToast.jsx         # ToastContext — showToast(message, type)
    │
    ├── utils/
    │   └── helpers.js           # timeAgo, getInitial, getAvatarGradient, demo data
    │
    ├── components/
    │   ├── AmbientOrbs.jsx      # Animated background gradient orbs
    │   ├── Avatar.jsx           # User avatar circle with initials
    │   ├── AccountBadge.jsx     # personal / creator / business pill badge
    │   ├── PostCard.jsx         # Feed post with like, comment, share
    │   ├── ComposeBox.jsx       # New post composer
    │   ├── Sidebar.jsx          # Left nav (logo, nav items, user card)
    │   └── RightPanel.jsx       # Trending topics + who to follow
    │
    └── pages/
        ├── LandingPage.jsx      # /  — Login + Register with account type selector
        ├── AppShell.jsx         # /app/* — 3-column layout shell
        ├── FeedPage.jsx         # /app/feed
        ├── ProfilePage.jsx      # /app/profile
        ├── NotificationsPage.jsx# /app/notifications
        ├── ExplorePage.jsx      # /app/explore
        └── ConnectionsPage.jsx  # /app/connections
```

## API Routes Used

| Frontend Action       | Backend Route                      |
|-----------------------|------------------------------------|
| Login                 | POST /api/auth/login               |
| Register              | POST /api/auth/register            |
| Get feed              | GET  /api/posts/feed               |
| Create post           | POST /api/posts                    |
| Like post             | POST /api/social/like/:postId      |
| Comment on post       | POST /api/social/comment/:postId   |
| Get my profile        | GET  /api/profile/me               |
| Update profile        | PUT  /api/profile/update           |
| Get notifications     | GET  /api/notifications            |

## Notes

- If the backend is offline, the app runs in **demo mode** with mock data
- JWT token stored in `localStorage` as `rc_token`
- User object stored in `localStorage` as `rc_user`
- Vite dev proxy rewrites `/api/*` → `http://localhost:5000/api/*`
