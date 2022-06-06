import styles from './styles';
import SimpleCard from '@/components/CityCard';
import Header from '@/components/Header';
import { Keyboard, ScrollView, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/Router';
import ICity from '@/types/ICity';
import CityService from '@/services/CityService';
import { useWeather } from '@/contexts/WeatherContext';
import WeatherService from '@/services/WeatherService';

interface SearchProps {}

export default function Search(props: SearchProps) {
  const { weather, add } = useWeather();
  const router = useRouter();
  const [typing, setTyping] = useState(true);
  const [search, setSearch] = useState('');
  const [listCity, setListCity] = useState<ICity[]>([]);

  function handleItem(city: ICity) {
    WeatherService.findByCityName(city.name).then((value) => {
      if (!!value?.length) {
        add(value[0]);
        // then
        setListCity((prevState) => prevState.filter((item) => item.name !== value[0].city.name));
      }
    });
  }

  function onPressIconHeader() {
    //search
    if (typing) {
      setTyping(false);
      Keyboard.dismiss();
      search.length >= 2 &&
        CityService.findByName(search).then((listCityFound) => {
          if (!!listCityFound) setListCity(listCityFound);
        });
    } // back, when not typing and after pressing the button
    else router.setPath('/listcities');
  }

  useEffect(() => {
    return () => {
      // closing keyboard after component unmount
      Keyboard.dismiss();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header icon={typing ? 'SearchSvg' : 'XSvg'} onPress={onPressIconHeader} invert>
        <TextInput
          placeholder="digite..."
          placeholderTextColor="rgba(255,255,255,0.6)"
          style={styles.inputHeader}
          value={search}
          autoFocus={typing}
          onPressIn={() => setListCity([])}
          onSubmitEditing={onPressIconHeader}
          onChangeText={(e) => setSearch(e)}
          onFocus={() => setTyping(true)}
          onEndEditing={() => setTyping(false)}
        />
      </Header>
      <ScrollView
        style={{ height: '100%', width: '100%', padding: 20, backgroundColor: '#fafafa' }}
      >
        {listCity.length > 0
          ? listCity
              .filter((item) => {
                const exits = weather.find((itemCurrent) => {
                  return itemCurrent.city.name === item.name;
                });
                return !exits;
              })
              .map((item, index) => (
                <SimpleCard key={`SimpleCard${index}`} {...item} onPress={() => handleItem(item)} />
              ))
          : !typing && (
              <>
                <Text style={styles.textInfo}>Cidades não encontradas{' :('}</Text>
                <Text style={styles.subTextInfo}>
                  Tente digitar o nome da cidade e pressione para pesquisar ou voltar ao menu
                  inicial
                </Text>
              </>
            )}
      </ScrollView>
    </View>
  );
}
