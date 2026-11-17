import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const raw = await readFile(new URL('../demo_results.json', import.meta.url), 'utf8');
const data = JSON.parse(raw);
assert.equal(data.mode, 'recorded_local_generations');
assert.deepEqual(Object.keys(data.examples).sort(), ['earth', 'paris', 'water']);
assert.deepEqual(Object.keys(data.runs).sort(), ['earth', 'paris', 'water']);
const conditions = ['baseline', 'true_fact', 'false_fact', 'true_report', 'false_report'];
for (const [key, run] of Object.entries(data.runs)) {
  const example = data.examples[key];
  assert.equal(run.example, key);
  assert.equal(run.results.length, 5);
  assert.equal(new Set(run.results.map(row => row.condition)).size, 5);
  assert.ok(Number.isFinite(Date.parse(run.timestamp)));
  for (const row of run.results) {
    assert.ok(conditions.includes(row.condition));
    assert.ok(row.answer.trim().length > 0);
    assert.equal(row.human_label, 'not reviewed');
    assert.ok(row.seconds > 0);
    assert.equal(row.target_mentioned, row.answer.toLowerCase().includes(example.target.toLowerCase()));
    const [truth, intent] = row.condition.split('_');
    const expected = row.condition === 'baseline'
      ? 'Question: ' + example.question
      : 'Statement: ' + example[truth] + '\nQuestion: ' + (intent === 'fact' ? example.question : example.report);
    assert.equal(row.user_prompt, expected);
    assert.equal(row.token_limit, 96);
    assert.ok(!('raw_stderr' in row));
  }
}
assert.ok(!raw.includes('C:\\Users\\'));
assert.ok(!raw.includes('raw_stderr'));
console.log('Validated 3 examples, 15 nonempty answers, prompt pairing, lexical diagnostics, and public export.');
