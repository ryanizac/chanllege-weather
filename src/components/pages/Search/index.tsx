import styles from './styles';
import Card from '@/components/Card';
import Header from '@/components/Header';
import { Keyboard, ScrollView, TextInput, View } from 'react-native';
import { useState } from 'react';

interface SearchProps {}

export default function Search(props: SearchProps) {
  const [typing, setTyping] = useState(true);
  const [search, setSearch] = useState('');

  function onPressIconHeader() {
    if (typing) {
      setTyping(false);
      Keyboard.dismiss();
    } //search
    else console.log('back to home'); //search
  }

  return (
    <View style={styles.container}>
      <Header icon={typing ? 'SearchSvg' : 'XSvg'} onPress={onPressIconHeader} invert>
        <TextInput
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
