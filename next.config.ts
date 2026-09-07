import type { NextConfig } from "next";

// Set this to your GitHub repo name when deploying to GitHub Pages as a
// project site (https://<username>.github.io/<repo-name>/). Leave empty for
// local dev, Vercel, or a custom domain / user-site (<username>.github.io).
const repoName = "ds-placement-coach";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export", // produce static HTML in /out — no Node server needed
  images: { unoptimized: true }, // next/image optimization needs a server; disable for static export
  basePath: isGithubActions ? `/${repoName}` : "",
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
  env: {
    // read client-side via lib/base-path.ts to prefix fetch() URLs (public/
    // assets aren't auto-rewritten the way <Image>/<Link> are)
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? `/${repoName}` : "",
  },
};

export default nextConfig;
