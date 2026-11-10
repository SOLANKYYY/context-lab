# Vercel deployment

## Import the repository

1. Sign in to [Vercel](https://vercel.com/new) with the GitHub account that can access **SOLANKYYY/context-lab**.
2. Import that repository as a new project.
3. Keep the project rooted at the top level of the repository.
4. Use **Other** for the framework, **npm run build** for the build command, and **dist** for the output directory.
5. Leave environment variables empty and deploy.

The build and output directory are already specified in [vercel.json](../vercel.json). The app does not need a database, model weights, or inference credentials.

See [Vercel's official GitHub integration guide](https://vercel.com/docs/git/vercel-for-github) for the import and automatic deployment workflow.

## Verify before sharing

- Open the production URL Vercel assigns to the deployment.
- Test the example selector and added-claim toggle.
- Check the custom target-string exercise.
- Confirm that the charts load and the summary download works.
- Open the URL in a signed-out or private browser window to confirm your faculty can access it.
- Add the verified production URL to the README after deployment.

No production URL has been verified in this repository's documentation.

## Updating the site

For a standard Git-connected project, pushes to the configured production branch trigger a new deployment. This repository uses `main` for its published files. Check the Vercel project's Git settings and deployment status when confirming an update.

## Troubleshooting

| Symptom | What to check |
|---|---|
| Build command cannot find package.json | Root Directory must be the repository root. |
| Build succeeds but the site is missing | Output Directory must be dist. |
| Charts show a loading error | Confirm public_summary.json was included in the output; inspect the browser's network errors. |
| Old content is visible | Check the latest production deployment commit and refresh the page. |
| Local page opens but charts do not load | Serve dist with an HTTP server instead of opening index.html directly. |
| A visitor sees a sign-in screen | Review project deployment-protection settings and share the intended public production URL. |

The public site is static. A deployment cannot turn the scripted examples into live model inference; that would require a separately implemented inference service.
