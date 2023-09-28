// @ts-ignore
/* eslint-disable */
import { SYS_URL } from '@/services/api/configurl';
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /dict/data/list */
export async function listDictData(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listDictDataParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseIPageDictData>(SYS_URL + '/dict/data/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /dict/data/get */
export async function getDictDataById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: any,
  options?: { [key: string]: any },
) {
  return request<any>(SYS_URL + '/dict/data/get', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /dict/data/add */
export async function addDictData(body: API.DictData, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/dict/data/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /dict/data/delete */
export async function deleteDictDataById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDictDataByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/dict/data/delete', {
    method: 'GET',
    params: {
      ...params,
      dictData: undefined,
      ...params['dictData'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /dict/data/edit */
export async function updateDictData(body: API.DictData, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/dict/data/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
