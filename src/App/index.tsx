import ListCity from '@/components/pages/ListCity';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import styles from './style';

export default function App() {
  return (
    <View style={styles.container}>
      <ListCity />
      <StatusBar style="auto" />
    </View>
  );
}
