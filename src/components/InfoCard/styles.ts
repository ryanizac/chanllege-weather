import { StyleSheet } from 'react-native';

const colors = {
  black: '#1D1C1D',
  white: '#fff',
  orange: '#f28200'
};

const styles = StyleSheet.create({
  conainer: {
    width: '100%',
    minHeight: 100,
    maxHeight: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginVertical: 8,
    paddingHorizontal: 20,
    paddingVertical: 28,
    borderRadius: 8,
    shadowColor: 'gray',
    shadowOpacity: 0.4,
    shadowOffset: { height: 2, width: 0 }
  },
  column: {
    height: '100%',
    justifyContent: 'space-between'
  },
  city: {
    color: colors.black,
    fontSize: 32,
    fontWeight: '500',
    marginBottom: 2,
    maxWidth: 200
  },
  country: {
    color: colors.black,
    fontSize: 24,
    marginBottom: 16
  },
  climate: {
    color: colors.orange,
    marginBottom: 2
  },
  minMax: {
    color: colors.black
  },
  temp: {
    marginTop: 4,
    fontSize: 40,
    fontWeight: '500',
    color: colors.orange
  },
  favoriteContainer: {
    height: 40,
    width: 40,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});

export default styles;
