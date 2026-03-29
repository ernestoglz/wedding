# Pri & Ernesto Wedding

Wedding invitation website built with React, TypeScript, and Vite. Features a personalized RSVP system backed by Google Sheets via Apps Script.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 7** (build & dev server)
- **Tailwind CSS 3** (styling)
- **React Hook Form** (form management)
- **Vitest** + **Testing Library** (unit tests)
- **GitHub Pages** (hosting via `gh-pages`)

## Getting Started

### Prerequisites

- Node.js 20+ (22+ recommended)
- npm

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

Edit `.env` with your Google Apps Script deployment URL:

```env
VITE_GUEST_API_URL=/guest-api
GUEST_API_TARGET=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### Development

```bash
npm run dev
```

The dev server proxies `/guest-api` requests to the Apps Script URL to avoid CORS issues.

### Build

```bash
npm run build
```

### Deploy

```bash
npm run deploy
```

Builds the project and publishes to GitHub Pages.

## Testing

```bash
# Single run
npm test

# Watch mode
npm run test:watch
```

## Project Structure

```
src/
  components/
    Countdown/          # Wedding countdown timer
    DressCode/          # Dress code information
    EventDetails/       # Ceremony & reception details
    Footer/
    Gifts/              # Gift registry
    GuestLoading/       # Loading state for guest lookup
    GuestNotFound/      # Error state for invalid guest references
    GuestWelcome/       # Personalized guest greeting
    Hero/               # Landing hero section
    MusicPlayer/        # Background music player
    RsvpForm/           # RSVP form (personalized & generic)
    SpotifyPlaylist/    # Spotify playlist embed
    StarrySky/          # Animated background
    Timeline/           # Event timeline
    primitives/         # Shared UI primitives
  hooks/
    useGuest.ts         # Guest lookup via ?ref= URL param
    useScrollReveal.ts  # Scroll-triggered animations
  services/
    guestApi.ts         # Google Apps Script API client
  types/
    guest.ts            # Guest & RSVP types
```

## RSVP System

Guests receive a personalized link with a `?ref=` parameter that identifies them in the Google Sheet. The form:

- Dynamically renders one card per reserved seat (`asientos`)
- Collects name and dietary restrictions per guest
- Submits to a Google Apps Script backend that updates the sheet

Guests without a valid reference link see a generic form that saves to `localStorage`.

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_GUEST_API_URL` | API URL exposed to the browser (`/guest-api` in dev, full URL in prod) |
| `GUEST_API_TARGET` | Full Apps Script URL used by Vite proxy in development |
