import { defineConfig } from "cypress";

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    env: {},
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
