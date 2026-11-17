# Existing Vercel deployment

Public site: https://context-lab-ashen.vercel.app
Repository: https://github.com/SOLANKYYY/context-lab
Project: context-lab
Production branch: main

The project uses a dependency-free static build:
- Node.js: 24.x.
- Framework preset: Other.
- Build command: npm run build.
- Output directory: site-dist.
- No environment variables, model downloads, or inference server.

Run npm run check and npm run build before publishing. The build includes only index.html, style.css, app.js, and demo_results.json. Old local dist folders and model data are not deployed.

Push a reviewed commit to main to trigger the Git integration, then check the deployment status. A Git deployment can also be triggered explicitly against the exact commit in the existing project. Verify the production domain after the deployment is READY.

The online interface replays a recorded snapshot. New local model generations do not automatically become public: export a reviewed, sanitized demo_results.json and redeploy it.
