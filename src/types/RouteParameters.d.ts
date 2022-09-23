interface ParamsDictionary {
  [key: string]: any;
}

type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;
type GetRouteParameter<S extends string> = RemoveTail<
  RemoveTail<RemoveTail<S, `/${string}`>, `-${string}`>,
  `.${string}`
>;

export type RouteParameters<Route extends string> = Route extends `${string}:${infer Rest}`
  ? (GetRouteParameter<Rest> extends `${infer ParamName}?`
      ? { [P in ParamName]?: string }
      : { [P in GetRouteParameter<Rest>]: any }) &
      (Rest extends `${GetRouteParameter<Rest>}${infer Next}` ? RouteParameters<Next> : unknown)
  : ParamsDictionary;
