// This project is intentionally isolated from the monorepo workspace (see
// pnpm-workspace.yaml). Expo's monorepo autodetection would otherwise walk
// up to the repository root (the root package.json has a "workspaces"
// field) and run the dev server with the wrong project root, so disable it
// BEFORE loading expo/metro-config.
process.env.EXPO_NO_METRO_WORKSPACE_ROOT = '1'

const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)

// Also restrict module resolution to this project's own node_modules, so
// Metro never picks up the react 18 copies hoisted at the repo root.
config.resolver.nodeModulesPaths = [path.resolve(__dirname, 'node_modules')]

module.exports = config
