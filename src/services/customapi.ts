// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import {SYS_URL} from "@/services/ant-design-pro/config";

/** 获取所有接口的信息 */
export async function listInterfaceInfo(params:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/sys/interface/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}


/** 获取登陆人信息 */
export async function getUserById(params:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/sys/user/get', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}


/** 获取所有接口的信息 */
export async function editUserInfo(data:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/sys/user/edit', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 获取所有用户的信息 */
export async function listUser(params:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/sys/user/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取所有用户的信息 */
export async function deleteUserBatch(data:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/sys/user/remove', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 修改当前用户密码 */
export async function updateUserPassword(data:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/sys/user/modify', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}


/** 修改当前用户密码 */
export async function validateUserPassword(data:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/sys/user/validate', {
    method: 'POST',
    data,
    ...(options || {}),
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

/** 根据接口名称查询接口 */
export async function invokeInterface(data:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/sys/invoke/another', {
    method: 'POST',
    data,
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

/** 删除接口 批量 */
export async function deleteInterfaceBatch(data:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/sys/interface/remove', {
    method: 'POST',
    data,
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



/** 中台搜索 图片 */
export async function searchPicture(params:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/sys/search/picture', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

