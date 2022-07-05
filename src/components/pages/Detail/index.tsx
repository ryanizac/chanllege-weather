import styles from './styles';
import Header from '@/components/Header';
import { ScrollView, Text, View } from 'react-native';
import { useRouter } from '@/lib/Router';
import { useCityContext } from '@/contexts/CityContext';
import DailyCard from '@/components/DailyCard';

interface DetailProps {}

export default function Detail(props: DetailProps) {
  const router = useRouter();
  const { selected } = useCityContext();

  if (selected === undefined) {
    return router.redirect('/listcities');
  }

  return (
    <View style={styles.container}>
      <Header icon="BackSvg" onPress={() => router.setPath('/listcities')} invert>
        <Text style={styles.titleHeader}>{selected.name}</Text>
      </Header>
      <ScrollView
        style={{ height: '100%', width: '100%', backgroundColor: '#fafafa' }}
        contentContainerStyle={{ padding: 20 }}
      >
        {selected.daily &&
          selected.daily
            .slice(0, 7)
            .map((item, index) => <DailyCard key={`Text${index}`} {...item} />)}
      </ScrollView>
    </View>
  );
}
