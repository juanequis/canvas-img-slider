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
  },
  resolve: {
    alias: {
      '\\.css$': '', // Correctly mock all CSS imports
    },
  },
});