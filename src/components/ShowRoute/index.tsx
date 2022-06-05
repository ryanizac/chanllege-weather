import { useRouterContext } from '@/contexts/RouterContext';
import { ReactNode } from 'react';

interface ShowRouteProps {
  path: string;
  component: ReactNode;
}

export default function ShowRoute(props: ShowRouteProps) {
  const router = useRouterContext();

  return <>{router.path === props.path && props.component}</>;
}
