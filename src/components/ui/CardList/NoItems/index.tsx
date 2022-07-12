import { Text } from 'react-native';
import styles from './styles';

export interface NoItemsProps {}

export default function NoItems(props: NoItemsProps) {
  return (
    <>
      <Text style={styles.textInfo}>Parece que você ainda não adicionou cidades</Text>
      <Text style={styles.subTextInfo}>Tente adicionar uma cidade usando o botão de busca</Text>
    </>
  );
}
