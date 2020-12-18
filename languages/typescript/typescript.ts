import { Lexer } from "../../lexer/lexer.ts";
import { Literals } from "../../lexer/tokens.ts";

import { Printer } from "./keywords.ts";
import { color, ConsoleTheme, DefaultTheme } from "../../themes/mod.ts";

const encoder = new TextEncoder();
const eof = encoder.encode("\n");

class Typescript extends Lexer {
  theme: ConsoleTheme;
  printer: Printer;
  constructor(code: string, theme: ConsoleTheme) {
    super(code);
    this.theme = theme;
    this.printer = new Printer(theme);
  }

  private read_comments(): string {
    let skipped = this.skip_until("\n") || "";
    let v = "/" + skipped;
    return color(this.theme.comments, v);
  }

  private read_block_comments(): string {
    let block: string = "";
    loop:
    for (;;) {
      switch (this.ch) {
        case "*":
        case 0:
          block = block + this.ch;
          if (this.input[this.next_pos] == "/") {
            this.read_char();
            block = block + this.ch;
            this.read_char();
            break loop;
          }
          this.read_char();
          break;
        default:
          block = block + this.ch;
          this.read_char();
          break;
      }
    }
    let v = "/" + block;
    return color(this.theme.comments, v);
  }

  private highlight_chain(): string {
    let val: string = "";
    if (this.input[this.next_pos - 1] == ".") {
      this.read_char();
      let skipped = this.skip_ident() || "";
      val += "." + color(this.theme.reserved_methods, skipped);
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
          val = color(this.theme.numbers, tok.value);
          break;
        case Literals.String:
          val = color(this.theme.string, tok.value);
          break;
        case Literals.Slash:
          let nxt = this.next_token(true).value;
          if (nxt == "/") {
            val = this.read_comments();
            break;
          } else if (nxt == "*") {
            val = this.read_block_comments();
            break;
          }
          break;
        default:
          val = this.printer.print(val);
          val += this.highlight_chain();
          break;
      }
      await Deno.stdout.write(encoder.encode(val));
    }
  }
}

export default Typescript;
