import { ScrollView } from 'react-native';
import NoItems from './NoItems';
import styles from './styles';

interface CardListProps<T extends object> {
  list: T[];
  callback: (item: T, index: number) => JSX.Element;
  ifEmpty?: string[];
}

export function CardList<T extends object>(props: CardListProps<T>) {
  const listComponents = props.list.map(props.callback);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {listComponents.length ? listComponents : props.ifEmpty && <NoItems list={props.ifEmpty} />}
    </ScrollView>
  );
}
