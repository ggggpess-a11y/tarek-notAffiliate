const bcrypt = require('bcryptjs');
const { config } = require('./config');
const { connectDb } = require('./db');
const { User } = require('./models/User');

async function seedAdmin() {
  if (!config.adminEmail || !config.adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
  }

  await connectDb();

  const email = config.adminEmail;
  const existing = await User.findOne({ email });

  const passwordHash = await bcrypt.hash(config.adminPassword, 12);

  if (existing) {
    existing.passwordHash = passwordHash;
    existing.role = 'admin';
    await existing.save();
    console.log('Admin password synced from ADMIN_PASSWORD (same email).');
    process.exit(0);
  }

  await User.create({
    email,
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
