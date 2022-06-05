import ListCity from '@/components/pages/ListCity';
import Search from '@/components/pages/Search';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import styles from './style';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <ListCity /> */}
      <Search />
      <StatusBar style="auto" />
    </View>
  );
}
