import styles from './styles';
import { FullHeart, HeartSvg } from '@/icons';
import { Pressable, Text, View } from 'react-native';
import ICity from '@/types/ICity';

interface InfoCardProps extends ICity {
  onFavorite?: () => void;
  onDetail?: () => void;
}

export default function InfoCard(props: InfoCardProps) {
  return (
    <Pressable onPress={props.onDetail}>
      <View style={styles.conainer}>
        <View style={{ justifyContent: 'space-between' }}>
          <Text style={styles.city}>{props.name}</Text>
          <Text style={styles.country}>{props.country}</Text>
          <Text style={styles.climate}>{props.description || 'no description'}</Text>
          <Text style={styles.minMax}>
            {props.min !== undefined
              ? `${Math.round(props.min)}º - ${Math.round(props.max || 0)}º`
              : 'no min or max'}
          </Text>
        </View>
        <View style={{ height: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={styles.temp}>{props.temp ? Math.round(props.temp) : 'no'}º</Text>
          <Pressable style={styles.favoriteContainer} onPress={props.onFavorite}>
            {props.isFavorite ? (
              <FullHeart fill="#ed0952" width={24} height={24} />
            ) : (
              <HeartSvg fill="#ed0952" width={24} height={24} />
            )}
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
