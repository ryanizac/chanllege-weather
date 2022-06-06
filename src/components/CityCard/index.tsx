import styles from './styles';
import { Pressable, Text, View } from 'react-native';
import ICity from '@/types/ICity';

interface CardProps extends ICity {
  onPress?: () => void;
}

export default function Card(props: CardProps) {
  return (
    <View style={styles.conainer}>
      <View style={{ justifyContent: 'space-between' }}>
        <Text style={styles.city}>{props.name}</Text>
        <Text style={styles.country}>{props.country}</Text>
        <Pressable style={styles.buttonAddContainer} onPress={props.onPress}>
          <Text style={styles.buttonAdd}>Adicionar</Text>
        </Pressable>
      </View>
    </View>
  );
}
