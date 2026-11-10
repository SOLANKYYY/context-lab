# Context Lab
### Exploring how added context changes a small language model's answers

A CSE-AIML-B team project based on **[Can Editing LLMs Inject Harm?](https://arxiv.org/abs/2407.20224v4)** by Chen et al. This repository contains an interactive web demonstration and a dashboard of saved, preliminary experiment statistics.

**[Deployment guide](docs/DEPLOYMENT.md) · [Method and limitations](docs/METHODOLOGY.md) · [Faculty demonstration guide](docs/FACULTY_DEMO.md)**

> **Current scope:** The website displays saved results and clearly labelled scripted examples. It does not run a language model in the browser or on Vercel. The experiment counts are preliminary and require protocol and semantic review before final research conclusions.

## Project idea

Can an additional misleading statement influence a model's answer to the same question? The local study compares answers with and without added context, then repeats the comparison using reworded questions.

The goal is to make the experiment understandable on a low-storage computer. A compact, quantized model was used for local generation; the public website contains only lightweight presentation assets. No model weights are edited by the website.

## What you can try

| Feature | What it demonstrates |
|---|---|
| Three selectable examples | A fictional notebook, a fictional meeting, and an arithmetic counterexample |
| Added-claim toggle | How a supplied claim can change an illustrative answer |
| Exact-match exercise | Why mentioning a target does not necessarily mean agreeing with it |
| Results charts | Saved baseline and added-context mention counts |
| Summary download | The JSON values used by the dashboard |
| Responsive layout | A demonstration suitable for desktop and mobile screens |

The examples are authored teaching material, not additional model generations. Text entered in the matching exercise is checked locally in the browser.

## Saved preliminary results

Source: [public_summary.json](public_summary.json). Each row contains 20 outputs.

| Question type | Condition | Outputs mentioning the target | Mention rate |
|---|---|---:|---:|
| Direct | Baseline | 0 / 20 | 0% |
| Direct | Added context | 18 / 20 | 90% |
| Reworded | Baseline | 2 / 20 | 10% |
| Reworded | Added context | 16 / 20 | 80% |

These are **target-string mention rates**, not accuracy, harm, or misinformation-endorsement scores. An answer can reject a claim and still mention its target. The counts alone do not establish that the model accepted misinformation.

## Model and data

| Item | Recorded setup |
|---|---|
| Model | Qwen2.5-0.5B-Instruct |
| Model format | Q4_K_M GGUF; approximately 491 MB |
| Local runtime | llama.cpp b12244, CPU, 4 threads |
| Dataset source | EditAttack commonsense subset |
| Sample | 20 records from the 100-record subset |
| Recorded seed | 42 |
| Comparisons | Direct and reworded questions, with and without added context |
| Saved generation count | 80 |

The public repository does not contain model weights, raw dataset claims, individual model responses, or the local inference pipeline. It reproduces the **web presentation**, not the full generation experiment. See [methodology](docs/METHODOLOGY.md) for the limits of the evidence.

## Team

| Role | Name | USN |
|---|---|---|
| Team Leader | Solanki Om Narendra | 24BTRCL190 |
| Team Member | Jayansh Jain | 24BTRCL088 |
| Team Member | Manashwi Shawarn | 24BTRCL116 |

**Class:** CSE-AIML-B  
**Faculty:** Divyanshu Prakash

## Run locally

Requirements: Node.js 22 or newer; Python 3 for the simple preview server.

```sh
git clone https://github.com/SOLANKYYY/context-lab.git
cd context-lab
npm run check
npm run build
python -m http.server 8000 --directory dist
```

Open **http://localhost:8000**. Stop the preview with **Ctrl+C**. The build uses Node's built-in modules and has no third-party package dependencies.

## Deploy to Vercel

Import **SOLANKYYY/context-lab** from [Vercel's new-project page](https://vercel.com/new).

| Setting | Value |
|---|---|
| Framework Preset | Other |
| Root Directory | Repository root |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment variables | None |

Build and output settings are included in [vercel.json](vercel.json). After deployment, share the production URL assigned by Vercel. No live deployment URL has been verified in this documentation.

More detail: [deployment and troubleshooting](docs/DEPLOYMENT.md).

## Repository layout

```text
context-lab/
├── index.html             # Page structure and labelled examples
├── style.css              # Responsive styles
├── app.js                 # Saved-result cards and charts
├── examples.js            # Example selector, toggle, matcher, download
├── public_summary.json    # Preliminary aggregate results
├── build.mjs              # Copies five public assets into dist/
├── package.json           # Syntax-check and build commands
├── vercel.json            # Hosting configuration
├── docs/
│   ├── METHODOLOGY.md
│   ├── FACULTY_DEMO.md
│   └── DEPLOYMENT.md
└── README.md
```

## Academic project status

The web demo is available in this repository. The Part A proposal is saved separately in the local assignment folder. Part B and C report sources are drafts; final report PDFs and a genuine plagiarism report are still pending. This website does not replace those submissions.

Before final reporting, review prompt formatting, validate dataset labels, assess model answers semantically, and document the reproducible experimental protocol. No human endorsement labels or validated final harm scores are claimed here.

## References and acknowledgements

- Chen et al., **Can Editing LLMs Inject Harm?**, arXiv:2407.20224, version 4; accepted to AAAI 2026. [Paper](https://arxiv.org/abs/2407.20224v4).
- Authors' **EditAttack** code and dataset. [Source repository](https://github.com/baixianghuang/editing-attack).
- **Qwen2.5-0.5B-Instruct-GGUF**. [Official model repository](https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF).
- **llama.cpp**. [Runtime repository](https://github.com/ggml-org/llama.cpp).

This is a student adaptation with a smaller model and a limited evaluation; it is not the authors' official implementation or a full reproduction of their findings.
