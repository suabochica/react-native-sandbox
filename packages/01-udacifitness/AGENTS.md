# UdaciFitness - Agent Guidance

## Commands
- `pnpm install` - Install deps (ALWAYS from this directory; the project is excluded from the monorepo workspace)
- `pnpm start` - Start Metro dev server (Expo Go / emulators)
- `pnpm test` - jest smoke test (`jest-expo` preset)
- `npx expo export` - Production bundle; the best headless validation that the module graph is healthy

## Why no Vite (do not "migrate" this project to Vite)
The repo's web migration guide (CRA -> Vite + pnpm) does NOT apply here.
React Native apps run on a native JS runtime and can only be bundled by
**Metro**; Vite targets the browser DOM. This project was migrated from
Create React Native App (`react-native-scripts`, Expo SDK 27, 2018) to
modern Expo (SDK 54, RN 0.81, react 19) + pnpm instead.

## Workspace isolation (react 18 vs 19 conflict)
- The monorepo root hoists `react@18.3.1` for the web projects. This app
  needs `react@19.1.0` / `react-native@0.81.5`. Sharing one `node_modules`
  produced duplicate react/react-native copies (broken hooks, Metro picking
  RN 0.86 pulled in by `@tanstack/react-query`'s auto-installed peer from an
  unrelated web project).
- Therefore the root `pnpm-workspace.yaml` lists `!projects/20-udacifitness`
  and this directory is its own pnpm workspace with its own lockfile.
  Do not undo this without a plan for the version conflict.
- Local `pnpm-workspace.yaml` sets `nodeLinker: hoisted` and
  `packageExtensions` adding `react`/`react-native` peers for
  `@react-native-community/slider`, `react-native-calendars`,
  `recyclerlistview`, `react-native-swipe-gestures` — they
  `require('react-native')` without declaring it.
- `metro.config.js` pins `resolver.nodeModulesPaths` to the local
  `node_modules` for the same reason.

## Project structure
- Entry: `index.js` (`registerRootComponent`), root component `App.js`
- Source dirs: `components/`, `actions/`, `reducers/`, `utils/`
- `components/UdaciFitnessCalendar.js` is a vendored drop-in replacement for
  the abandoned `udacifitness-calendar` package (a 2018 fork of Wix's
  react-native-calendars Agenda). It preserves the original
  `renderItem(entry, formattedDate, key)` / `renderEmptyDate(formattedDate)`
  contract with `History.js`.
- Do NOT reimplement it with the stock `<Agenda />` from
  react-native-calendars: Agenda's class-era
  componentDidUpdate → setState → scroll → onDayChange cycle loops into
  "Maximum update depth exceeded" on modern React (seen on a real Android
  device, not just jest). The wrapper uses `<Calendar />` + `<FlatList />`
  instead and owns all list rendering.

## Tech quirks
- React Navigation v7: `NavigationContainer` + `createNativeStackNavigator` +
  `createBottomTabNavigator`; screens receive `route.params` (not
  `navigation.state.params`); `static navigationOptions` is gone — screen
  options live in `App.js`.
- Notifications: `expo-notifications` daily trigger at 20:00; Android needs
  the `default` channel (created in `utils/helpers.js`); remote push is dead
  in Expo Go Android since SDK 53 (local scheduling still fine on iOS).
- `AsyncStorage` comes from `@react-native-async-storage/async-storage`;
  jest maps it to the package's official mock (`moduleNameMapper` in
  package.json).
- jest: `transformIgnorePatterns` has two entries (one for `.pnpm` realpaths,
  one for flat paths) because pnpm hoisted layout can surface either.
- Ionicons v5 (via `@expo/vector-icons`) dropped the `ios-`/`md-` name
  prefixes — use bare names (`bookmarks`, `speedometer`, `happy-outline`).
- `App.test.js` wraps `renderer.create` in `act` (React 19 schedules renders
  async); the full tree, including the calendar, renders under
  react-test-renderer.

## Node version
Node >= 20 (developed on Node 24, pnpm 11.13).
