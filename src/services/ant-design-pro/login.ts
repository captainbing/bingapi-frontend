// // @ts-ignore
// /* eslint-disable */
// import { request } from '@umijs/max';
// import {SYS_URL} from "@/services/api/config";
//
// /** 发送验证码 POST /api/login/captcha */
// export async function getFakeCaptcha(
//   params: {
//     // query
//     /** 手机号 */
//     userAccount?: string;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.FakeCaptcha>(SYS_URL + '/sys/user/captcha', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }
