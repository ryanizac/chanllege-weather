import Detail from '@/components/pages/Detail';
import ListCity from '@/components/pages/ListCity';
import Search from '@/components/pages/Search';
import { CityContextProvider } from '@/contexts/CityContext';
import { Route, Router } from '@/lib/Router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import styles from './style';

export default function App() {
  return (
    <View style={styles.container}>
      <CityContextProvider>
        <Router default="/listcities">
          <Route path="/listcities" component={<ListCity />} />
          <Route path="/search" component={<Search />} />
          <Route path="/detail" component={<Detail />} />
        </Router>
      </CityContextProvider>
      <StatusBar style="light" />
    </View>
  );
}
