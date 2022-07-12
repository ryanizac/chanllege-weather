import styles from './styles';
import Header from '@/components/Header';
import { Text, View } from 'react-native';
import { useRouter } from '@/lib/Router';
import { useCityContext } from '@/contexts/CityContext';
import DailyCard from '@/components/DailyCard';
import ErrorComponent from '../Error';
import { CardList } from '@/components/ui/CardList';

interface DetailProps {}

export default function Detail(props: DetailProps) {
  const router = useRouter();
  const { selected, clearSelected } = useCityContext();

  if (!selected) return <ErrorComponent code={404} message="no selected city" />;

  const onBack = () => [router.setPath('/listcities'), clearSelected()];

  return (
    <View style={styles.container}>
      <Header icon="BackSvg" onPress={onBack} invert>
        <Text style={styles.titleHeader}>{selected.name}</Text>
      </Header>
      <CardList
        list={(selected.daily || []).slice(0, 7)}
        callback={(item, index) => <DailyCard key={`Text${index}`} {...item} />}
      />
    </View>
  );
}
