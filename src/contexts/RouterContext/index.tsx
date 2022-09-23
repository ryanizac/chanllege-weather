import { RouteParameters } from '@/types/RouteParameters';
import { useEffect, createContext, ReactNode, useContext, useState } from 'react';

type Route<T extends string> = {
  path: T;
  params: RouteParameters<T>;
};

type PartialRoute<T extends string> = {
  path: T;
  params?: RouteParameters<T>;
};

type RouterState<T extends string> = {
  route: Route<T>;
  history: Array<Route<any>>;
};

interface RouterContextProps {
  route: Route<any>;
  to: <P extends string>(path: P, params?: RouteParameters<P>) => void;
  back: () => void;
}

export const RouterContext = createContext<RouterContextProps>({
  route: {
    path: '',
    params: {}
  },
  to: () => {},
  back: () => {}
});

interface RouterProps {
  default: PartialRoute<any>;
  children?: ReactNode | ReactNode[];
}

export function RouterProvider(props: RouterProps) {
  const defaultRoute: Route<any> = {
    path: props.default.path,
    params: { ...props.default.params }
  };

  const [{ route, history: _history }, setRouter] = useState<RouterState<any>>({
    route: defaultRoute,
    history: [defaultRoute]
  });

  const to = <P extends string>(path: P, params: RouteParameters<P> = {} as any) => {
    setRouter((prev) => {
      const newRoute: Route<any> = { path, params: { ...params } };
      const newHistory: Array<Route<any>> = [...prev.history, newRoute];
      return { ...prev, route: newRoute, history: newHistory };
    });
  };

  const back = () => {
    setRouter((prev) => {
      const lenght = prev.history.length - 2;
      const newRoute = lenght > -1 ? prev.history[lenght] : defaultRoute;
      const newHistory = [...prev.history, newRoute];
      return { ...prev, route: newRoute, history: newHistory };
    });
  };

  return (
    <RouterContext.Provider
      value={{
        route,
        to,
        back
      }}
    >
      {props.children}
    </RouterContext.Provider>
  );
}

export const useRouterContext = () => useContext(RouterContext);
