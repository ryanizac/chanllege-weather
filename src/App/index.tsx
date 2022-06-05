import ListCity from '@/components/pages/ListCity';
import Search from '@/components/pages/Search';
import { WeatherContextProvider } from '@/contexts/WeatherContext';
import { Route, Router } from '@/lib/Router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import styles from './style';

export default function App() {
  return (
    <View style={styles.container}>
      <WeatherContextProvider>
        <Router default="/listcities">
          <Route path="/listcities" component={<ListCity />} />
          <Route path="/search" component={<Search />} />
        </Router>
      </WeatherContextProvider>
      <StatusBar style="auto" />
    </View>
  );
}
