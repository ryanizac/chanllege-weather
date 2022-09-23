import styles from './styles';
import { View } from 'react-native';
import { useRouter } from '@/lib/Router';
import { useCityContext } from '@/contexts/CityContext';
import DailyCard from '@/components/DailyCard';
import { Header, TitleHeader } from '@/components/ui/Header';
import { SvgButton } from '@/components/ui/SvgButton';
import { ListContainer } from '@/components/ui/ListContainer';

interface DetailProps {}

export default function Detail(props: DetailProps) {
  const { route, back } = useRouter();
  const { cities } = useCityContext();
  const city = cities.find((item) => item.id === route.params.id) as typeof cities[number];

  return (
    <View style={styles.container}>
      <Header>
        <SvgButton svg="BackSvg" marginRight={8} onPress={back} />
        <TitleHeader>{city.name}</TitleHeader>
      </Header>
      <ListContainer
        list={(city.daily || []).slice(0, 7)}
        Child={DailyCard}
        render={(item) => item}
      />
    </View>
  );
}
