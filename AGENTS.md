# SSI Website (ssi-site)

The SSI Website is a **product-facing website and documentation portal**. It is **not** a content authoring system. All documentation content is sourced externally from SSI component repositories.

This file defines the **agent-level execution contract** for this repository. It exists to ensure architectural integrity, operational correctness, and long-term maintainability. Any contribution that violates the rules below is considered incorrect, even if it appears to work.

---

## 1. Scope

The SSI Website exists to:

- Present **Service Status Indicator (SSI)** as a product
- Provide **centralized, navigable documentation**
- Consume and render documentation **directly from source repositories**
- Act as a **read-only documentation aggregator**
- Maintain a strict separation between:

  - Product presentation
  - Documentation ingestion
  - UI rendering

The website **must never become the owner of the documentation content**.

---

## 2. Documentation Source Model (Critical)

### Source of Truth

All documentation must live inside the `/docs` directory of each SSI component repository, for example:

- `ssi-agent/docs/`
- `ssi-backend/docs/`
- `ssi-client-mobile/docs/`

This repository **only consumes documentation**. It must never duplicate, edit, or locally persist documentation content beyond transient build artifacts.

---

### Documentation Ingestion Rules

Agents must follow these rules:

- Documentation is fetched:

  - From GitHub repositories
  - Using raw content URLs or GitHub APIs

- GitHub HTML pages (`/tree/`, `/blob/`) must **never** be scraped

- Documentation ingestion must be:

  - Deterministic
  - Repeatable
  - Cacheable

- Fetching logic must be:

  - Centralized
  - Reusable
  - Independent of UI rendering

---

### Fetch Timing

Preferred ingestion model:

- **Build-time (SSG)**

Incremental Static Regeneration (ISR) may be introduced only with explicit justification. Runtime fetching should be avoided unless no viable alternative exists.

---

## 3. Documentation Registry (Required — Not Implemented Yet)

This project must define a **central documentation registry** that:

- Declares all documentation sources
- Defines display names and ordering
- Declares repository owner, name, branch, and docs path
- Acts as the **single point of truth** for documentation configuration

Agents **must never hardcode repository URLs directly into page components or rendering logic**.

Until implemented, no ad-hoc alternatives or partial registries are permitted.

---

## 4. Markdown & Rendering Rules

- Markdown (or MDX) is the canonical documentation format

- Rendering must support:

  - Headings
  - Code blocks
  - Tables
  - Links
  - Admonitions / callouts

- Syntax highlighting must be:

  - Deterministic
  - Theme-aware

- Rendering logic must be:

  - Centralized
  - Reusable across all documentation pages

If MDX is used, it must be treated strictly as **rendered content**, not as executable application logic.

---

## 5. Technology Stack (Authoritative)

### Core Framework

- **Next.js**
- **React**
- The App Router is preferred unless explicitly justified otherwise

---

### Package Manager

- **Bun** is mandatory
- `npm`, `pnpm`, and `yarn` must not be introduced
- All scripts and tooling must be compatible with Bun

---

### UI Layer

- **Chakra UI** is the primary UI framework
- Chakra’s theme system must be used consistently

UI decisions must favor:

- Readability
- Accessibility
- Documentation-first layouts

---

## 6. Build & Run (Authoritative Commands)

Agents must use the following commands when working with this repository:

- Install dependencies: `bun install`
- Run local development server: `bun dev`
- Build for production: `bun run build`
- Start production server: `bun run start`

All other scripts must be thin wrappers around these core commands.

---

## 7. Architecture Overview (Agent-Focused)

At a high level, the SSI Website operates as follows:

- Documentation sources are declared in a central registry
- During build time, documentation is fetched from source repositories
- Raw Markdown/MDX is parsed and transformed into renderable content
- Pages and navigation are generated deterministically
- UI components render the processed content without embedding ingestion logic

Ingestion, parsing, rendering, and presentation must remain strictly decoupled.

---

## 8. Project Layout & Ownership Rules

The following ownership rules apply:

- `app/` → Next.js routes and page composition only
- `lib/` → Documentation ingestion, fetching, parsing, and registries
- `components/` → Presentational UI components only
- `theme/` or `styles/` → Chakra UI theme configuration and design tokens

Business logic must not live inside route components. UI components must not perform data ingestion.

---

## 9. Architectural Principles

Agents must adhere to the following principles:

- **Separation of concerns**

  - Ingestion ≠ Rendering ≠ Presentation

- **Configuration over convention**
- **Explicit over implicit**
- **Static over dynamic**, unless dynamics are required
- **Predictable, reproducible builds**

No logic may exist solely “because it was easy”.

---

## 10. Naming & Structure Conventions

- Documentation-related logic must live in clearly named modules
- Fetching, parsing, and rendering responsibilities must not be mixed
- Files and folders must be named descriptively and consistently
- “Temporary” solutions are not acceptable unless explicitly marked and justified

---

## 11. Security & Access Constraints

- This repository must not store or persist secrets
- GitHub access tokens, if required, must be:

  - Server-side only
  - Provided via environment variables

- No credentials may be embedded in client-side bundles
- Documentation sources are assumed to be public unless explicitly stated otherwise

---

## 12. Product Perspective

This website represents SSI publicly.

Therefore:

- Accuracy > speed
- Clarity > cleverness
- Stability > experimentation

If a design decision introduces ambiguity, hidden coupling, or undocumented behavior, it is incorrect.

---

## 13. Agent Conduct Rules

When contributing, agents must:

- Assume long-term maintainability
- Avoid speculative features
- Avoid overengineering
- Avoid shortcuts that weaken architecture
- Stop and request clarification when requirements are ambiguous

Guessing is considered a failure mode.

---

## 14. Change Policy

Any change that affects:

- Documentation ingestion
- Source registry
- Rendering pipeline
- Public structure or URLs

Must be:

- Explicitly documented
- Justified in context
- Implemented in a way that preserves backward compatibility whenever possible
