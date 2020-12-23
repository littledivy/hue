import { Lexer } from "../../lexer/lexer.ts";
import { Literals } from "../../lexer/tokens.ts";

import { Printer } from "./keywords.ts";
import {
  ConsoleTheme,
  DefaultTheme,
  MarkupTheme,
  Theme,
} from "../../themes/mod.ts";

const encoder = new TextEncoder();
const eof = encoder.encode("\n");

export interface Options {
  output: "console" | "markup";
}

class Typescript extends Lexer {
  theme: ConsoleTheme | MarkupTheme;
  printer: Printer;
  constructor(code: string, theme: Theme, options: Options) {
    super(code);
    this.theme = options.output == "console" ? theme.console : theme.markup;
    this.printer = new Printer(this.theme, options);
  }

  private read_comments(): string {
    let skipped = this.skip_until("\n") || "";
    let v = "/" + skipped;
    return this.printer.print_comments(v);
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
    return this.printer.print_comments(v);
  }

  private highlight_chain(): string {
    let val: string = "";
    if (this.input[this.next_pos - 1] == ".") {
      this.read_char();
      let skipped = this.skip_ident() || "";
      val += "." + this.printer.print_chain(skipped);
      val += this.highlight_chain();
      return val;
    } else {
      return val;
    }
  }

  public highlight(): string {
    let output: string = "";
    loop:
    for (;;) {
      let tok = this.next_token();

      let val = tok.value;
      switch (tok.type) {
        case Literals.Eof:
          break loop;
          break;
        case Literals.Int:
          val = this.printer.print_numbers(tok.value);
          break;
        case Literals.Asterisk:
        case Literals.Bang:
        case Literals.Plus:
        case Literals.Minus:
          val = this.printer.print_operators(tok.value);
          break;
        case Literals.String:
          val = this.printer.print_string(tok.value);
          break;
        case Literals.Slash:
          let nxt = this.next_token(true).value;
          if (nxt == "/") {
            val = this.read_comments();
            break;
          } else if (nxt == "*") {
            val = this.read_block_comments();
            break;
          } else {
            // It is division op.
            val = this.printer.print_operators(tok.value);
          }
          break;
        default:
          val = this.printer.print(val);
          val += this.highlight_chain();
          break;
      }
      output += val;
    }
    return output;
  }
}

export default Typescript;
