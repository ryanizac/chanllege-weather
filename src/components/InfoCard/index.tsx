import styles from './styles';
import { FullHeart, HeartSvg } from '@/icons';
import { Pressable, Text, View } from 'react-native';
import IWeatherForecast from '@/types/IWeatherForecast';

interface InfoCardProps extends IWeatherForecast {
  onFavorite?: () => void;
}

export default function InfoCard(props: InfoCardProps) {
  return (
    <View style={styles.conainer}>
      <View style={{ justifyContent: 'space-between' }}>
        <Text style={styles.city}>{props.city.name}</Text>
        <Text style={styles.country}>{props.city.country}</Text>
        <Text style={styles.climate}>{props.climate}</Text>
        <Text style={styles.minMax}>
          {props.min}º - {props.max}º
        </Text>
      </View>
      <View style={{ height: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Text style={styles.temp}>{props.temp}º</Text>
        <Pressable style={styles.favoriteContainer} onPress={props.onFavorite}>
          {props.isFavorite ? (
            <FullHeart fill="#ed0952" width={24} height={24} />
          ) : (
            <HeartSvg fill="#ed0952" width={24} height={24} />
          )}
        </Pressable>
      </View>
    </View>
  );
}
