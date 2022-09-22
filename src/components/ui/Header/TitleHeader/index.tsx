import { Text } from 'react-native';
import { styles } from './styles';

interface TitleHeaderProps {
  children: string;
}

export function TitleHeader(props: TitleHeaderProps) {
  return <Text style={styles.container}>{props.children}</Text>;
}
