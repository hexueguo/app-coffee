// 禁止浏览器回退
export const forbidHistoryBack = () => {
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', () => {
    history.pushState(null, null, document.URL);
  });
};

/**
 * 工具方法，获取一个UUID
 * @returns UUID
 */
export const getUUID = () => {
  // return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * 文件下载
 * @param {*} url
 * @param {*} fileNames
 * @param  {...any} params
 */
export async function downloadFile(url, params = {}) {
  // const token = storage.get("token");
  const formEle = document.createElement('form');
  formEle.method = 'get';
  formEle.style = 'display:none;';
  formEle.action = url;

  const authEle = document.createElement('input');
  authEle.type = 'hidden';
  // authEle.name = 'Authorization';
  // authEle.value = 'Basic MTE6MTIzNDU2';
  formEle.appendChild(authEle);

  for (const key in params) {
    if (key && params[key]) {
      const paramsEle = document.createElement('input');
      paramsEle.type = 'hidden';
      paramsEle.name = key;
      paramsEle.value = params[key];
      formEle.appendChild(paramsEle);
    }
  }

  document.body.appendChild(formEle);
  formEle.submit();
  document.body.removeChild(formEle);
}

/**
 * 防抖
 * @param fn {function} 需要调用的方法
 * @param delay {number} 延迟执行的毫秒数，默认200ms
 */

export const debounce = (fn, delay) => {
  const delays = delay || 200;
  let timer;

  // eslint-disable-next-line func-names
  return function(rest) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn(rest);
    }, delays);
  };
};

/**
 * 节流
 * @param fn {function} 需要调用的方法
 * @param wait {number} 执行fn的等待时间，默认为1000ms
 */
export const throttle = (fn, wait = 1000, ...rest) => {
  let pre = 0;
  // eslint-disable-next-line func-names
  return function() {
    const now = Date.now(); // 当前时间戳
    if (now - pre > wait) {
      fn.apply(this, rest);
      pre = now;
    }
  };
};

/**
 * 文件下载请求
 * @param {*} url 文件地址
 * @param {*} fileName 文件名
 */
export function getFile(url, fileName) {
  const httpRequest = new XMLHttpRequest();
  // 指定响应类型，这决定了浏览器对返回内容的解析方式，设置为空或者text会作为字符解析、json会作为json解析，blob和arraybuffer会作为字节流解析
  httpRequest.responseType = 'arraybuffer';
  httpRequest.open('GET', url, true);
  httpRequest.onload = () => {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      // 只有responseType为空或者text，才会使用responseText获取内容，其他情况                        httpRequest.response就是你需要的不含http头的返回内容
      const content = httpRequest.response;
      const elink = document.createElement('a');
      elink.download = fileName;
      elink.style.display = 'none';
      const blob = new Blob([content]);
      // 创建指向内存中字节流的链接
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      document.body.removeChild(elink);
    }
  };
  httpRequest.send();
}

// classnames库简易方法，使用方式跟classnames库一样
export const classnames = (...args) => {
  return args
    .map((el) => {
      if (typeof el === 'string') {
        return el;
      }
      if (el instanceof Object) {
        return Object.keys(el)
          .filter((it) => el[it])
          .join(' ');
      }
      return `${el}`;
    })
    .join(' ');
};
