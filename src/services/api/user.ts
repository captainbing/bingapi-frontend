import {request} from "@@/exports";
import {SYS_URL} from "@/services/api/config";

/** 获取登陆人信息 */
export async function getUserById(params:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/sys/user/get', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(params:object,options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>(SYS_URL + '/sys/user/getLoginUser', {
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
export async function listUser(data:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/sys/user/list', {
    method: 'POST',
    data,
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

