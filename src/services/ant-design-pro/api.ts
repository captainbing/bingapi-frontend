// // @ts-ignore
// /* eslint-disable */
// import { request } from '@umijs/max';
// import {SYS_URL} from "@/services/api/config";
//
//
// /** 获取当前的用户 GET /api/currentUser */
// export async function currentUser(params:object,options?: { [key: string]: any }) {
//   return request<{
//     data: API.CurrentUser;
//   }>(SYS_URL + '/sys/user/getLoginUser', {
//     method: 'GET',
//     params,
//     ...(options || {}),
//   });
// }
//
// /** 退出登录接口 POST /api/login/outLogin */
// export async function outLogin(options?: { [key: string]: any }) {
//   return request<Record<string, any>>(SYS_URL + '/sys/user/logout', {
//     method: 'POST',
//     ...(options || {}),
//   });
// }
//
// /** 登录接口 POST /api/login/account */
// export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
//   if (body?.type === 'password'){
//     return request<API.LoginResult>(SYS_URL + '/sys/user/login', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       params: body,
//     });
//   }else{
//     console.log("body",body)
//     body = {
//       userAccount:body.userAccount,
//       captcha:body.captcha,
//       autoLogin:body.autoLogin
//     }
//     return request<API.LoginResult>(SYS_URL + '/sys/user/captchaLogin', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       params: body,
//     });
//   }
// }
// /** 获取规则列表 GET /api/rule */
// export async function rule(
//   params: {
//     // query
//     /** 当前的页码 */
//     current?: number;
//     /** 页面的容量 */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.RuleList>(SYS_URL + '/sys/interface/list', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }
