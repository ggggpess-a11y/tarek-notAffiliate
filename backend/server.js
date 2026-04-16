const { app } = require('./src/app');
const { config } = require('./src/config');
const { connectDb } = require('./src/db');

async function start() {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is required');
  }

  await connectDb();
  const host = process.env.LISTEN_HOST || '0.0.0.0';
  app.listen(config.port, host, () => {
    console.log(`API listening on http://${host}:${config.port}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
