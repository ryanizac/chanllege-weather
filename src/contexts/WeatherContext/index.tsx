import ICity from '@/types/ICity';
import IWeatherForecast from '@/types/IWeatherForecast';
import { createContext, ReactNode, useContext, useState } from 'react';

interface WeatherContextProps {
  weather: IWeatherForecast[];
  add: (weather: IWeatherForecast) => void;
  remove: (cityRef: IWeatherForecast) => void;
  toggleFavorite: (city: ICity) => void;
}

export const WeatherContext = createContext<WeatherContextProps>({
  weather: [{ city: { id: '', name: '', country: '' }, temp: 0, climate: '', max: 0, min: 0 }],
  add: () => {},
  remove: () => {},
  toggleFavorite: () => {}
});

interface WeatherContextProviderProps {
  children: ReactNode;
}

export function WeatherContextProvider(props: WeatherContextProviderProps) {
  //   const storage = useStorage<IWeatherForecast>('weatherList', { name: '' });
  const [weather, setWeather] = useState<IWeatherForecast[]>([]);

  function add(weather: IWeatherForecast) {
    setWeather((prevState) => [...prevState, weather]);
  }

  function remove(weather: IWeatherForecast) {
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

  function toggleFavorite(city: ICity) {
    setWeather((prevState) => {
      const weatherFound = prevState.find((item) => item.city.name === city.name);
      if (weatherFound !== undefined) {
        const newState = prevState.filter((item) => item.city.name !== city.name);
        const newWeather: IWeatherForecast = {
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
