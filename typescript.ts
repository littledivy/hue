import { Lexer, Literals } from "./lexer.ts";
import { green, red, yellow } from "https://deno.land/std/fmt/colors.ts";

const red_keywords = ["class", "public", "static", "interface", "export", "declare", "switch", "case", "break", "if", "else", "for", "while", "extends", "return", "const", "var", "default", "typeof", "this", "enum"]
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
    case Literals.Let:
      val = red(tok.value)
    break;
    case Literals.Int:
      val = yellow(tok.value)
    break;
    case Literals.String:
      val = green(String(tok.value));
    break;
    default:
      if(red_keywords.includes(tok.value)) val = red(tok.value)
      else if(yellow_keywords.includes(tok.value)) val = yellow(tok.value)
      else if(green_keywords.includes(tok.value)) val = green(tok.value)
      else val = tok.value;
    break;
  }
  await Deno.stdout.write(encoder.encode(val))
}
}

await TS(Deno.readTextFileSync("lexer.ts"));
