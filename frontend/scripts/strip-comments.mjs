import { globby } from 'globby';
import fs from 'fs-extra';
import path from 'path';
import postcss from 'postcss';
import discardComments from 'postcss-discard-comments';
import { parse } from '@babel/parser';
import generate from '@babel/generator';

const projectRoot = path.resolve(process.cwd());
const frontendDir = path.join(projectRoot);

const CODE_GLOBS = [
  'src/**/*.{ts,tsx,js,jsx}',
  'app/**/*.{ts,tsx,js,jsx}',
  'components/**/*.{ts,tsx,js,jsx}',
  'lib/**/*.{ts,tsx,js,jsx}',
  'features/**/*.{ts,tsx,js,jsx}',
  'hooks/**/*.{ts,tsx,js,jsx}',
  'providers/**/*.{ts,tsx,js,jsx}',
];

const STYLE_GLOBS = [
  '**/*.css',
];

const EXCLUDE = [
  '**/node_modules/**',
  '.next/**',
  '**/*.d.ts',
  'next.config.ts',
  'tailwind.config.ts',
  'postcss.config.mjs',
  'eslint.config.mjs',
];

function removeJsTsComments(source, filename) {
  const ast = parse(source, {
    sourceType: 'module',
    plugins: [
      'typescript',
      'jsx',
      'importAttributes',
      'decorators',
    ],
    allowReturnOutsideFunction: true,
    ranges: false,
    attachComment: false,
    tokens: false,
  });
  const { code } = generate.default(ast, { comments: false, compact: false, retainLines: true }, source);
  return code;
}

async function removeCssComments(source) {
  const result = await postcss([discardComments({ removeAll: true })]).process(source, { from: undefined });
  return result.css;
}

async function processFiles() {
  const codeFiles = await globby(CODE_GLOBS, { cwd: frontendDir, gitignore: true, ignore: EXCLUDE });
  const styleFiles = await globby(STYLE_GLOBS, { cwd: frontendDir, gitignore: true, ignore: EXCLUDE });

  let changedCount = 0;

  for (const relPath of codeFiles) {
    const abs = path.join(frontendDir, relPath);
    const original = await fs.readFile(abs, 'utf8');
    const stripped = removeJsTsComments(original, relPath);
    if (stripped !== original) {
      await fs.writeFile(abs, stripped, 'utf8');
      changedCount++;
    }
  }

  for (const relPath of styleFiles) {
    const abs = path.join(frontendDir, relPath);
    const original = await fs.readFile(abs, 'utf8');
    const stripped = await removeCssComments(original);
    if (stripped !== original) {
      await fs.writeFile(abs, stripped, 'utf8');
      changedCount++;
    }
  }

  console.log(`Comments removed in ${changedCount} files.`);
}

processFiles().catch((err) => {
  console.error(err);
  process.exit(1);
});


