import {
  green,
  italic,
  red,
  yellow,
} from "https://deno.land/std@0.80.0/fmt/colors.ts";

export const statics = [
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
  "constructor",
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
  "this",
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

// Implements formatting for keywords.
export function print(keyword: string): string {
  if (italics.includes(keyword)) {
    keyword = italic(keyword);
  }
  if (statics.includes(keyword)) {
    return red(keyword);
  } else if (types.includes(keyword)) {
    return yellow(keyword);
  } else if (expt.includes(keyword)) {
    return green(keyword);
  }
  return keyword;
}

const italics = ["Deno"];
const types = ["module", "string", "any", "number"];
const expt = ["constructor", "true", "false"];
