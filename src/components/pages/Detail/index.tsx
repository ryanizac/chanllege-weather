import styles from './styles';
import { View } from 'react-native';
import { useRouter } from '@/lib/Router';
import { useCityContext } from '@/contexts/CityContext';
import DailyCard from '@/components/DailyCard';
import ErrorComponent from '../Error';
import { Header, TitleHeader } from '@/components/ui/Header';
import { SvgButton } from '@/components/ui/SvgButton';
import { ListContainer } from '@/components/ui/ListContainer';

interface DetailProps {}

export default function Detail(props: DetailProps) {
  const router = useRouter();
  const { selected, clearSelected } = useCityContext();

  if (!selected) return <ErrorComponent code={404} message="no selected city" />;

  const onBack = () => [router.back(), clearSelected()];

  return (
    <View style={styles.container}>
      <Header>
        <SvgButton svg="BackSvg" marginRight={8} onPress={onBack} />
        <TitleHeader>{selected.name}</TitleHeader>
      </Header>
      <ListContainer
        list={(selected.daily || []).slice(0, 7)}
        Child={DailyCard}
        render={(item) => item}
      />
    </View>
  );
}
