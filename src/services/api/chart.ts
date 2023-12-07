// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import {SYS_URL} from "@/services/api/configurl";

/** 此处后端没有提供注释 POST /chart/add */
export async function addChart(
  body: {
    chart?: API.Chart;
  },
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/chart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /chart/delete */
export async function deleteChartById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteChartByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/chart/delete', {
    method: 'DELETE',
    params: {
      ...params,
      chart: undefined,
      ...params['chart'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /chart/edit */
export async function updateChart(body: API.Chart, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>(SYS_URL + '/chart/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /chart/get */
export async function getChartById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChartByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChart>(SYS_URL + '/chart/get', {
    method: 'GET',
    params: {
      ...params,
      chart: undefined,
      ...params['chart'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /chart/list */
export async function listChartByPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params?: API.listChartByPageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseIPageChart>(SYS_URL + '/chart/list', {
    method: 'GET',
    params: {
      // current has a default value: 1
      current: '1',
      // size has a default value: 10
      size: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/gen */
export async function genChartByAi(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseChartVO>(SYS_URL + '/chart/gen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
