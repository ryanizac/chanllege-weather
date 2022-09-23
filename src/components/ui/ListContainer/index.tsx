import { FunctionComponent } from 'react';
import { ScrollView } from 'react-native';
import { ManyText } from '../ManyText';
import { styles } from './styles';

type ListContainerProps<T, P> = {
  list: T[];
  Child: FunctionComponent<P>;
  render: (item: T, index: number) => P;
  emptyMessages?: string[];
};

export function ListContainer<T extends object, P extends object>(props: ListContainerProps<T, P>) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {props.list.length === 0 ? (
        <ManyText list={props.emptyMessages || []} />
      ) : (
        props.list.map((item, index) => {
          const localProps = props.render(item, index);
          return <props.Child key={index} {...localProps} />;
        })
      )}
    </ScrollView>
  );
}
