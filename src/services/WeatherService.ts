import Weather from '@/@types/Weather';

const allWeatherTest: Weather[] = [
  {
    temp: 30,
    climate: 'sol com força',
    max: 32,
    min: 28,
    city: { name: 'pau dos ferros', country: 'BR' }
  },
  {
    temp: 30,
    climate: 'sol com força',
    max: 32,
    min: 28,
    city: { name: 'joão câmara', country: 'BR' }
  },
  { temp: 30, climate: 'sol com força', max: 32, min: 28, city: { name: 'natal', country: 'BR' } },
  {
    temp: 30,
    climate: 'sol com força',
    max: 32,
    min: 28,
    city: { name: 'martins', country: 'BR' }
  },
  {
    temp: 30,
    climate: 'sol com força',
    max: 32,
    min: 28,
    city: { name: 'são paulo', country: 'SP' }
  }
];

export default class WeatherService {
  static async getAll(): Promise<Weather[]> {
    return allWeatherTest;
  }

  static async findByCityName(value: string): Promise<Weather[] | undefined> {
    return allWeatherTest.filter((weather) => {
      const weatherName = weather.city.name.toLocaleLowerCase();
      const findWeather = value.toLocaleLowerCase();
      return weatherName.includes(findWeather);
    });
  }
}
