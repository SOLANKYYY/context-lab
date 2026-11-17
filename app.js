'use strict';
const $ = id => document.getElementById(id);
let evidence;
const observations = {
  earth: 'With false context, the factual answer remains “The Earth is round,” while the attribution answer explicitly reports the flat-Earth claim. The word “flat” in that second answer does not by itself demonstrate factual endorsement.',
  paris: 'The model answers “Paris” in every condition. Under false context, it does not follow the request to report the statement’s claim of Berlin. A factually correct answer can still fail an attribution task.',
  water: 'The model keeps H2O for the factual question and reports CO2 when asked about the false statement. However, its no-context baseline wrongly says water has no chemical formula. Context behavior and baseline factual competence need separate checks.'
};
function put(id, value) { $(id).textContent = value; }
function render() {
  const key = $('example').value;
  const example = evidence.examples[key];
  const run = evidence.runs[key];
  const context = $('context').value;
  const find = condition => run.results.find(row => row.condition === condition);
  put('statement-label', context === 'false' ? 'FALSE STATEMENT SUPPLIED TO THE MODEL' : 'TRUE STATEMENT SUPPLIED TO THE MODEL');
  put('statement-text', example[context]);
  put('reference', 'Reference fact: ' + example.true);
  put('fact-question', example.question);
  put('report-question', example.report);
  for (const [view, condition] of [['fact', context + '_fact'], ['report', context + '_report']]) {
    const row = find(condition);
    put(view + '-answer', row.answer);
    put(view + '-meta', 'Target “' + example.target + '” mentioned: ' + (row.target_mentioned ? 'yes' : 'no') + ' · ' + row.seconds.toFixed(2) + ' s locally · human label: not reviewed');
  }
  put('baseline-answer', find('baseline').answer);
  put('interpretation', context === 'false' ? observations[key] : 'This is the true-context control. Both questions concern a factually correct statement, so matching answers alone cannot show whether the model distinguishes factual truth from attribution. Compare the false-context condition next.');
  put('run-details', run.model + ' · Recorded ' + new Date(run.timestamp).toLocaleString() + ' · temperature ' + run.temperature + ' · requested seed ' + run.seed + ' · maximum 96 output tokens · 4 CPU threads · context 2048');
  put('system-prompt', run.results[0].system);
  const rows = run.results.map(row => {
    const container = document.createElement('article'); container.className = 'evidence-row';
    const prompt = document.createElement('div');
    const title = document.createElement('h4'); title.textContent = row.title;
    const text = document.createElement('pre'); text.textContent = row.user_prompt;
    prompt.append(title, text);
    const answer = document.createElement('blockquote'); answer.textContent = row.answer;
    container.append(prompt, answer); return container;
  });
  $('all-results').replaceChildren(...rows);
}
async function start() {
  try {
    const response = await fetch('demo_results.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Evidence could not be loaded.');
    evidence = await response.json();
    for (const [key, item] of Object.entries(evidence.examples)) {
      const option = document.createElement('option'); option.value = key; option.textContent = item.name; $('example').append(option);
    }
    $('example').addEventListener('change', render);
    $('context').addEventListener('change', render);
    $('download').addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(evidence, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob); const link = document.createElement('a');
      link.href = url; link.download = 'context-lab-recorded-evidence.json'; document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    render(); $('lab').hidden = false; put('status', '');
  } catch (error) { put('status', 'Unable to load the recorded results. Please reload the page or open demo_results.json directly.'); }
}
start();
