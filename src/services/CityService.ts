import ICityBaseAPIRes from '@/types/responses/ICityBaseAPIRes';
import ICityCoordAPIRes from '@/types/responses/ICityCoordAPIRes';
import GenericService from './GenericService';

export default class CityService extends GenericService {
  static async searchCity(text: string): Promise<ICityBaseAPIRes['predictions'] | undefined> {
    const baseRoute = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?';
    const baseParams = {
      input: encodeURIComponent(text),
      types: '(cities)',
      language: 'pt',
      key: 'AIzaSyCUD9M7N3SvDci5gAwoapGigKI1n9eGIic'
    };
    const route = this.mountRoute(baseRoute, baseParams);
    try {
      const req = await fetch(route);
      const res = (await req.json()) as ICityBaseAPIRes;
      return res.predictions;
    } catch (error: any) {
      return undefined;
    }
  }

  static async findCoord(id: string): Promise<ICityCoordAPIRes['result'] | undefined> {
    const baseRoute = 'https://maps.googleapis.com/maps/api/place/details/json?';
    const baseParams = {
      place_id: id,
      fields: ['name', 'geometry'].join(','),
      key: 'AIzaSyCUD9M7N3SvDci5gAwoapGigKI1n9eGIic'
    };
    const route = this.mountRoute(baseRoute, baseParams);
    try {
      const req = await fetch(route);
      const res = (await req.json()) as ICityCoordAPIRes;
      return res.result;
    } catch (error: any) {
      return undefined;
    }
  }
}
