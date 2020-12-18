import { color, ConsoleTheme } from "../../themes/mod.ts";
import { italic } from "https://deno.land/std@0.80.0/fmt/colors.ts";

export const keywords = [
  "abstract",
  "as",
  "asserts",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "declare",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "finally",
  "for",
  "from",
  "function",
  "get",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "is",
  "keyof",
  "let",
  "namespace",
  "new",
  "null",
  "of",
  "package",
  "private",
  "protected",
  "public",
  "readonly",
  "return",
  "require",
  "set",
  "static",
  "super",
  "switch",
  "throw",
  "try",
  "type",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "with",
  "yield",
];

export class Printer {
  theme: ConsoleTheme;
  constructor(theme: ConsoleTheme) {
    this.theme = theme;
  }

  print(keyword: string): string {
    let fmt = keyword;

    if (keywords.includes(keyword)) {
      fmt = color(this.theme.identifiers, keyword);
    } else if (types.includes(keyword)) {
      fmt = color(this.theme.types, keyword);
    } else if (expt.includes(keyword)) {
      fmt = color(this.theme.reserved_methods, keyword);
    }
    if (globals.includes(keyword)) {
      fmt = italic(fmt);
    }
    return fmt;
  }
}

const globals = ["Deno", "process", "window", "globalThis", "this"];
const types = ["module", "string", "any", "number", "this"];
const expt = ["constructor", "true", "false"];
