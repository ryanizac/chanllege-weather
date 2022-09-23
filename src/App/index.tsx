import '@/confg/init';
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
        <Router default={{ path: '/listcities' }}>
          <Route path="/listcities" Component={ListCity} />
          <Route path="/search" Component={Search} />
          <Route path="/detail/:id" Component={Detail} />
        </Router>
      </CityContextProvider>
      <StatusBar style="light" />
    </View>
  );
}
