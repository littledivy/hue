import { Lexer } from "./lexer.ts";
import {Literals} from "./lexer/tokens.ts";

import { gray, green, red, yellow } from "https://deno.land/std/fmt/colors.ts";

const red_keywords = [
  "abstract",  "as",      "asserts",     "async",
  "await",     "break",   "case",        "catch",
  "class",    "const",   "constructor", "continue",
  "debugger",  "declare", "default",     "delete",
  "do",        "else",    "enum",        "export",
  "extends",  "finally", "for",         "from",
  "function",  "get",     "if",          "implements",
  "import",    "in",      "instanceof", "interface",
  "is",        "keyof",   "let",
  "namespace", "new",    "null",         "of",
  "package",   "private", "protected",   "public",
  "readonly",  "return",  "require",     "set",
  "static",    "super",   "switch",      "this",
  "throw",     "try",     "type",        "typeof",
  "undefined", "var",     "void",        "while",
  "with",      "yield"
]

const yellow_keywords = ["module", "string", "any", "number"]
const green_keywords = ["constructor", "true", "false"]
const encoder = new TextEncoder()
const eof = encoder.encode("\n")
export default async function TS(code: string) {

let lexer = new Lexer(code);

loop: for (;;) {
  let tok = lexer.next_token();
  
  let val = tok.value;
  switch(tok.type) {
    case Literals.Eof:
      await Deno.stdout.write(eof)
      break loop;
    break;
    case Literals.Int:
      val = yellow(tok.value)
    break;
    case Literals.String:
      val = green(String(tok.value));
    break;
    case Literals.Slash:
      if(lexer.next_token(true).value == "/") {
        let skipped = lexer.skip_until("\n") || "";
        let v = "/" + skipped
        val = gray(v)
        break;
      }
    break;
    default:
      if(red_keywords.includes(tok.value)) val = red(tok.value)
      else if(yellow_keywords.includes(tok.value)) val = yellow(tok.value)
      else if(green_keywords.includes(tok.value)) val = green(tok.value)
      else val = tok.value;
      function l() {
        if(lexer.input[lexer.next_pos - 1] == ".") {
          lexer.read_char()
          let skipped = lexer.skip_ident() || "";
          val += "." + green(skipped)
          l()
         } else {
           return
         }
      }
      l()
    break;
  }
  await Deno.stdout.write(encoder.encode(val))
}
}

await TS(Deno.readTextFileSync("fixtures/ts.ts"));
