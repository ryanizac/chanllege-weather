import ICityBase from './ICityBase';
import ICityCoord from './ICityCoord';
import ICityForecast from './ICityForecast';

export default interface ICity extends ICityBase, ICityCoord, Partial<ICityForecast> {
  isFavorite: boolean;
}
