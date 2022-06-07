import ICityBaseAPI from './ICityBaseAPI';

export default interface ICityBaseAPIRes {
  predictions: ICityBaseAPI[];
  status: string;
}
