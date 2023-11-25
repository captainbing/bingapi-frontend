/** 获取登陆人信息 */
import {request} from "@umijs/max";
import {SYS_URL} from "@/services/api/configurl";


export async function getUserById(params:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/user/get', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(params:object,options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>(SYS_URL + '/user/getLoginUser', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取所有接口的信息 */
export async function editUserInfo(data:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/user/edit', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 获取所有用户的信息 */
export async function listUser(data:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/user/list', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 获取所有用户的信息 */
export async function deleteUserBatch(data:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/user/remove', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 修改当前用户密码 */
export async function updateUserPassword(data:object,options?: { [key: string]: any }) {
  return request<any>(SYS_URL + '/user/modify', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/reset */
export async function resetEncryptKey(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>(SYS_URL + '/user/reset', {
    method: 'GET',
    ...(options || {}),
  });
}
