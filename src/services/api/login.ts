import {request} from "@@/exports";
import {SYS_URL} from "@/services/api/configurl";

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    userAccount?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FakeCaptcha>(SYS_URL + '/user/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>(SYS_URL + '/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  if (body?.type === 'password'){
    return request<API.LoginResult>(SYS_URL + '/user/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: body,
    });
  }else{
    console.log("body",body)
    body = {
      userAccount:body.userAccount,
      captcha:body.captcha,
      autoLogin:body.autoLogin
    }
    return request<API.LoginResult>(SYS_URL + '/user/captchaLogin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: body,
    });
  }
}
