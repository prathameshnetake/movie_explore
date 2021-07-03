const { build } = require("vite");

(async () => {
  try {
    build({ configFile: "client/vite.config.js" });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
