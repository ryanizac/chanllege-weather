import ICity from './ICity';

export default interface IWeatherForecast {
  city: ICity;
  temp: number;
  climate: string;
  min: number;
  max: number;
  isFavorite?: boolean | undefined;
}
