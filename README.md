# Context Lab
## A claim is not a fact

**[Open the public demo](https://context-lab-ashen.vercel.app)** · [Method](docs/METHODOLOGY.md) · [Faculty walkthrough](docs/FACULTY_DEMO.md) · [Deployment](docs/DEPLOYMENT.md)

A CSE-AIML-B student project inspired by [Can Editing LLMs Inject Harm?](https://arxiv.org/abs/2407.20224). Compare what a small language model answers when asked **what is true** and **what a supplied statement says**.

The website displays **15 actual saved model generations** from three teaching examples. It is a recorded experiment viewer; it does not generate new answers online.

## Explore
- Choose Earth shape, the capital of France, or the chemical formula of water.
- Switch between a true and a false statement.
- Compare factual and attribution questions side by side.
- Inspect the no-context baseline, exact prompts, system instruction, and all five conditions.
- Download the public evidence JSON, including answers, generation settings, and timestamps.

No model weights, API keys, external font libraries, or runtime dependencies are required for the website. New inference runs use the separate local Python/llama.cpp demonstration on the team's laptop.

## What we actually ran

| Setting | Value |
|---|---|
| Model | Qwen2.5-0.5B-Instruct, Q4_K_M |
| Runtime | llama.cpp b12244, completion mode, manual ChatML template |
| Examples | 3 convenience examples |
| Conditions | No-context factual; true/false context × factual/attribution |
| Saved generations | 15 (5 per example) |
| Sampling | Temperature 0 (greedy); seed 42 passed to the runtime |
| Limits | 96 output tokens, context 2048, 4 CPU threads |
| Human evaluation | Not completed |
| Weight editing | None |

The fixed system instruction explicitly asks the model to distinguish factual truth from a statement's claim. This is part of the experiment, not evidence that a defense was improved.

## Observations, including failures

- **Earth:** false context produces a factual answer of “The Earth is round.” The attribution answer reports the flat-Earth claim.
- **France:** all five answers say Paris. With a false Berlin statement, the attribution request is not followed.
- **Water:** the factual response under false context says H2O and the attribution response reports CO2. The baseline incorrectly says water has no chemical formula.

Mentioning a target string is only a lexical diagnostic. It is not a harm, accuracy, or endorsement score. Explanatory notes on the website are not independent human labels.

## Proposed extension
Separate task-following from factual endorsement when evaluating context changes. Keep a five-condition design and use two independent human reviewers. A proposed larger set of 12 reviewed examples would produce 60 outputs, but **that larger study has not been run**. This is a student evaluation extension, not a claim of a new algorithm or proven research novelty.

The paper examines model editing using ROME, fine-tuning, and an in-context editing baseline on much larger models. Our prompt-context demonstration does not reproduce those full experiments.

## Run the website
Use Node.js 24:

~~~sh
npm run check
npm run build
python -m http.server 8080 --directory site-dist
~~~

Open http://localhost:8080. Do not open index.html directly with a file URL: the browser needs HTTP to fetch the evidence JSON.

Only four files enter the public build: index.html, style.css, app.js, and demo_results.json. Build validation checks condition completeness, prompt pairing, nonempty answers, and exclusion of raw runtime logs. There are no production npm dependencies.

## Source layout
- index.html / style.css / app.js — accessible responsive experiment viewer.
- demo_results.json — public export of the real recorded runs.
- scripts/validate-demo.mjs — evidence consistency validation.
- build.mjs / vercel.json — static Vercel build.
- docs/ — method, demonstration, and deployment instructions.

Earlier files such as public_summary.json and examples.js are legacy work retained for history. They are not used or deployed by the current viewer; their old counts must not be combined with the present 15-output demonstration.

## Team
| Role | Name | USN |
|---|---|---|
| Team leader | Solanki Om Narendra | 24BTRCL190 |
| Member | Jayansh Jain | 24BTRCL088 |
| Member | Manashwi Shawarn | 24BTRCL116 |

Class: CSE-AIML-B. Faculty: Divyanshu Prakash.

## References
- [Can Editing LLMs Inject Harm?](https://arxiv.org/abs/2407.20224)
- [Qwen2.5-0.5B-Instruct](https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct)
- [Official Qwen GGUF model](https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
