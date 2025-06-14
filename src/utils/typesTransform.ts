export type CamelToSnake<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Lowercase<T>}${CamelToSnake<U>}`
    : `${Lowercase<T>}_${CamelToSnake<Uncapitalize<U>>}`
  : S;

export type KeysToSnakeCase<T> = {
  [K in keyof T as CamelToSnake<Extract<K, string>>]: T[K];
};
