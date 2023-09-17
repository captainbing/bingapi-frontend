import {request} from "@@/exports";
import {SYS_URL} from "@/services/api/config";

/** 中台搜索 图片 */
export async function searchPicture(params:object,options?: { [key: string]: any }) {
  return request<CUSTOM_API.CustomResponse>(SYS_URL + '/sys/search/picture', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
