import { color, ConsoleTheme, markup, MarkupTheme } from "../../themes/mod.ts";
import { italic } from "https://deno.land/std@0.80.0/fmt/colors.ts";
import { Options } from "./typescript.ts";

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
  theme: ConsoleTheme | MarkupTheme;
  is_console: boolean;
  constructor(theme: ConsoleTheme | MarkupTheme, options: Options) {
    this.theme = theme;
    this.is_console = options.output == "console";
  }

  print(keyword: string): string {
    return this.is_console
      ? this.print_console(keyword)
      : this.print_markup(keyword);
  }

  print_console(keyword: string): string {
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

  print_markup(keyword: string): string {
    if (keyword == "\n") return "<br>";
    let fmt = markup("", keyword);

    if (keywords.includes(keyword)) {
      fmt = markup(this.theme.identifiers, keyword);
    } else if (types.includes(keyword)) {
      fmt = markup(this.theme.types, keyword);
    } else if (expt.includes(keyword)) {
      fmt = markup(this.theme.reserved_methods, keyword);
    }
    return fmt;
  }

  print_comments(str: string): string {
    return this.is_console
      ? color(this.theme.comments, str)
      : markup(this.theme.comments, str);
  }

  print_chain(str: string): string {
    return this.is_console
      ? color(this.theme.reserved_methods, str)
      : markup(this.theme.reserved_methods, str);
  }

  print_numbers(str: string): string {
    return this.is_console
      ? color(this.theme.numbers, str)
      : markup(this.theme.numbers, str);
  }

  print_operators(str: string): string {
    return this.is_console
      ? color(this.theme.operators, str)
      : markup(this.theme.operators, str);
  }
  print_string(str: string): string {
    return this.is_console
      ? color(this.theme.string, str)
      : markup(this.theme.string, str);
  }
}

const globals = ["Deno", "process", "window", "globalThis", "this"];
const types = ["module", "string", "any", "number", "this"];
const expt = ["constructor", "true", "false"];
