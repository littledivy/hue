import { italic } from "https://deno.land/std@0.80.0/fmt/colors.ts";
import { color, ConsoleTheme, markup, MarkupTheme } from "../../themes/mod.ts";
import { Options } from "./golang.ts";

export const keywords = [
  "break",
  "default",
  "func",
  "interface",
  "select",
  "case",
  "defer",
  "map",
  "struct",
  "chan",
  "else",
  "goto",
  "package",
  "switch",
  "const",
  "fallthrough",
  "if",
  "range",
  "type",
  "continue",
  "for",
  "import",
  "return",
  "var",
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

const globals = ["go"];
const types = [
  "float",
  "append",
  "bool",
  "byte",
  "cap",
  "close",
  "complex",
  "complex64",
  "complex128",
  "uint16",
  "copy",
  "false",
  "float32",
  "float64",
  "imag",
  "int",
  "int8",
  "int16",
  "uint32",
  "int32",
  "int64",
  "iota",
  "len",
  "make",
  "new",
  // "nil",
  "panic",
  "uint64",
  "print",
  "println",
  "real",
  "recover",
  "string",
  "true",
  "uint",
  "uint8",
  "uintptr",
];
const expt = ["nil", , "true", "false", "go"];
