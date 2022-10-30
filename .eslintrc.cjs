module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/jsx-runtime",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint"],
  overrides: [
    {
      files: ["*.enums.ts", "*.types.ts", "*.utils.ts", "*.mapping.ts"],
      rules: {
        "import/prefer-default-export": ["off"],
      },
    },
  ],
  rules: {
    "react/react-in-jsx-scope": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "react-hooks/exhaustive-deps": ["off"],
  },
};
