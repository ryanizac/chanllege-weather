import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface RouterContextProps {
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
}

export const RouterContext = createContext<RouterContextProps>({
  path: '',
  setPath: () => {}
});

interface RouterProps {
  default: string;
  children?: ReactNode | ReactNode[];
}

export function RouterProvider(props: RouterProps) {
  const [path, setPath] = useState(props.default);

  return (
    <RouterContext.Provider
      value={{
        path,
        setPath
      }}
    >
      {props.children}
    </RouterContext.Provider>
  );
}

export const useRouterContext = () => useContext(RouterContext);
