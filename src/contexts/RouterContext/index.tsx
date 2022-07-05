import {
  createContext,
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { createElement } from 'react-native';

interface RouterContextProps {
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
  redirect: (path: string) => JSX.Element;
}

export const RouterContext = createContext<RouterContextProps>({
  path: '',
  setPath: () => {},
  redirect: () => createElement(Fragment)
});

interface RouterProps {
  default: string;
  children?: ReactNode | ReactNode[];
}

export function RouterProvider(props: RouterProps) {
  const [path, setPath] = useState(props.default);

  function redirect(newPath: string) {
    setPath(newPath);
    return createElement(Fragment);
  }

  return (
    <RouterContext.Provider
      value={{
        path,
        setPath,
        redirect
      }}
    >
      {props.children}
    </RouterContext.Provider>
  );
}

export const useRouterContext = () => useContext(RouterContext);
