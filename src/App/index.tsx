import ListCity from '@/components/pages/ListCity';
import Search from '@/components/pages/Search';
import { Route, Router } from '@/lib/Router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import styles from './style';

export default function App() {
  return (
    <View style={styles.container}>
      <Router default="/listcities">
        <Route path="/listcities" component={<ListCity />} />
        <Route path="/search" component={<Search />} />
      </Router>
      <StatusBar style="auto" />
    </View>
  );
}
