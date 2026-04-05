import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'css', 'app.css');
const parts = ['css/fonts-local.css', 'css/tailwind.css', 'css/earnings-quiz.css'].map((rel) =>
  readFileSync(join(root, rel), 'utf8')
);
writeFileSync(
  out,
  `/* تلقائي — npm run build:bundle — لا تُحرَّر يدوياً */\n${parts.join('\n')}\n`
);
