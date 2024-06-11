export function chunkArray<T>(array: Array<T>, length: number) {
  const result = [];
  for (let i = 0; i < array.length; i += length) {
    result.push(array.slice(i, i + length));
  }
  return result;
}
