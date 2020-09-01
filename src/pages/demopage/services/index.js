import { get } from 'utils/fetch';

/**
 * test
 * @param {*} url
 * @param {*} data
 */
export const getTest = (url, data) => get(url, data);

export const getTestLoading = (url, data) => get(url, data);
