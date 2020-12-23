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

/// XXX: clean me up a little bit
export type ConsoleColors =
  | "\x1b[30m"
  | "\x1b[31m"
  | "\x1b[32m"
  | "\x1b[90m"
  | "\x1b[33m"
  | "\x1b[34m"
  | "\x1b[35m"
  | "\x1b[36m"
  | "\x1b[37m";

export type ConsoleTheme = ThemeAttr<ConsoleColors>;
export type MarkupTheme = ThemeAttr<string>;

export interface Theme {
  console: ConsoleTheme;
  markup: ThemeAttr<string>;
}

export interface ThemeAttr<T> {
  identifiers: T;
  reserved_methods: T;
  string: T;
  numbers: T;
  operators: T;
  comments: T;
  types: T;
}

export const DefaultTheme: Theme = {
  console: {
    identifiers: FgRed,
    reserved_methods: FgGreen,
    types: FgYellow,
    string: FgGreen,
    numbers: FgBlue,
    comments: FgGray,
    operators: FgCyan,
  },
  markup: {
    identifiers: "red",
    reserved_methods: "green",
    types: "yellow",
    string: "green",
    numbers: "blue",
    comments: "gray",
    operators: "cyan",
  },
};

export function color(code: string, str: string): string {
  return code + str + Reset;
}

export function markup(code: string, str: string): string {
  return `<span style="color:${code}">${str}</span>`;
}
