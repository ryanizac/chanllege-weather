import styles from './styles';
import InfoCard from '@/components/InfoCard';
import Header from '@/components/Header';
import { ScrollView, Text, View } from 'react-native';
import { useRouter } from '@/lib/Router';
import { useCityContext } from '@/contexts/CityContext';

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
      <ScrollView
        style={{
          height: '100%',
          width: '100%',
          padding: 20,
          backgroundColor: '#fafafa',
          paddingBottom: 40
        }}
      >
        {cities.length > 0 ? (
          cities
            .sort((a, b) => {
              if (a.isFavorite && !b.isFavorite) return -1;
              else if (!a.isFavorite && b.isFavorite) return 1;
              return 0;
            })
            .map((item, index) => (
              <InfoCard
                key={`InfoCard${index}`}
                {...item}
                onFavorite={() => toggleFavorite(item.id)}
                onDetail={() => onDetail(item.id)}
              />
            ))
        ) : (
          <>
            <Text style={styles.textInfo}>Parece que você ainda não adicionou cidades</Text>
            <Text style={styles.subTextInfo}>
              Tente adicionar uma cidade usando o botão de busca
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );
}
