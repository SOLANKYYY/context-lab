import { mkdir, copyFile, readFile } from 'node:fs/promises';
const root = new URL('./', import.meta.url);
const output = new URL('./dist/', root);
const summary = JSON.parse(await readFile(new URL('public_summary.json', root), 'utf8'));
if (!summary.metrics?.direct || !summary.metrics?.paraphrase) throw new Error('Missing experiment groups');
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js', 'examples.js', 'public_summary.json']) {
  await copyFile(new URL(file, root), new URL(file, output));
}
console.log('Built Context Lab into dist/');
