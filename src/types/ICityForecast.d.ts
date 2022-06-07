import IForecast from './IForecast';

export default interface ICityForecast extends IForecast {
  daily: IForecast[];
}
