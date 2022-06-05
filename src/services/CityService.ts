import City from '@/@types/City';

const allCityTest: City[] = [
  { name: 'pau dos ferros', country: 'BR' },
  { name: 'joão câmara', country: 'BR' },
  { name: 'natal', country: 'BR' },
  { name: 'martins', country: 'BR' },
  { name: 'são paulo', country: 'SP' }
];

export default class CityService {
  static async getAll(): Promise<City[]> {
    return allCityTest;
  }

  static async findByName(value: string): Promise<City[] | undefined> {
    return allCityTest.filter((city) => {
      const cityName = city.name.toLocaleLowerCase();
      const findCity = value.toLocaleLowerCase();
      return cityName.includes(findCity);
    });
  }
}
