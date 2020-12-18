import {
  green,
  italic,
  red,
  yellow,
} from "https://deno.land/std@0.80.0/fmt/colors.ts";
import { color, ConsoleTheme } from "../../themes/mod.ts";

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
