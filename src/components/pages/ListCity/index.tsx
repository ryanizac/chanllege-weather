import styles from './styles';
import InfoCard from '@/components/InfoCard';
import { View } from 'react-native';
import { useRouter } from '@/lib/Router';
import { useCityContext } from '@/contexts/CityContext';
import { CardList } from '@/components/ui/CardList';
import { Header, TitleHeader } from '@/components/ui/Header';
import { SvgButton } from '@/components/ui/SvgButton';
import { ListContainer } from '@/components/ui/ListContainer';

interface ListCityProps {}

export default function ListCity(props: ListCityProps) {
  const router = useRouter();
  const { cities, toggleFavorite, chooseSelected } = useCityContext();

  function onDetail(id: string) {
    chooseSelected(id);
    router.setPath('/detail');
  }

  const sortedListCities = cities.sortBySize('name').sortByBoolean('isFavorite');

  return (
    <View style={styles.container}>
      <Header>
        <TitleHeader>Cidades</TitleHeader>
        <SvgButton svg="SearchSvg" onPress={() => router.setPath('/search')} />
      </Header>
      <ListContainer
        list={sortedListCities}
        Child={InfoCard}
        render={(item) => ({
          ...item,
          onFavorite: () => toggleFavorite(item.id),
          onDetail: () => onDetail(item.id)
        })}
        emptyMessages={[
          'Parece que você ainda não adicionou cidades',
          'Tente adicionar uma cidade usando o botão de busca'
        ]}
      />
    </View>
  );
}
