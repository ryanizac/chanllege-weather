import styles from './styles';
import { ReactNode } from 'react';
import { View } from 'react-native';

interface HeaderProps {
  children?: ReactNode;
}

export function Header(props: HeaderProps) {
  return <View style={[styles.conainer]}>{props.children}</View>;
}
