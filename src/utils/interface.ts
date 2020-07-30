// 一些通用接口定义

interface IDispatchParams {
  type: string;
  payload?: any;
  [key: string]: any;
}

export type IDispatch<T = any> = (params: IDispatchParams) => any | Promise<T>;
