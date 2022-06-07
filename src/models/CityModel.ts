import ICity from '@/types/ICity';
import ICityBase from '@/types/ICityBase';
import ICityCoord from '@/types/ICityCoord';
import ICityForecast from '@/types/ICityForecast';
import IForecast from '@/types/IForecast';
import ICityBaseAPI from '@/types/responses/ICityBaseAPI';
import ICityCoordAPI from '@/types/responses/ICityCoordAPI';
import ICityForecastAPI from '@/types/responses/ICityForecastAPI';

export function extractCityBase(data: ICityBaseAPI): ICityBase {
  return {
    id: data.place_id,
    name: data.structured_formatting.main_text,
    country: data.structured_formatting.secondary_text
  };
}

export function extractCityCoord(data: ICityCoordAPI): ICityCoord {
  return {
    lat: data.geometry.location.lat,
    lon: data.geometry.location.lng
  };
}

export function extractCityForecast(cityForecast: ICityForecastAPI): ICityForecast {
  const firstDaily = cityForecast.daily[0];
  const firstWeather = firstDaily.weather[0];

  return {
    daily: cityForecast.daily.map((item) => ({
      description: item.weather[0].description,
      dt: item.dt,
      max: item.temp.max,
      min: item.temp.min,
      temp: item.temp.day
    })),
    description: firstWeather.description,
    dt: cityForecast.current.dt,
    max: firstDaily.temp.max,
    min: firstDaily.temp.min,
    temp: cityForecast.current.temp
  };
}

export default class CityModel<B extends ICityBase, C extends ICityCoord, F extends ICityForecast>
  implements ICity
{
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  isFavorite: boolean = false;
  daily?: IForecast[] | undefined;
  description?: string;
  dt?: number;
  max?: number;
  min?: number;
  temp?: number;

  constructor(base: B, coord: C, forecast: F | { [key: string]: any } = {}, prevCity?: ICity) {
    if (prevCity) this.setPrevCity(prevCity);

    this.id = base.id;
    this.name = base.name;
    this.country = base.country;
    this.lat = coord.lat;
    this.lon = coord.lon;
    this.daily = forecast.daily;
    this.description = forecast.description;
    this.dt = forecast.dt;
    this.max = forecast.max;
    this.min = forecast.min;
    this.temp = forecast.temp;
  }

  setPrevCity(prevCity: ICity) {
    this.id = prevCity.id;
    this.name = prevCity.name;
    this.country = prevCity.country;
    this.lat = prevCity.lat;
    this.lon = prevCity.lon;
    this.isFavorite = prevCity.isFavorite;
    this.daily = prevCity.daily;
    this.description = prevCity.description;
    this.dt = prevCity.dt;
    this.max = prevCity.max;
    this.min = prevCity.min;
    this.temp = prevCity.temp;
  }
}
