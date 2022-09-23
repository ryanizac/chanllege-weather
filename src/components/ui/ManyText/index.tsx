import { StyleSheet, Text, TextStyle } from 'react-native';

type ManyTextProps = TextStyle & {
  list: string[];
};

export function ManyText({ list, ...style }: ManyTextProps) {
  return (
    <>
      {list.map((item, index) => (
        <Text key={index} style={[index === 0 ? styles.textInfo : styles.subTextInfo, style]}>
          {item}
        </Text>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  textInfo: {
    color: '#2b2a2b',
    marginTop: 40,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12
  },
  subTextInfo: {
    fontSize: 18,
    paddingHorizontal: 12,
    textAlign: 'center',
    color: '#666666'
  }
});
