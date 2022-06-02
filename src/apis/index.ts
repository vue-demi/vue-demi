// eslint-disable-next-line no-unused-vars
import req from './http.js';

type Params = Record<string, string> | null | undefined;

export const request = (params: Params) =>
  req('get', '', '', {
    ...params,
  });
