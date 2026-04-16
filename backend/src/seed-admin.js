const bcrypt = require('bcryptjs');
const { config } = require('./config');
const { connectDb } = require('./db');
const { User } = require('./models/User');

async function seedAdmin() {
  if (!config.adminEmail || !config.adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
  }

  await connectDb();

  const existing = await User.findOne({ email: config.adminEmail.toLowerCase() });
  if (existing) {
    console.log('Admin already exists.');
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(config.adminPassword, 12);
  await User.create({
    email: config.adminEmail.toLowerCase(),
    passwordHash,
    role: 'admin',
    name: 'Main Admin',
  });

  console.log('Admin user created.');
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
