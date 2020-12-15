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
}
