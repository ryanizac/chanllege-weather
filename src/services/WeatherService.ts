import IWeatherForecast from '@/types/IWeatherForecast';

const allWeatherTest: IWeatherForecast[] = [
  {
    temp: 30,
    climate: 'sol com força',
    max: 32,
    min: 28,
    city: { id: '1', name: 'pau dos ferros', country: 'BR' }
  },
  {
    temp: 30,
    climate: 'sol com força',
    max: 32,
    min: 28,
    city: { id: '2', name: 'joão câmara', country: 'BR' }
  },
  {
    temp: 30,
    climate: 'sol com força',
    max: 32,
    min: 28,
    city: { id: '3', name: 'natal', country: 'BR' }
  },
  {
    temp: 30,
    climate: 'sol com força',
    max: 32,
    min: 28,
    city: { id: '4', name: 'martins', country: 'BR' }
  },
  {
    temp: 30,
    climate: 'sol com força',
    max: 32,
    min: 28,
    city: { id: '5', name: 'são paulo', country: 'SP' }
  }
];

export default class WeatherService {
  static async getAll(): Promise<IWeatherForecast[]> {
    return allWeatherTest;
  }

  static async findByCityName(value: string): Promise<IWeatherForecast[] | undefined> {
    return allWeatherTest.filter((weather) => {
      const weatherName = weather.city.name.toLocaleLowerCase();
      const findWeather = value.toLocaleLowerCase();
      return weatherName.includes(findWeather);
    });
  }
}
