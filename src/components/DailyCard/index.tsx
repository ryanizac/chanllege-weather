import styles from './styles';
import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';
import IForecast from '@/types/IForecast';
import { dayNames, isToday, isTomorrow, makeDate } from '@/utils/date';

export interface DailyCardProps extends IForecast {
  onFavorite?: () => void;
  onDetail?: () => void;
}

export default function DailyCard(props: DailyCardProps) {
  const [date] = useState<Date>(makeDate(props.dt * 1000));

  function getDayName(): string {
    if (isToday(date)) return 'Hoje';
    if (isTomorrow(date)) return 'Amanhã';
    return dayNames[date.getDay()];
  }

  function getDayAndMonth() {
    const day = date.getUTCDate();
    const month = date.toLocaleDateString('pt-br', { month: 'long' });
    return `${day} de ${month}`;
  }

  return (
    <Pressable onPress={props.onDetail}>
      <View style={styles.conainer}>
        <View style={{ justifyContent: 'space-between' }}>
          <Text style={styles.city}>{getDayName()}</Text>
          <Text style={styles.country}>{getDayAndMonth()}</Text>
          <Text style={styles.climate}>{props.description || 'no description'}</Text>
          <Text style={styles.minMax}>
            {props.min !== undefined
              ? `${Math.round(props.min)}º - ${Math.round(props.max || 0)}º`
              : 'no min or max'}
          </Text>
        </View>
        <View style={{ height: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={styles.temp}>{props.temp ? Math.round(props.temp) : 'no'}º</Text>
        </View>
      </View>
    </Pressable>
  );
}
