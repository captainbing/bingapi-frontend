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
