/** 根据接口名称查询接口 */
import {SYS_URL} from "@/services/api/configurl";
import {request} from "@umijs/max";


export async function invokeInterface(data:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/invoke/another', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /invoke/menu/get */
export async function getMenuTree(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInvokeMenuVO>(SYS_URL + '/invoke/menu/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /invoke/menu/add */
export async function addMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addMenuParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/invoke/menu/add', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /invoke/menu/delete */
export async function deleteMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMenuParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/invoke/menu/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
