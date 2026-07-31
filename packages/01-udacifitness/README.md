# UdaciFitness

[![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react)](https://reactnative.dev/)
[![React Navigation](https://img.shields.io/badge/React%20Navigation-7-6B52AE)](https://reactnavigation.org/)
[![pnpm](https://img.shields.io/badge/pnpm-11.13-F69220?logo=pnpm)](https://pnpm.io/)

A triathlon training log built with React Native and Expo. Record daily run, bike, swim, sleep and eat metrics, review them on an agenda calendar, track live heading/altitude/speed, and get a daily reminder notification.

---

## 💎 Value Proposition

- **Daily metric logging** — sliders and steppers for five metrics, persisted to `AsyncStorage` and mirrored in a Redux store.
- **Agenda history** — calendar with per-day metric cards and empty-day messaging, seeded with 183 days of mock data on first run.
- **Live tracking** — compass heading (with direction animation), altitude in feet, and speed in MPH via `expo-location`.
- **Local notifications** — a daily 8 PM reminder scheduled with `expo-notifications`, cleared once you log that day.

> ⚠️ **No Vite here, on purpose.** React Native apps are bundled by **Metro**, not Vite (Vite only targets the browser). This project was migrated from Create React Native App (2018) to modern Expo + pnpm; see `AGENTS.md` for the full story.

---

## 📦 Installation

**Prerequisites:** [Node.js](https://nodejs.org/) >= 20, [pnpm](https://pnpm.io/installation) >= 10, and the [Expo Go](https://expo.dev/go) app on a physical device (or an Android emulator / iOS simulator).

> ⚠️ This project is **excluded from the monorepo's pnpm workspace** on purpose (see the root `pnpm-workspace.yaml`). It has its own lockfile and `node_modules`; always install and run it from *this* directory, never from the repo root.

```bash
cd projects/20-udacifitness
pnpm install
```

---

## 🚀 Usage

| Command | Description |
|---|---|
| `pnpm start` | Start the Metro dev server; scan the QR code with Expo Go |
| `pnpm run android` | Start and open on a connected Android device/emulator |
| `pnpm run ios` | Start and open on the iOS simulator (macOS only) |
| `pnpm test` | Run the jest smoke test (`jest-expo` preset) |
| `npx expo export` | Production-bundle the app (validates the full module graph) |

On first launch the app seeds `AsyncStorage` with dummy history and requests notification permission. The **Live** tab additionally requests foreground location permission.

---

## 🏗️ Architecture

```
├── App.js                  # Redux Provider + NavigationContainer (tabs inside native stack)
├── index.js                # Entry: registerRootComponent(App)
├── actions/                # receiveEntries / addEntry action creators
├── reducers/               # entries reducer (date-keyed store)
├── components/
│   ├── History.js          # Agenda of past entries (connected)
│   ├── UdaciFitnessCalendar.js  # Vendored replacement for the 2018 `udacifitness-calendar`
│   │                          # package, rebuilt on react-native-calendars <Calendar/> + FlatList
│   ├── AddEntry.js         # Daily logging form (sliders + steppers, connected)
│   ├── Live.js             # Heading/altitude/speed via expo-location
│   ├── EntryDetail.js      # Single-day metrics + reset (connected)
│   ├── MetricCard.js       # Metric rows with icons
│   ├── DateHeader.js, TextButton.js, UdaciSlider.js, UdaciSteppers.js
└── utils/
    ├── api.js              # AsyncStorage CRUD
    ├── _calendar.js        # Dummy-data seeding + result formatting
    ├── helpers.js          # Metric metadata, direction math, daily notification
    └── colors.js
```

### 📊 Data Flow

1. `History` mounts, reads `UdaciFitness:calendar` from `AsyncStorage` (seeding dummy data if empty) and dispatches `receiveEntries`.
2. The store shape is `{ 'yyyy-MM-dd': { run, bike, swim, sleep, eat } | { today } | null }`.
3. `AddEntry` writes today's metrics to Redux and `AsyncStorage`, then reschedules the daily reminder.
4. `UdaciFitnessCalendar` adapts the date-keyed store to the `{ date: [items] }` shape that `react-native-calendars` expects.

---

## ⚙️ Configuration

### 📱 Expo

`app.json` holds the Expo config (name, slug, orientation, `expo-notifications` and `expo-location` plugins, iOS bundle id / Android package). There is no `sdkVersion` field — the SDK is implied by the installed `expo` package.

### 🧭 Metro

`metro.config.js` extends Expo's default config and pins `resolver.nodeModulesPaths` to this project's own `node_modules`, so Metro never resolves packages from the monorepo root (where the web projects hoist react 18).

### 📦 pnpm isolation

`pnpm-workspace.yaml` in this directory makes it its own pnpm workspace with `nodeLinker: hoisted` and `packageExtensions` that declare missing `react`/`react-native` peers for `@react-native-community/slider`, `react-native-calendars`, `recyclerlistview` and `react-native-swipe-gestures`. Without them, those packages' untracked `require('react-native')` would resolve to a wrong copy.

### 🔔 Notifications on Android

Since SDK 53, Expo Go on Android no longer supports remote push; local scheduled reminders still work on iOS Expo Go and in [development builds](https://docs.expo.dev/develop/development-builds/introduction/).

---

## 🤝 Contribution

1. Fork the repository and create a feature branch.
2. Install dependencies from *this* directory with `pnpm install`.
3. Verify changes with `pnpm test` and a production bundle: `npx expo export`.
4. Follow the existing folder structure and naming conventions.
5. Do not re-add this project to the root pnpm workspace without solving the react 18/19 hoist conflict first (see `AGENTS.md`).
