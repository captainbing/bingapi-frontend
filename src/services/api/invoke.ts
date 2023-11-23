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

/** 此处后端没有提供注释 GET /invoke/menu/get */
export async function getMenuTree(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInvokeMenuVO>(SYS_URL + '/invoke/menu/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /invoke/menu/add */
export async function addMenu(body: API.InvokeRecord, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/invoke/menu/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /invoke/menu/edit */
export async function editMenu(body: API.InvokeRecord, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/invoke/menu/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /invoke/menu/delete */
export async function deleteMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteMenuParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/invoke/menu/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /invoke/menu/select */
export async function selectMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.selectMenuParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponse>(SYS_URL + '/invoke/menu/select', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 此处后端没有提供注释 POST /invoke/record/add */
export async function addInterfaceRecord(
  body: API.InvokeRecordRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/invoke/record/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** 此处后端没有提供注释 GET /invoke/record/get */
export async function getInvokeRecordById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInvokeRecordByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInvokeRecordVO>(SYS_URL + '/invoke/record/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
