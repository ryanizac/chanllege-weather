import City from './City';

export default interface Weather {
  city: City;
  temp: number;
  climate: string;
  min: number;
  max: number;
}
