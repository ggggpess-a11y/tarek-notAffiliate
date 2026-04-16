const { app } = require('./src/app');
const { config } = require('./src/config');
const { connectDb } = require('./src/db');

async function start() {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is required');
  }

  await connectDb();
  app.listen(config.port, () => {
    console.log(`API listening on http://localhost:${config.port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
