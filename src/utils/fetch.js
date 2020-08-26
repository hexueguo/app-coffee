import { fetch } from 'whatwg-fetch';
import { stringify } from 'query-string';
import config from '../../config/config';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 检查请求返回状态
 * @param {*} response
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  const error = new Error(response.statusText);
  error.errCode = response.errCode;
  error.errortext = errortext;
  throw error;
}

/**
 * 格式化
 * 读取 Response 对象并且将它设置为已读（因为 Responses 对象被设置为了 stream 的方式，所以它们只能被读取一次），
 * 并返回一个被解析为 JSON 格式的 Promise 对象。
 * @param {*} response
 */
function parseJSON(response) {
  return response.json();
}

/**
 * 检查返回码
 * @param {*} response
 */
function checkCode(response) {
  if (`${response.errCode}` === '0') {
    return response;
  }
  const errortext = response.errMsg || '后端接口返回异常';
  const error = new Error(response.errCode);
  error.errCode = response.errCode;
  error.errortext = errortext;
  throw error;
}

/**
 * 其他自定义check
 * @param {*} response
 */
function otherCheck(response) {
  // TODO
  return response;
}

/**
 * request请求统一封装
 * @param {*} url
 * @param {*} options
 * @param {*} curstomHeaders
 */
const request = (url, options, curstomHeaders) => {
  const newOptions = {
    ...options,
    headers: {
      'x-requested-with': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...curstomHeaders,
    },
  };
  return fetch(`${config.prefix}${url}`, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkCode)
    .then(otherCheck)
    .catch((err) => {
      return { ...err, message: JSON.stringify({ url, newOptions }) };
    });
};

/**
 * GET
 * @param {*} url
 * @param {*} data
 * @param {*} curstomHeaders
 */
const get = (url, data, curstomHeaders) =>
  request(
    `${url}${data ? `?${stringify(data)}` : ''}`,
    {
      method: 'GET',
    },
    curstomHeaders
  );

/**
 * POST
 * @param {*} url
 * @param {*} data
 * @param {*} curstomHeaders
 */
const post = (url, data, curstomHeaders) =>
  request(
    url,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    curstomHeaders
  );

/**
 * PUT
 * @param {*} url
 * @param {*} data
 * @param {*} curstomHeaders
 */
const put = (url, data, curstomHeaders) =>
  request(
    url,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
    curstomHeaders
  );

/**
 * DELETE
 * @param {*} url
 * @param {*} data
 * @param {*} curstomHeaders
 */
const del = (url, data, curstomHeaders) =>
  request(
    url,
    {
      method: 'DELETE',
      body: JSON.stringify(data),
    },
    curstomHeaders
  );

/**
 * UPLOAD
 * @param {*} url
 * @param {*} data
 */
const upload = (url, data) => {
  if (!data) return;
  const formData = new FormData();
  formData.append('file', data);
  return request(url, { method: 'POST', body: formData });
};

const Fetch = {};
Fetch.get = get;
Fetch.post = post;
Fetch.put = put;
Fetch.delete = del;
Fetch.upload = upload;

export { get, post, put, del, upload };
export default Fetch;
