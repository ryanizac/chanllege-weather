import ICity from '@/types/ICity';

const allCityTest: ICity[] = [
  { id: '1', name: 'pau dos ferros', country: 'BR' },
  { id: '2', name: 'joão câmara', country: 'BR' },
  { id: '3', name: 'natal', country: 'BR' },
  { id: '4', name: 'martins', country: 'BR' },
  { id: '5', name: 'são paulo', country: 'SP' }
];

export default class CityService {
  static async getAll(): Promise<ICity[]> {
    return allCityTest;
  }

  static async findByName(value: string): Promise<ICity[] | undefined> {
    return allCityTest.filter((city) => {
      const cityName = city.name.toLocaleLowerCase();
      const findCity = value.toLocaleLowerCase();
      return cityName.includes(findCity);
    });
  }
}
