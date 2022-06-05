import styles from './styles';
import Card from '@/components/Card';
import Header from '@/components/Header';
import { ScrollView, Text, View } from 'react-native';
import { useRouter } from '@/lib/Router';

interface ListCityProps {}

export default function ListCity(props: ListCityProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header icon="SearchSvg" onPress={() => router.setPath('/search')}>
        <Text style={styles.titleHeader}>Cidades</Text>
      </Header>
      <ScrollView
        style={{ height: '100%', width: '100%', padding: 20, backgroundColor: '#fafafa' }}
      >
        <Card />
        <Card />
      </ScrollView>
    </View>
  );
}
