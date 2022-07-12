import { Text } from 'react-native';
import styles from './styles';

export interface NoItemsProps {
  list: string[];
}

export default function NoItems(props: NoItemsProps) {
  return (
    <>
      <Text style={styles.textInfo}>{props.list[0]}</Text>
      {props.list.slice(1).map((item, index) => (
        <Text key={`noitems-${index}`} style={styles.subTextInfo}>
          {item}
        </Text>
      ))}
    </>
  );
}
