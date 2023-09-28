// @ts-ignore
/* eslint-disable */
import { SYS_URL } from '@/services/api/configurl';
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /dict/type/add */
export async function addDictType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  data: any,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/dict/type/add', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /dict/type/delete */
export async function deleteDictTypeById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDictTypeByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/dict/type/delete', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /dict/type/edit */
export async function updateDictType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  data: any,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/dict/type/edit', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /dict/type/list */
export async function listDictType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listDictDataParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseIPageDictType>(SYS_URL + '/dict/type/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
