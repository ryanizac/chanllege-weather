import styles from './styles';
import { Keyboard, ScrollView, Text, TextInput, View } from 'react-native';
import SimpleCard from '@/components/CityCard';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/Router';
import { useCityContext } from '@/contexts/CityContext';
import ICityBase from '@/types/ICityBase';

interface SearchProps {}

export default function Search(props: SearchProps) {
  const router = useRouter();
  const { cities, add, search } = useCityContext();
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(true);
  const [listCity, setListCity] = useState<ICityBase[]>([]);

  function onPressIconHeader() {
    //search
    if (typing) {
      setTyping(false);
      Keyboard.dismiss();
      input.length >= 3 && search(input).then((value) => setListCity(value));
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
          value={input}
          autoFocus={typing}
          onPressIn={() => setListCity([])}
          onSubmitEditing={onPressIconHeader}
          onChangeText={(e) => setInput(e)}
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
                const exits = cities.find((itemCurrent) => {
                  return itemCurrent.name === item.name;
                });
                return !exits;
              })
              .map((item, index) => (
                <SimpleCard key={`SimpleCard${index}`} {...item} onPress={() => add(item)} />
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
