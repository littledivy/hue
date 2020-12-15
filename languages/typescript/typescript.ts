import { Lexer } from "../../lexer/lexer.ts";
import { Literals } from "../../lexer/tokens.ts";

import { gray, green, red, yellow } from "../../deps.ts";
import { print } from "./keywords.ts";

const encoder = new TextEncoder();
const eof = encoder.encode("\n");

class Typescript extends Lexer {
  constructor(code: string) {
    super(code);
  }

  private highlight_chain(): string {
    let val: string = "";
    if (this.input[this.next_pos - 1] == ".") {
      this.read_char();
      let skipped = this.skip_ident() || "";
      val += "." + green(skipped);
      val += this.highlight_chain();
      return val;
    } else {
      return val;
    }
  }

  async highlight() {
    loop:
    for (;;) {
      let tok = this.next_token();

      let val = tok.value;
      switch (tok.type) {
        case Literals.Eof:
          await Deno.stdout.write(eof);
          break loop;
          break;
        case Literals.Int:
          val = yellow(tok.value);
          break;
        case Literals.String:
          val = green(String(tok.value));
          break;
        case Literals.Slash:
          if (this.next_token(true).value == "/") {
            let skipped = this.skip_until("\n") || "";
            let v = "/" + skipped;
            val = gray(v);
            break;
          }
          break;
        default:
          val = print(val);
          val += this.highlight_chain();
          break;
      }
      await Deno.stdout.write(encoder.encode(val));
    }
  }
}

new Typescript(Deno.readTextFileSync("languages/typescript/typescript.ts"))
  .highlight();
