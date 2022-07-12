import styles from './styles';
import Header from '@/components/Header';
import InfoCard from '@/components/InfoCard';
import { Text, View } from 'react-native';
import { useRouter } from '@/lib/Router';
import { useCityContext } from '@/contexts/CityContext';
import { CardList } from '@/components/ui/CardList';

interface ListCityProps {}

export default function ListCity(props: ListCityProps) {
  const router = useRouter();
  const { cities, toggleFavorite, chooseSelected } = useCityContext();

  function onDetail(id: string) {
    chooseSelected(id);
    router.setPath('/detail');
  }

  return (
    <View style={styles.container}>
      <Header icon="SearchSvg" onPress={() => router.setPath('/search')}>
        <Text style={styles.titleHeader}>Cidades</Text>
      </Header>
      <CardList
        list={cities}
        callback={(item, index) => (
          <InfoCard
            key={`InfoCard${index}`}
            {...item}
            onFavorite={() => toggleFavorite(item.id)}
            onDetail={() => onDetail(item.id)}
          />
        )}
      />
    </View>
  );
}
