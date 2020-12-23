import Typescript from "../languages/typescript/typescript.ts";
import Golang from "../languages/go/golang.ts";
import { DefaultTheme } from "../themes/mod.ts";

const source_code = `
const a_number: number = 100.0;
const a_str: string = "Hello, World";

console.log(a_str);

type X = number | string;

interface AnInterface {
  a: string;
  b: number;
  c: X;
}
// A single line comment

/*
 And ofcourse...
 multiline comments
*/

export default (): string => {
  return (() => "Hello, World")();
}

export class Calc {
  constructor() {}
  
  add(a: number, b: number) {
    return a + b;
  }
  
  mul(a: number, b: number) {
    return a * b;
  }

  div(a: number, b: number) {
    return a / b;
  }
}

let c = new Calc();
c.add(1, 2);
`;

let printer = new Golang(source_code, DefaultTheme, { output: "markup" });
console.log(printer.highlight());
