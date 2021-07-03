const { createServer } = require("vite");

(async () => {
  try {
    const viteDevServer = await createServer({
      configFile: "client/vite.config.js",
      server: {
        port: 1234,
      },
    });
    await viteDevServer.listen();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
