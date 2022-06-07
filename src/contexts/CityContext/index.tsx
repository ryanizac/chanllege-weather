import { useNetInfo } from '@react-native-community/netinfo';
import CityModel, {
  extractCityBase,
  extractCityCoord,
  extractCityForecast
} from '@/models/CityModel';
import AsyncStorageService from '@/services/AsyncStorageService';
import CityService from '@/services/CityService';
import ForecastService from '@/services/ForecastService';
import ICity from '@/types/ICity';
import ICityBase from '@/types/ICityBase';
import ICityForecast from '@/types/ICityForecast';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { asyncMap } from '@/utils/callbacks';

interface CityContextProps {
  selected: ICity | undefined;
  chooseSelected: (id: string) => void;
  clearSelected: () => void;
  cities: ICity[];
  add: (item: ICityBase) => Promise<void>;
  remove: (id: string) => void;
  toggleFavorite: (id: string) => void;
  search: (text: string) => Promise<ICityBase[]>;
}

export const CityContext = createContext<CityContextProps>({
  selected: undefined,
  chooseSelected: () => {},
  clearSelected: () => {},
  cities: [],
  add: async () => {},
  remove: () => {},
  toggleFavorite: () => {},
  search: async () => []
});

interface CityContextProviderProps {
  children: ReactNode;
}

export function CityContextProvider(props: CityContextProviderProps) {
  const { isConnected: hasNetwork } = useNetInfo();
  const [loadUpdatesOnStart, setLoadUpdatesOnStart] = useState(false);
  const cityStorage = new AsyncStorageService<ICity[]>('cities', []);
  const [selected, setSelected] = useState<ICity | undefined>();
  const [cities, setCities] = useState<ICity[]>([]);

  async function search(input: string) {
    return CityService.searchCity(input).then((listCityFound) => {
      if (listCityFound !== undefined) {
        return listCityFound.map((someItem) => extractCityBase(someItem));
      }
      return [];
    });
  }

  async function findCityForecast(lat: number, lon: number): Promise<ICityForecast | undefined> {
    const forecastRes = await ForecastService.findByGeometry(lat, lon);
    if (forecastRes === undefined) return undefined; // throw an error on request
    return extractCityForecast(forecastRes);
  }

  async function add(cityBase: ICityBase) {
    const cityCoordRes = await CityService.findCoord(cityBase.id);
    if (cityCoordRes !== undefined) {
      const cityCoord = extractCityCoord(cityCoordRes);
      const cityForecast = await findCityForecast(cityCoord.lat, cityCoord.lon);
      const city = new CityModel(cityBase, cityCoord, cityForecast);
      const newState = [...cities, city];
      cityStorage.write(newState).then((result) => {
        if (result === true) {
          setCities(newState);
        } // else // throw an error
      });
    }
  }

  function remove(id: string) {
    const newState = cities.filter((item) => item.id !== id);
    cityStorage.write(newState).then((result) => {
      if (result === true) return setCities(newState);
      // else // throw an error
    });
  }

  function toggleFavorite(id: string) {
    const item: ICity | undefined = cities.find((someItem) => someItem.id === id);
    if (item !== undefined) {
      const newItem: ICity = { ...item, isFavorite: !item.isFavorite };
      const newList: ICity[] = cities.filter((someItem) => someItem.id !== id);
      const newState = [...newList, newItem];
      cityStorage.write(newState).then((result) => {
        if (result === true) return setCities(newState);
        // else // throw an error
      });
    }
  }

  function chooseSelected(id: string) {
    const foundItem = cities.find((someItem) => someItem.id === id);
    setSelected(foundItem);
  }

  function clearSelected() {
    setSelected(undefined);
  }

  async function syncCityStorage() {
    const result = await cityStorage.init();
    if (!Array.isArray(result)) return; // an error on async storage
    if (result.length > 0) {
      // update if has results
      if (hasNetwork) {
        const updatedCities = await asyncMap(result, async (itemCity, index) => {
          console.log('asyncMap', itemCity.name, index);
          const updatedForecast = await findCityForecast(itemCity.lat, itemCity.lon);
          if (updatedForecast === undefined) return itemCity;
          const newCity = new CityModel(itemCity, itemCity, updatedForecast);
          console.log('newCity', newCity);
          return newCity;
        });
        console.log('updateStorage...');
        cityStorage.write(updatedCities).then((result) => {
          if (result === true) {
            console.log('update');
            setCities(updatedCities);
          }
        });
        setLoadUpdatesOnStart(true);
      } else setCities(result);
    }
  }

  useEffect(() => {
    if (!loadUpdatesOnStart) syncCityStorage();
    // (async () => {
    //   ------------- test storage
    //   console.log('reading async storage');
    //   syncStorage();
    //   console.log('reading async storage');
    //   storage.read().then((value) => console.log(value));
    //   console.log('veryfing keys on async storage');
    //   await storage.hasSomething().then((value) => console.log(value));
    //   console.log('clear async storage');
    //   await AsyncStorageService.clear();
    //   console.log('veryfing keys on async storage');
    //   await storage.hasSomething().then((value) => console.log(value));
    // })();
  }, [hasNetwork]);

  return (
    <CityContext.Provider
      value={{
        cities,
        add,
        remove,
        toggleFavorite,
        search,
        selected,
        chooseSelected,
        clearSelected
      }}
    >
      {props.children}
    </CityContext.Provider>
  );
}

export const useCityContext = () => useContext(CityContext);
