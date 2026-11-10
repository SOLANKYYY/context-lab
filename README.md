# Context Lab

A student dashboard inspired by [Can Editing LLMs Inject Harm?](https://arxiv.org/abs/2407.20224), with saved preliminary model results and interactive educational examples.

## Deploy on Vercel

1. Choose **Add New > Project** in Vercel and import **SOLANKYYY/context-lab**.
2. Use the repository root as **Root Directory** and **Other** as the framework.
3. The included configuration sets **Build Command** to `npm run build` and **Output Directory** to `dist`.
4. Click **Deploy** and share the generated URL.

No environment variables, API keys, model downloads, or paid inference service are needed. This website does not run live model inference. It displays saved experiment statistics, scripted teaching examples, and a browser-based string-match exercise.

## Local preview

With Node.js 22 or newer and Python 3:

```sh
npm run check
npm run build
python -m http.server 8000 --directory dist
```

Visit http://localhost:8000. There are no third-party build dependencies.

## Interpreting the results

The saved summary covers 20 sampled records and 80 local Qwen2.5-0.5B-Instruct generations. Exact target-string mentions are a lexical proxy, not an accuracy, endorsement, or harm score. An answer can contain the target while rejecting it.

These are preliminary automatic counts. Prompt formatting, dataset labels, and semantic interpretation require review before final research conclusions. In-context prompting leaves model weights unchanged; this is not a reproduction of all editing methods in the paper. Raw dataset claims and generated responses are not published here. The interactive examples are authored illustrations, not additional model outputs or measured findings.

## Team

Solanki Om Narendra, Jayansh Jain, and Manashwi Shawarn — CSE-AIML-B.
