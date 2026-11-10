const pct=v=>`${Number(v).toFixed(0)}%`;
async function start(){const r=await fetch('./public_summary.json');const d=await r.json();const m=d.metrics;
const cards=[['RECORDS',d.n_per_group,'per comparison group'],['MODEL CALLS',d.total_generations,'real local generations'],['DIRECT · CONTEXT',pct(m.direct.ice.target_mention_rate),`${m.direct.ice.target_mention_n}/20 exact target mentions`],['PARAPHRASE · CONTEXT',pct(m.paraphrase.ice.target_mention_rate),`${m.paraphrase.ice.target_mention_n}/20 exact target mentions`]];
document.querySelector('#metrics').innerHTML=cards.map(([l,v,s])=>`<article class="metric"><div class="metric-label">${l}</div><div class="metric-value">${v}</div><div class="metric-sub">${s}</div></article>`).join('');
const rows=[['Direct questions',m.direct],['Reworded questions',m.paraphrase]];
document.querySelector('#chart').innerHTML=rows.map(([name,x])=>`<div class="bar-group"><div class="bar-label">${name}</div><div class="track"><div class="bar baseline" style="top:0;height:4px;width:${x.baseline.target_mention_rate}%"></div><div class="bar ice" style="bottom:0;height:4px;width:${x.ice.target_mention_rate}%"></div></div><div class="bar-value-end">${pct(x.ice.target_mention_rate)}</div></div><div class="bar-group"><div class="bar-label">&nbsp;</div><div class="bar-values"><span style="left:${Math.max(x.baseline.target_mention_rate,2)}%">${pct(x.baseline.target_mention_rate)}</span></div><div></div></div>`).join('');
}
start().catch(()=>document.querySelector('#metrics').textContent='Could not load experiment summary.');
