import { TokenLit, Literals } from "./lexer/tokens.ts";

const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "_"
];

const numbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];

export class Lexer {
  input: string;
  pos: number = 0;
  next_pos: number = 0;
  ch: string | 0 = 0;

  constructor(input: string) {
    this.input = input;
    this.read_char();
  }

  read_char() {
    if (this.next_pos >= this.input.length) {
      this.ch = 0;
    } else {
      this.ch = this.input[this.next_pos];
    }
    this.pos = this.next_pos;
    this.next_pos += 1;
  }

  nextch(): string | 0 {
    if (this.next_pos >= this.input.length) {
      return 0;
    } else {
      return this.input[this.next_pos];
    }
  }

  nextch_is(ch: string): boolean {
    return this.nextch() == ch;
  }
  
  skip_ident(): string | false {
    let ws: string | false = false;
    loop:
    for (;;) {
      if(this.ch == 0) break loop;
      if(alphabets.includes(this.ch)) {
        ws ? ws = ws + this.ch : ws = this.ch
        this.read_char()
      } else {
        break loop;
      }
    }
    return ws;
  }

  skip_until(ch: string): string | false {
    let ws: string | false = false;
    loop:
    for (;;) {
      switch (this.ch) {
        case ch:
        case 0:
          break loop;
        default:
          ws ? ws = ws + this.ch : ws = this.ch
          this.read_char();
          break;
      }
    }
    return ws;
  }
  
  handle_whitespace(): string | false {
    let ws: string | false = false;
    loop:
    for (;;) {
      switch (this.ch) {
        case " " || "\t":
          ws ? ws = ws + this.ch : ws = this.ch
          this.read_char();
          break;
        default:
          break loop;
      }
    }
    return ws;
  }

  next_token(peek_only?: boolean): TokenLit {
    if(!peek_only) {
      let ws = this.handle_whitespace();
      if(ws) return { type: Literals.Whitespace, value: ws };
    }
    let tok = Literals.Illegal;
    let lit = this.ch;
    switch (this.ch) {
      case "=":
          tok = Literals.Assign;
        break;
      case "!":
          tok = Literals.Bang;
        break;
      case "\n":
          tok = Literals.Blank;
        break;
      case "+":
        tok = Literals.Plus;
        break;
      case "-":
        tok = Literals.Minus;
        break;
      case "/":
        tok = Literals.Slash;
        break;
      case "*":
        tok = Literals.Asterisk;
        break;
      case "(":
        tok = Literals.Lparen;
        break;
      case ")":
        tok = Literals.Rparen;
        break;
      case "{":
        tok = Literals.Lbrace;
        break;
      case "}":
        tok = Literals.Rbrace;
        break;
      case "[":
        tok = Literals.Lbracket;
        break;
      case "]":
        tok = Literals.Rbracket;
        break;
      case ",":
        tok = Literals.Comma;
        break;
      case ";":
        tok = Literals.Semicolon;
        break;
      case ":":
        tok = Literals.Colon;
        break;
      case ".":
        tok = Literals.Dot;
      break;
      case '"':
      case "'":
        return this.consume_string(this.ch);
        break;
      case 0:
        tok = Literals.Eof;
        break;
      default:
        if (alphabets.includes(this.ch.toString())) {
          return this.consume_identifier();
        } else if (numbers.includes(this.ch.toString())) {
          return this.consume_number();
        }
        break;
    }
    if(!peek_only) this.read_char();
    return { type: tok, value: typeof lit === "number" ? "\n" : lit };
  }

  consume_identifier(): TokenLit {
    let start_pos = this.pos;
    loop:
    for (;;) {
      if (alphabets.includes(this.ch.toString())) {
        this.read_char();
      } else {
        break loop;
      }
    }

    let literal = this.input.substring(start_pos, this.pos);

    let tok: TokenLit = { type: Literals.Ident, value: literal };

    return tok;
  }

  consume_number(): TokenLit {
    let start_pos = this.pos;
    loop:
    for (;;) {
      if (this.ch === 0) break loop;
      if (numbers.includes(this.ch)) {
        this.read_char();
      } else {
        break loop;
      }
    }

    let literal = this.input.substring(start_pos, this.pos);
    return { type: Literals.Int, value: literal };
  }

  consume_string(char: string): TokenLit {
    let quo = char;
    this.read_char();
    char += this.ch;
    let start_pos = this.pos;
    for (;;) {
      if (this.ch == quo || this.ch === 0) {
        break;
      } else {
        this.read_char();
        char += this.ch
      }
    }
    let literal = this.input.substring(start_pos, this.pos);

    this.read_char();
    return { type: Literals.String, value: typeof char === "number" ? "\n" : char };
  }
}


