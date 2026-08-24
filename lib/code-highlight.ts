import { codeToHtml, bundledThemes } from "shiki";
import type { ThemeRegistration } from "shiki";

const themeCache = new Map<string, ThemeRegistration>();

async function getSsiTheme(commentColor: string): Promise<ThemeRegistration> {
  const cached = themeCache.get(commentColor);
  if (cached) return cached;

  const load = bundledThemes["dark-plus"];
  if (!load) {
    throw new Error("dark-plus theme not found in shiki bundle");
  }
  const base = (await load()).default;
  const theme: ThemeRegistration = {
    ...base,
    settings: (base.settings ?? []).map((setting) => {
      const scopes = Array.isArray(setting.scope)
        ? setting.scope
        : [setting.scope];
      const isComment = scopes.some(
        (scope) => typeof scope === "string" && scope.startsWith("comment"),
      );
      return isComment
        ? {
            ...setting,
            settings: { ...setting.settings, foreground: commentColor },
          }
        : setting;
    }),
  };
  themeCache.set(commentColor, theme);
  return theme;
}

const plaintextAliases = new Set(["log", "text", "txt", "plain", "plaintext"]);

export async function highlightCode(
  code: string,
  language: string,
  options: { commentColor?: string } = {},
): Promise<string> {
  const theme = await getSsiTheme(options.commentColor ?? "#a1a1aa");
  const lang = plaintextAliases.has(language) ? "plaintext" : language;

  try {
    return await codeToHtml(code, { lang, theme });
  } catch {
    return codeToHtml(code, { lang: "plaintext", theme });
  }
}
