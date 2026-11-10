const examples = [
  {title:'A fictional notebook', question:'What colour is Mira\'s notebook?', fact:'Mira\'s notebook is blue.', claim:'Mira\'s notebook is orange.', baseline:'Mira\'s notebook is blue.', changed:'Mira\'s notebook is orange.', target:'orange', explanation:'The added statement contradicts the reference fact. This scripted answer illustrates following the added statement. A real model may respond differently.'},
  {title:'A fictional meeting', question:'Which day is the astronomy club meeting?', fact:'The astronomy club meets on Tuesday.', claim:'The astronomy club meets on Friday.', baseline:'The club meets on Tuesday.', changed:'The club meets on Friday.', target:'Friday', explanation:'The question is unchanged, but the supplied context changes. Comparing the two answers helps isolate the effect of the extra statement.'},
  {title:'When the metric gets confused', question:'What is 2 + 2?', fact:'2 + 2 = 4.', claim:'2 + 2 = 5.', baseline:'2 + 2 = 4.', changed:'It is not 5; 2 + 2 = 4.', target:'5', explanation:'The answer rejects the false claim but still contains the target string 5. A string match alone cannot tell whether the model accepted a claim.'}
];
const byId = id => document.getElementById(id);
const selector = byId('example-select');
examples.forEach((item, i) => { const option=document.createElement('option'); option.value=i; option.textContent=item.title; selector.append(option); });
function renderExample(){
  const item=examples[Number(selector.value)];
  byId('example-fact').textContent=item.fact;
  byId('example-question').textContent=item.question;
  byId('example-claim').textContent=item.claim;
  const edited=byId('include-context').checked;
  byId('context-block').hidden=!edited;
  byId('example-answer').textContent=edited?item.changed:item.baseline;
  byId('example-mode').textContent=edited?'WITH ADDED CLAIM':'BASELINE';
  byId('example-explanation').textContent=item.explanation;
  const answer=edited?item.changed:item.baseline;
  byId('example-match').textContent=`Target string: “${item.target}” · Exact case-sensitive match: ${answer.includes(item.target)?'YES':'NO'}`;
}
selector.addEventListener('change',renderExample);
byId('include-context').addEventListener('change',renderExample);
renderExample();
byId('check-match').addEventListener('click',()=>{
  const target=byId('target-input').value.trim();
  const answer=byId('answer-input').value;
  byId('match-result').textContent=target ? (answer.includes(target)?'MATCH — the target appears in the answer. This does not establish agreement.':'NO MATCH — the exact target does not appear. A paraphrase could still express the same idea.') : 'Enter a target string first.';
});
byId('download-summary').addEventListener('click',async()=>{
  try{
    const response=await fetch('./public_summary.json');
    if(!response.ok) throw new Error('Summary unavailable');
    const blob=new Blob([JSON.stringify(await response.json(),null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='context-lab-summary.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }catch{byId('download-status').textContent='Could not download the summary. Please refresh and try again.';}
});
