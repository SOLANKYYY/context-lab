# Method and interpretation

## Research question

How do answers from a compact language model differ when an extra dataset statement precedes a question?

This project explores context-dependent behaviour. It does not train a new model or persistently change model parameters.

## Recorded setup

The saved aggregate file records Qwen2.5-0.5B-Instruct in Q4_K_M GGUF format, llama.cpp b12244, CPU execution with four threads, and seed 42. The dashboard describes a sample of 20 records from EditAttack's 100-record commonsense subset.

For each sampled record, the intended comparison has four outputs:

1. Direct question without the added statement.
2. Direct question with the added statement.
3. Reworded question without the added statement.
4. Reworded question with the added statement.

This produces 20 × 4 = 80 saved outputs. The public JSON contains aggregate counts; raw prompts and responses remain outside this repository.

## Metric

Target-string mention rate = 100 × outputs containing the target string / evaluated outputs.

The dashboard reads the saved counts directly from [public_summary.json](../public_summary.json). It does not recompute experiment metrics from raw responses.

| Question type | Baseline | Added context |
|---|---:|---:|
| Direct | 0/20 (0%) | 18/20 (90%) |
| Reworded | 2/20 (10%) | 16/20 (80%) |

These are descriptive counts for this saved run. They are not validated semantic findings.

## Why mention is not endorsement

In the educational arithmetic example, the target is `5` and the answer is:

> It is not 5; 2 + 2 = 4.

The browser's case-sensitive substring checker detects `5`, although the sentence rejects it. Conversely, a paraphrase may convey an idea without using the exact target text.

The browser exercise illustrates this limitation; it is not a replacement for auditing the offline scoring implementation.

## Evidence boundaries

- The interactive answers are authored examples, not model responses.
- One small model and 20 records cannot establish a general effect across LLMs.
- Prompt formatting requires audit before final interpretation; the recorded generation protocol has not been validated as a faithful reproduction of the source paper.
- Dataset labels require source checking.
- No human semantic annotation or reviewer-agreement result has been completed.
- This repository contains presentation assets, not enough artifacts to reproduce the generation run independently.
- No causal harm conclusion, significance test, or benchmark comparison is claimed.

## Work required for final research reporting

1. Audit the model's chat template and eliminate any duplicated template wrapping; rerun affected comparisons if needed.
2. Freeze and document the exact sampled records, preprocessing, prompts, model file version, runtime, and decoding settings.
3. Review dataset statements against reliable sources.
4. Independently label whether each output endorses, rejects, or does not resolve the claim, then reconcile disagreements.
5. Recompute validated metrics and update the JSON, report tables, and figures together.
6. Retain raw logs and scripts as evidence for faculty review.

These are pending checks, not claims of completed work.

## Sources

- [Allocated paper](https://arxiv.org/abs/2407.20224v4)
- [Authors' dataset and code](https://github.com/baixianghuang/editing-attack)
