export interface DocsManifest {
  version: number;
  title: string;
  sections: DocsSection[];
}

export interface DocsSection {
  id: string;
  title: string;
  order: number;
  pages: DocsPage[];
}

export interface DocsPage {
  id: string;
  title: string;
  file: string;
  order: number;
}
