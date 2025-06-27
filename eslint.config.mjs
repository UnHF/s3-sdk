import unjs from "eslint-config-unjs";

export default unjs({
  ignores: [
    // ignore paths
    "README.md",
  ],
  rules: {
    // rule overrides
    "unicorn/prefer-node-protocol": "off",
  },
  markdown: {
    rules: {
      // markdown rule overrides
    },
  },
});
