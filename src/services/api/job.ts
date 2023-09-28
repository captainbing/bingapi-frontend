// @ts-ignore
/* eslint-disable */
import { SYS_URL } from '@/services/api/configurl';
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /job/add */
export async function addJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addJobParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/job/add', {
    method: 'POST',
    params,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /job/delete */
export async function deleteJobById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteJobByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/job/delete', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /job/edit */
export async function updateJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  data: any,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/job/edit', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /job/get */
export async function getJobById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getJobByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseSysJob>(SYS_URL + '/job/get', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /job/list */
export async function listJob(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listJobParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseIPageSysJob>(SYS_URL + '/job/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /job/status/change */
export async function changeJobStatus(body: API.SysJob, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/job/status/change', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
