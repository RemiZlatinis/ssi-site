# SSI Site

> The official website of the Service Status Indicator (SSI) monitoring system, built with Next.js.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> **Tip:** if you're setting up the whole SSI ecosystem (agent, backend, clients) rather than just this repo, use the [workspace setup script](https://github.com/RemiZlatinis/ssi) in the metarepository instead — it clones and bootstraps all components for you.

## 📖 Overview

The **SSI Site** is the product-facing website and documentation portal for SSI. It is **not** a content authoring system: all documentation is sourced externally from the SSI component repositories and fetched at build time.

The site serves two purposes:

- **Product presentation**: a marketing landing page (hero, features, agent installation section, client mockups) that presents SSI as a product.
- **Documentation portal**: a `/docs` section that fetches Markdown directly from the `ssi`, `ssi-agent`, and `ssi-backend` repositories and renders it with syntax highlighting, tables, and diagrams.

The site must **never become the owner of the documentation content** — it only consumes and renders it.

## ✨ Key Features

- **Product Landing Page**: Hero, features, agent installation walkthrough, code comparisons, and client mockups.
- **Docs Portal**: `/docs` renders Markdown fetched at build time from the component repos, with syntax highlighting, Mermaid diagrams, and a sidebar navigation.
- **Documentation Registry**: a single source of truth (`lib/docs/registry.ts`) declares which repos, branches, and paths supply documentation.
- **Support & Legal Pages**: `/support`, `/privacy-policy`, `/terms-of-service`.
- **Local Docs Mode**: in development, set `USE_LOCAL_DOCS=true` to read from your local sibling checkouts instead of GitHub.

## 🚀 Getting Started

### Prerequisites

- **Bun**: the runtime and package manager — Node.js, `npm`, `pnpm`, and `yarn` are not used

### Installation

```bash
git clone https://github.com/RemiZlatinis/ssi-site.git
cd ssi-site
bun install
```

### Running the Dev Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Development

### Scripts

| Command | Purpose |
|---|---|
| `bun dev` | Start the development server |
| `bun run build` | Production build |
| `bun run start` | Serve the production build |
| `bun run lint` | ESLint |

### Architecture Notes for Contributors

The documentation pipeline is intentionally layered:

```
lib/docs/registry.ts      → which repos/branches/paths supply docs
lib/docs/manifest.ts      → shape of each repo's manifest.json
lib/docs/fetchDocsRawFile.ts → fetch (or read locally in dev)
app/docs/[sourceId]/...   → route + rendering
```

- **Registry over hardcoding**: repository URLs must come from `lib/docs/registry.ts`, never from page components.
- **Ingestion ≠ rendering**: fetching, parsing, and presentation stay in separate modules.
- **Build-time (SSG)**: docs are fetched during the build; avoid runtime fetching unless justified.
- **Local development**: with `USE_LOCAL_DOCS=true` and sibling checkouts, the site reads docs from disk — useful for testing doc changes before they land on GitHub.
- **Naming conventions**: `app/` holds routes and page composition only; `lib/` holds ingestion/registry logic; `components/` holds presentational UI.

See [AGENTS.md](./AGENTS.md) for the full architectural contract, ownership rules, and change policy.

## 📚 Documentation

- [**AGENTS.md**](./AGENTS.md) - Architectural contract, ownership rules, and contribution policy for this repository.
- [**SSI-Overview.md**](./SSI-Overview.md) - The SSI concept in detail.
- [**SSI Metarepository**](https://github.com/RemiZlatinis/ssi) - High-level overview, architecture, and ecosystem docs.

## 🤝 Contributing

We welcome contributions! Please read the [Contributing Guidelines](https://github.com/RemiZlatinis/ssi/blob/main/CONTRIBUTING.md) in the SSI Metarepository.

**Before submitting a PR, ensure:**

1. Changes follow the ownership rules in AGENTS.md (ingestion, rendering, and presentation stay decoupled)
2. Your feature branch is based on `main`
3. Commit messages follow conventional commit format
4. `bun run lint` passes

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.