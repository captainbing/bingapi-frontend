import {request} from "@@/exports";
import {SYS_URL} from "@/services/api/config";

/** 根据接口名称查询接口 */
export async function invokeInterface(data:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/sys/invoke/another', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
