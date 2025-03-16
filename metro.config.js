// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add custom configuration for assets
config.resolver.assetExts = [
  // Images
  'png', 'jpg', 'jpeg', 'gif', 'webp',
  // Fonts
  'ttf', 'otf', 'woff', 'woff2',
  // Media
  'mp4', 'mp3', 'wav', 'webm',
  // Documents
  'pdf', 'doc', 'docx',
  // Data
  'json', 'db', 'sqlite',
  // Others
  ...config.resolver.assetExts,
];

// Add custom configuration for source extensions
config.resolver.sourceExts = [
  'js',
  'jsx',
  'json',
  'ts',
  'tsx',
  'cjs',
  // Add native extensions
  'android.js',
  'android.jsx',
  'android.ts',
  'android.tsx',
  'ios.js',
  'ios.jsx',
  'ios.ts',
  'ios.tsx',
];

// Configure module resolution
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@': path.resolve(__dirname, 'src'),
};

// Configure the cache
config.resetCache = true;
config.cacheVersion = '1.0';

// Configure the watchFolders to include any external dependencies
config.watchFolders = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, 'src'),
  path.resolve(__dirname, 'assets'),
];

// Configure asset plugins
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// Optimize the bundle
config.transformer.minifierConfig = {
  keep_classnames: true,
  keep_fnames: true,
  mangle: {
    keep_classnames: true,
    keep_fnames: true,
    reserved: [
      'require', 'module', 'exports',
      // Add any other names that shouldn't be mangled
    ],
  },
  compress: {
    drop_console: true, // Remove console.log in production
    drop_debugger: true, // Remove debugger statements
    pure_funcs: ['console.log'], // Remove specific functions
  },
};

// Add performance optimizations
config.maxWorkers = 4; // Adjust based on your CPU cores
config.transformer.asyncRequireModulePath = require.resolve('react-native/Libraries/Core/InitializeCore');
config.transformer.enableBabelRuntime = true;

// Add symlink resolution
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (process.env.NODE_ENV === 'production') {
    // Add any production-specific module resolution here
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config; 