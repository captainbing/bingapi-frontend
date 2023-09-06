declare namespace CUSTOM_API{
interface InterfaceInfo{
  id?:number;
  name?:string; // 接口名称
  description?:string;
  url?:string;
  requestHeader?:string;
  responseHeader?:string;
  status?:number;
  method?:string;
  userId?:number;
  createTime?:Date;
  updateTime?:Date;
  deleteFlag?:number;
}
interface CustomResponse{
  code?:number,
  data?:any,
  message?:string
}
}
