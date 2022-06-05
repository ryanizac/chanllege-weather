import City from '@/@types/City';
import Weather from '@/@types/Weather';
import { createContext, ReactNode, useContext, useState } from 'react';

interface WeatherContextProps {
  weather: Weather[];
  add: (weather: Weather) => void;
  remove: (cityRef: Weather) => void;
  toggleFavorite: (city: City) => void;
}

export const WeatherContext = createContext<WeatherContextProps>({
  weather: [{ city: { name: '', country: '' }, temp: 0, climate: '', max: 0, min: 0 }],
  add: () => {},
  remove: () => {},
  toggleFavorite: () => {}
});

interface WeatherContextProviderProps {
  children: ReactNode;
}

export function WeatherContextProvider(props: WeatherContextProviderProps) {
  //   const storage = useStorage<Weather>('weatherList', { name: '' });
  const [weather, setWeather] = useState<Weather[]>([]);

  function add(weather: Weather) {
    console.log('weather', weather);
    setWeather((prevState) => [...prevState, weather]);
  }

  function remove(weather: Weather) {
    setWeather((prevState) => prevState.filter((item) => item.city.name !== weather.city.name));
  }

  // function toggle(key: keyof City, value: any) {
  //   setWeather((prevState) => {
  //     const weatherFound = prevState.find((item) => item.city[key] === value);
  //     if (weatherFound !== undefined) {
  //       return [...prevState, weatherFound];
  //     }
  //     return prevState.filter((item) => item.city[key] !== value);
  //   });
  // }

  function toggleFavorite(city: City) {
    setWeather((prevState) => {
      const weatherFound = prevState.find((item) => item.city.name === city.name);
      if (weatherFound !== undefined) {
        const newState = prevState.filter((item) => item.city.name !== city.name);
        const newWeather: Weather = {
          ...weatherFound,
          isFavorite: !weatherFound.isFavorite
        };
        return [...newState, newWeather];
      }
      return prevState;
    });
  }

  return (
    <WeatherContext.Provider value={{ weather, add, remove, toggleFavorite }}>
      {props.children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);
