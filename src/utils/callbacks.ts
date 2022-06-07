export async function asyncMap<T>(
  array: T[],
  callback: (value: T, index: number) => Promise<T>,
  iterator: T[] = []
): Promise<T[]> {
  if (array.length > 0) {
    const response = await callback(array[0], iterator.length);
    return asyncMap(array.slice(1), callback, [...iterator, response]);
  }
  return iterator;
}
