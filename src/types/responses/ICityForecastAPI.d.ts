interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Current {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like?: number;
  pressure?: number;
  humidity?: number;
  dew_point?: number;
  uvi?: number;
  clouds?: number;
  visibility?: number;
  wind_speed?: number;
  wind_deg?: number;
  weather: Weather[];
}

interface Temp {
  dt: number;
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

interface Alert {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
}

export default interface ICityForecastAPI {
  lat?: number;
  lon?: number;
  timezone?: number;
  timezone_offset?: number;
  current: Current;
  daily: Daily[];
  alerts?: Alert[];
}
