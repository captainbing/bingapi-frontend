// @ts-ignore
/* eslint-disable */
import { SYS_URL } from '@/services/api/configurl';
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /config/add */
export async function addConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addConfigParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/config/add', {
    method: 'POST',
    params,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /config/delete */
export async function deleteConfigById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteConfigByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/config/delete', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /config/edit */
export async function updateConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  data: any,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/config/edit', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /config/list */
export async function listConfig(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listConfigParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseIPageSysConfig>(SYS_URL + '/config/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /config/get */
export async function getConfigById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getConfigByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseSysConfig>(SYS_URL + '/config/get', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
