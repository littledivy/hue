import {
  green,
  italic,
  red,
  yellow,
} from "https://deno.land/std@0.80.0/fmt/colors.ts";

export const statics = [
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

// Implements formatting for keywords.
export function print(keyword: string): string {
  let fmt = keyword;
  
  if (statics.includes(keyword)) {
    fmt = red(keyword);
  } else if (types.includes(keyword)) {
    fmt = yellow(keyword);
  } else if (expt.includes(keyword)) {
    fmt = green(keyword);
  }
  if (italics.includes(keyword)) {
    fmt = italic(fmt);
  }
  return fmt;
}

const italics = ["go"];
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
