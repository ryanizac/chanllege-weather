import { createContext, ReactNode, useContext, useState } from 'react';

interface RouterContextProps {
  path: string;
  setPath: (path: string) => void;
  back: () => void;
}

export const RouterContext = createContext<RouterContextProps>({
  path: '',
  setPath: () => {},
  back: () => {}
});

interface RouterProps {
  default: string;
  children?: ReactNode | ReactNode[];
}

export function RouterProvider(props: RouterProps) {
  const [{ path, ...router }, setRouter] = useState({
    path: props.default,
    history: [props.default]
  });

  const setPath = (path: string) => {
    setRouter((prev) => {
      const newPath = path;
      const newHistory = [...prev.history, newPath];
      return { path: newPath, history: newHistory };
    });
  };

  const back = () => {
    setRouter((prev) => {
      const lenght = prev.history.length - 2;
      const newPath = lenght > -1 ? prev.history[lenght] : props.default;
      const newHistory = [...prev.history, newPath];
      return { path: newPath, history: newHistory };
    });
  };

  return (
    <RouterContext.Provider
      value={{
        path,
        setPath,
        back
      }}
    >
      {props.children}
    </RouterContext.Provider>
  );
}

export const useRouterContext = () => useContext(RouterContext);
