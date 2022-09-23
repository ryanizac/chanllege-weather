import { useRouterContext } from '@/contexts/RouterContext';
import { FunctionComponent } from 'react';

interface ShowRouteProps<T extends unknown> {
  path: string;
  componentProps?: T;
  Component: FunctionComponent<T>;
}

export default function ShowRoute<T extends object>({
  Component,
  componentProps,
  ...props
}: ShowRouteProps<T>) {
  const { route } = useRouterContext();

  return <>{route.path === props.path && <Component {...(componentProps as T)} />}</>;
}
