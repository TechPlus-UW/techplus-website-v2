import _ from 'lodash';

export function jsonKeysToCamelCase<T>(data: Record<string, any>): T {
  return _.mapKeys(data, (v, k) => _.camelCase(k)) as T;
}

export function jsonKeysToSnakeCase<T>(data: Record<string, any>): T {
  return _.mapKeys(data, (v, k) => _.snakeCase(k)) as T;
}

/**
 * Converts an image from a user's local computer to a File object.
 * @see https://stackoverflow.com/a/38935990
 */
export function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) throw new Error('Invalid data URL');
  const mime = mimeMatch[1];
  const ext = mime.split('/')[1];
  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  const finalFilename = `${filename}.${ext}`;
  return new File([u8arr], finalFilename, { type: mime });
}
