/** 中台搜索 图片 */
import {request} from "@umijs/max";
import {SYS_URL} from "@/services/api/configurl";


export async function searchPicture(params:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/search/picture', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
