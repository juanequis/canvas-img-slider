import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Use jsdom for DOM-related tests
    coverage: {
      provider: 'istanbul', // Enable coverage reporting
      reporter: ['text', 'html'], // Output coverage reports
    },
    mockReset: true, // Reset mocks between tests
    exclude: ['e2e'], // Exclude the folder from tests
    resolveSnapshotPath: (testPath, snapExtension) =>
      testPath + snapExtension
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
  },
  resolve: {
    alias: {
      // Mock CSS imports
      '\\.css$': 'identity-obj-proxy',
    },
  },
});