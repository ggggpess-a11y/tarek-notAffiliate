import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fontsPath = join(root, 'css', 'fonts.css');
const stylesPath = join(root, 'css', 'styles.css');

const fonts = readFileSync(join(root, 'css', 'fonts-local.css'), 'utf8');
const tailwind = readFileSync(join(root, 'css', 'tailwind.css'), 'utf8');
const quiz = readFileSync(join(root, 'src', 'styles', 'earnings-quiz.css'), 'utf8');

writeFileSync(
  join(root, 'css', 'earnings-quiz.css'),
  `/* تلقائي — npm run build:bundle — من src/styles/earnings-quiz.css */\n${quiz}\n`
);
writeFileSync(
  fontsPath,
  `/* تلقائي — npm run build:bundle — خطوط فقط (تحميل غير معيق للعرض من index.html) */\n${fonts}\n`
);
writeFileSync(
  stylesPath,
  `/* تلقائي — npm run build:bundle — واجهة (Tailwind + كويز) بدون @font-face */\n${tailwind}\n${quiz}\n`
);
