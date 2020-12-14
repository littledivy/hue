export interface TokenLit {
  type: Literals;
  value: string;
}

export enum Literals {
  Ident,
  Int,
  Bool,
  String,
  Illegal,
  Blank,
  Eof,
  Assign,
  If,
  Else,
  While,
  Plus,
  Minus,
  Bang,
  Asterisk,
  Slash,
  Caret,
  Dot,
  Let,
  Percent,
  Equal,
  NotEqual,
  LessThan,
  LessThanEqual,
  GreaterThan,
  GreaterThanEqual,
  Comma,
  Colon,
  Semicolon,
  Lparen,
  Rparen,
  Lbrace,
  Rbrace,
  Lbracket,
  Rbracket,
  Whitespace,
  Func,
  Return,
  Import,
}

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

  next_token(): TokenLit {
    let ws = this.handle_whitespace();
    if(ws) return { type: Literals.Whitespace, value: ws };
    let tok = Literals.Illegal;
    let lit = this.ch;
    switch (this.ch) {
      case "=":
        if (this.nextch_is("=")) {
          this.read_char();
          lit += this.ch;
          tok = Literals.Equal;
        } else {
          tok = Literals.Assign;
        }
        break;
      case "!":
        if (this.nextch_is("=")) {
          this.read_char();
          lit += this.ch;
          tok = Literals.NotEqual;
        } else {
          tok = Literals.Bang;
        }
        break;
      case "<":
        if (this.nextch_is("=")) {
          this.read_char();
          lit += this.ch;          
          tok = Literals.LessThanEqual;
        } else {
          tok = Literals.LessThan;
        }
        break;
      case ">":
        if (this.nextch_is("=")) {
          this.read_char();
          lit += this.ch;          
          tok = Literals.GreaterThanEqual;
        } else {
          tok = Literals.GreaterThan;
        }
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
    this.read_char();
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

    switch (literal) {
      case "func":
        tok.type = Literals.Func;
        break;
      case "let":
        tok.type = Literals.Let;
        break;
      case "if":
        tok.type = Literals.If;
        break;
      case "else":
        tok.type = Literals.Else;
        break;
      case "return":
        tok.type = Literals.Return;
        break;
      case "true":
        tok.type = Literals.Bool;
        break;
      case "false":
        tok.type = Literals.Bool;
        break;
      default:
        break;
    }
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


