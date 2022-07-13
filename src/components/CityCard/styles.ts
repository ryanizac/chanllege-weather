import { StyleSheet } from 'react-native';

const colors = {
  black: '#1D1C1D',
  white: '#fff',
  orange: '#f28200'
};

const styles = StyleSheet.create({
  conainer: {
    width: '100%',
    minHeight: 80,
    maxHeight: 150,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 28,
    borderRadius: 8,
    shadowColor: 'gray',
    shadowOpacity: 0.4,
    shadowOffset: { height: 2, width: 0 }
  },
  city: {
    color: colors.black,
    fontSize: 32,
    fontWeight: '500',
    marginBottom: 2
  },
  country: {
    color: colors.black,
    fontSize: 24,
    marginBottom: 20
  },
  buttonAddContainer: {
    paddingHorizontal: 8
  },
  buttonAdd: {
    color: '#0078be',
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default styles;
