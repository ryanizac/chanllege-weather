interface Coordinates {
  lat: number;
  lng: number;
}

export default interface ICityCoordAPI {
  geometry: {
    location: Coordinates;
    viewport?: {
      northeast: Coordinates;
      southwest: Coordinates;
    };
  };
  name?: string;
}
