// Types
interface Dictionary<T> {
	[key: string]: T;
}
interface Foo extends Dictionary<number> {}
class Bar<T> extends Baz<T> implements FooBar<number, T | null> {}
type Record<K extends keyof any, T> = {
	[P in K]: T;
}
type Diff<T, U> = T extends U ? never : T;
// Functions
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] { }
declare function f<T extends boolean>(x: T): T extends true ? string : number;
function assert(condition: any, msg?: string): asserts condition { }
console.log(console.table(1))
assert.bind
console.log.smth.else
