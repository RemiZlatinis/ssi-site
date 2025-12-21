/**
 * Documentation Registry
 *
 * This file declares all documentation sources consumed by the SSI Website.
 * It is a static manifest and must not contain fetching, parsing, or rendering logic.
 *
 * Any change to an entry may affect public URLs and must be treated as a breaking change.
 */

export interface DocsSource {
  /** Stable, URL-safe identifier (used in routes) */
  id: string;

  /** Human-readable name shown in UI */
  title: string;

  /** Sort order in navigation */
  order: number;

  /** GitHub repository owner */
  owner: string;

  /** GitHub repository name */
  repo: string;

  /** Branch to fetch documentation from */
  branch: string;

  /** Path to docs directory inside the repository */
  docsPath: string;

  /** Whether this source is currently exposed */
  enabled: boolean;
}

export const docsRegistry: DocsSource[] = [
  {
    id: "agent",
    title: "SSI Agent",
    order: 1,
    owner: "RemiZlatinis",
    repo: "ssi-agent",
    branch: "main",
    docsPath: "docs",
    enabled: true,
  },
];
