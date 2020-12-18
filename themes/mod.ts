const Reset = "\x1b[0m";

const FgBlack = "\x1b[30m",
  FgRed = "\x1b[31m",
  FgGreen = "\x1b[32m",
  FgGray = "\x1b[90m",
  FgYellow = "\x1b[33m",
  FgBlue = "\x1b[34m",
  FgMagenta = "\x1b[35m",
  FgCyan = "\x1b[36m",
  FgWhite = "\x1b[37m";

export interface ConsoleTheme {
  identifiers: string;
  reserved_methods: string;
  string: string;
  numbers: string;
  comments: string;
  types: string;
}

export const DefaultTheme: ConsoleTheme = {
  identifiers: FgRed,
  reserved_methods: FgGreen,
  types: FgYellow,
  string: FgGreen,
  numbers: FgBlue,
  comments: FgGray,
};

export function color(code: string, str: string): string {
  return code + str + Reset;
}
