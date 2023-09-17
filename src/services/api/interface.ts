import {request} from "@@/exports";
import {SYS_URL} from "@/services/api/config";

/** 根据接口名称查询接口 */
export async function searchInterfacesByName(params:object,options?: { [key: string]: any }) {
  return request<{
    data: CUSTOM_API.CustomResponse;
  }>(SYS_URL + '/sys/interface/search', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 删除接口 单个 */
export async function deleteInterfaceById(data:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/sys/interface/remove', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 编辑接口 */
export async function editInterface(data:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/sys/interface/editInterface', {
    method: 'POST',
    data,
  });
}


/** 中台搜索 图片 */
export async function getInterfaceById(params:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/sys/interface/getInterface', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取所有接口的信息 */
export async function listInterfaceInfo(data:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/sys/interface/list', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除接口 批量 */
export async function deleteInterfaceBatch(data:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/sys/interface/remove', {
    method: 'POST',
    data,
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function listCurrentUserInterfaceInfo(params:object,options?: { [key: string]: any }) {
  return request<{
    data: CUSTOM_API.InterfaceInfo;
  }>(SYS_URL + '/sys/interface/listInterfaces', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

