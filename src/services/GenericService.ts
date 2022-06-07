export default class GenericService {
  static mountParams<T extends object>(params: T): string {
    const entries = Object.entries(params);
    return entries
      .reduce((prev, curr) => {
        return [...prev, `${curr[0]}=${curr[1]}`];
      }, [] as string[])
      .join('&');
  }

  static mountRoute(baseRoute: string, baseParams: object) {
    const params = this.mountParams(baseParams);
    return baseRoute + params;
  }
}
