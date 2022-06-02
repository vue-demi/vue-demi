/* eslint-disable no-console */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: '',
  timeout: 3000,
  withCredentials: true,
};
// create an axios instance
const instance = axios.create(axiosRequestConfig);
const reqlock: Record<any, boolean> = {};

// request interceptor
instance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const reqLockKey: any = config.params && config.params.reqLockKey;
    if (!reqLockKey || !reqlock[reqLockKey]) {
      reqLockKey && (reqlock[reqLockKey] = true);
      return config;
    } else {
      return Promise.reject();
    }
  },
  function (error) {
    // request error
    return Promise.reject(error);
  }
);

interface AxiosResponseReqLock extends AxiosResponse {
  params?: {
    reqLockKey: any;
  };
}
// response interceptor
instance.interceptors.response.use(
  function (response: AxiosResponseReqLock) {
    const reqLockKey: any = response.params && response.params.reqLockKey;
    if (reqLockKey) {
      reqlock[reqLockKey] = false;
    }
    return response.data;
  },
  function (error) {
    // response error
    return Promise.reject(error);
  }
);

/**
 * @param {String} method Request method: get、post、delete、put
 * @param {String} url Request url
 * @param {Object} data Request param
 * @returns {Promise}
 */
export default function (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  lastUrl: string,
  data: null | Record<string, string> = null
) {
  const newUrl = url + lastUrl;
  const newMethod = method.toLowerCase();
  if (newMethod === 'post') {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return instance.post(newUrl, qs.stringify(data), config);
    // post的form格式
  } else if (newMethod === 'post-form') {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    return instance.post(newUrl, qs.stringify(data), config);
  } else if (newMethod === 'get') {
    return instance.get(newUrl, {
      params: data,
    });
  } else if (newMethod === 'delete') {
    return instance.delete(newUrl, {
      params: data,
    });
  } else if (newMethod === 'put') {
    return instance.put(newUrl, data);
  } else {
    return false;
  }
}
