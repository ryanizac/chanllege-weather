import ICityForecastAPIRes from '@/types/responses/ICityForecastAPIRes';
import GenericService from './GenericService';

export default class ForecastService extends GenericService {
  static async findByGeometry(lat: number, lon: number): Promise<ICityForecastAPIRes | undefined> {
    const baseRoute = 'https://api.openweathermap.org/data/3.0/onecall?';
    const baseParams = {
      lat,
      lon,
      units: 'metric',
      exclude: ['hourly', 'minutely'].join(','),
      lang: 'pt',
      appid: '328e35e2ddcc76e1dba9667241d2ae1d'
    };
    const route = this.mountRoute(baseRoute, baseParams);
    try {
      const req = await fetch(route);
      const res = (await req.json()) as ICityForecastAPIRes;
      return res;
    } catch (error: any) {
      return undefined;
    }
  }
}
