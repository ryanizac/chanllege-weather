import styles from './styles';
import { SearchSvg } from '@/icons';
import { Text, View } from 'react-native';

interface HeaderProps {}

export default function Header(props: HeaderProps) {
  return (
    <View style={styles.conainer}>
      <Text style={styles.title}>Cidades</Text>
      <SearchSvg width={28} height={28} />
    </View>
  );
}
