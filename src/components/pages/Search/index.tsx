import styles from './styles';
import { Keyboard, View } from 'react-native';
import CityCard from '@/components/CityCard';
import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/Router';
import { useCityContext } from '@/contexts/CityContext';
import ICityBase from '@/types/ICityBase';
import { InputSearch } from '@/components/ui/InputSearch';
import { Header } from '@/components/ui/Header';
import { SvgButton } from '@/components/ui/SvgButton';
import { ListContainer } from '@/components/ui/ListContainer';

interface SearchProps {}

export default function Search(props: SearchProps) {
  const router = useRouter();
  const { cities, add, search } = useCityContext();
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(true);
  const [listCity, setListCity] = useState<ICityBase[]>([]);

  async function onAdd(item: ICityBase) {
    await add(item);
    router.to('/listcities');
  }

  function onPressIconHeader() {
    //search
    if (typing) {
      setTyping(false);
      Keyboard.dismiss();
      input.length >= 3 && search(input).then((value) => setListCity(value));
    } // back, when not typing and after pressing the button
    else router.to('/listcities');
  }

  useEffect(() => {
    return () => {
      // closing keyboard after component unmount
      Keyboard.dismiss();
    };
  }, []);

  const list = listCity.filter((item) => {
    const exits = cities.find((itemCurrent) => {
      return itemCurrent.name === item.name;
    });
    return !exits;
  });

  return (
    <View style={styles.container}>
      <Header>
        <SvgButton svg={typing ? 'SearchSvg' : 'XSvg'} onPress={onPressIconHeader} />
        <InputSearch
          value={input}
          setValue={setInput}
          autoFocus={typing}
          onPressIn={() => setListCity([])}
          onSubmitEditing={onPressIconHeader}
          onFocus={() => setTyping(true)}
          onEndEditing={() => setTyping(false)}
        />
      </Header>
      <ListContainer
        list={list}
        Child={CityCard}
        render={(item) => ({
          ...item,
          onPress: () => onAdd(item)
        })}
        emptyMessages={['cidades não encontradas', 'use a caixa de texto acima para pesquisar']}
      />
    </View>
  );
}
