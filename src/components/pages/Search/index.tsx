import styles from './styles';
import Card from '@/components/Card';
import Header from '@/components/Header';
import { Keyboard, ScrollView, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/Router';

interface SearchProps {}

export default function Search(props: SearchProps) {
  const router = useRouter();
  const [typing, setTyping] = useState(true);
  const [search, setSearch] = useState('');

  function onPressIconHeader() {
    //search
    if (typing) {
      setTyping(false);
      Keyboard.dismiss();
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
          onChangeText={(e) => setSearch(e)}
          onFocus={() => setTyping(true)}
          onEndEditing={() => setTyping(false)}
        />
      </Header>
      <ScrollView
        style={{ height: '100%', width: '100%', padding: 20, backgroundColor: '#fafafa' }}
      >
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ScrollView>
    </View>
  );
}
