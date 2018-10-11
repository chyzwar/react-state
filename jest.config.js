
module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "json",
    "js",
    "jsx",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/examples/",
    "/tmp/",
  ],
  modulePathIgnorePatterns: [
    "/examples/",
    "/tmp/",
  ],
};

