import styles from './styles';
import { HeartSvg } from '@/icons';
import { Text, View } from 'react-native';

interface CardProps {}

export default function Card(props: CardProps) {
  return (
    <View style={styles.conainer}>
      <View style={{ justifyContent: 'space-between' }}>
        <Text style={styles.city}>Pau dos Ferros</Text>
        <Text style={styles.country}>Brasil</Text>
        <Text style={styles.climate}>Sol torando dentro</Text>
        <Text style={styles.minMax}>28º - 32º</Text>
      </View>
      <View style={{ height: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Text style={styles.temp}>30º</Text>
        <HeartSvg fill="#ed0952" width={24} height={24} />
      </View>
    </View>
  );
}
