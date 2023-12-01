import {request} from "@@/exports";
import {SYS_URL} from "@/services/api/configurl";

/** 根据接口名称查询接口 */
export async function searchInterfacesByName(params:object,options?: { [key: string]: any }) {
  return request<{
    data: CUSTOM_API.CustomResponse;
  }>(SYS_URL + '/interface/search', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 删除接口 单个 */
export async function deleteInterfaceById(data:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/interface/remove', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 编辑接口 */
export async function editInterface(data:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/interface/editInterface', {
    method: 'POST',
    data,
  });
}


/** 此处后端没有提供注释 GET /interface/get */
export async function getInterfaceInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInterfaceInfo>(SYS_URL + '/interface/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取所有接口的信息 */
export async function listInterfaceInfo(data:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/interface/list', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除接口 批量 */
export async function deleteInterfaceBatch(data:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/interface/remove', {
    method: 'POST',
    data,
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function listCurrentUserInterfaceInfo(params:object,options?: { [key: string]: any }) {
  return request<{
    data: CUSTOM_API.InterfaceInfo;
  }>(SYS_URL + '/interface/listInterfaces', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /interface/analysis */
export async function listTopInterfaceInfo(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInterfaceInfoAnalysisVO>(SYS_URL + '/interface/analysis', {
    method: 'GET',
    ...(options || {}),
  });
}

