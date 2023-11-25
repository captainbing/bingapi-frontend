declare namespace API {
  type addConfigParams = {
    config: SysConfig;
  };

  type addJobParams = {
    job: SysJob;
  };

  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseDictData = {
    code?: number;
    data?: DictData;
    message?: string;
  };

  type BaseResponseInteger = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
  };

  type BaseResponseInvokeRecordVO = {
    code?: number;
    data?: InvokeRecordVO;
    message?: string;
  };

  type BaseResponseInvokeVO = {
    code?: number;
    data?: InvokeVO;
    message?: string;
  };

  type BaseResponseIPageDictData = {
    code?: number;
    data?: IPageDictData;
    message?: string;
  };

  type BaseResponseIPageDictType = {
    code?: number;
    data?: IPageDictType;
    message?: string;
  };

  type BaseResponseIPageInterfaceInfo = {
    code?: number;
    data?: IPageInterfaceInfo;
    message?: string;
  };

  type BaseResponseIPageSysConfig = {
    code?: number;
    data?: IPageSysConfig;
    message?: string;
  };

  type BaseResponseIPageSysJob = {
    code?: number;
    data?: IPageSysJob;
    message?: string;
  };

  type BaseResponseIPageUserVO = {
    code?: number;
    data?: IPageUserVO;
    message?: string;
  };

  type BaseResponseListInterfaceInfoVO = {
    code?: number;
    data?: InterfaceInfoVO[];
    message?: string;
  };

  type BaseResponseListInvokeMenuVO = {
    code?: number;
    data?: InvokeMenuVO[];
    message?: string;
  };

  type BaseResponseListPicture = {
    code?: number;
    data?: Picture[];
    message?: string;
  };

  type BaseResponseString = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseSysConfig = {
    code?: number;
    data?: SysConfig;
    message?: string;
  };

  type BaseResponseSysJob = {
    code?: number;
    data?: SysJob;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type captchaLoginParams = {
    userAccount: string;
    captcha: string;
  };

  type convertChinese2PinyinParams = {
    chinese?: string;
  };

  type copyInvokeRecordByIdParams = {
    id?: string;
  };

  type deleteConfigByIdParams = {
    config: SysConfig;
  };

  type deleteDictDataByIdParams = {
    dictData: DictData;
  };

  type deleteDictTypeByIdParams = {
    dictType: DictType;
  };

  type deleteJobByIdParams = {
    job: SysJob;
  };

  type deleteMenuParams = {
    id?: string;
  };

  type DeleteRequest = {
    id?: number;
    ids?: number[];
  };

  type DictData = {
    id?: number;
    dictLabel?: string;
    dictValue?: string;
    dictType?: string;
    defaultFlag?: string;
    status?: string;
    dictSort?: number;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
  };

  type DictType = {
    id?: number;
    dictName?: string;
    dictType?: string;
    status?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
  };

  type doSearchPictureParams = {
    pictureQueryRequest: PictureQueryRequest;
  };

  type doSearchVideoParams = {
    pictureQueryRequest: PictureQueryRequest;
  };

  type getConfigByIdParams = {
    config: SysConfig;
  };

  type getDictDataByIdParams = {
    dictData: DictData;
  };

  type getInterfaceByIdParams = {
    id: number;
  };

  type getInterfaceInfoByIdParams = {
    id: number;
  };

  type getInterfaceInfoParams = {
    id: number;
  };

  type getInvokeRecordByIdParams = {
    id?: string;
  };

  type getJobByIdParams = {
    job: SysJob;
  };

  type getLoginUserParams = {
    userAccount: string;
  };

  type getQQImageParams = {
    qqRequest: QQRequest;
  };

  type getUserByIdParams = {
    user: User;
  };

  type InterfaceInfo = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    invokeTotal?: number;
    deleted?: number;
  };

  type InterfaceInfoDTO = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    invokeTotal?: number;
    deleted?: number;
    leftNum?: number;
  };

  type InterfaceInfoVO = {
    id?: number;
    name?: string;
    desc?: string;
    content?: ProList[];
  };

  type InvokeMenuVO = {
    title?: string;
    value?: string;
    key?: string;
    parentId?: string;
    isLeaf?: boolean;
  };

  type InvokeRecord = {
    id?: string;
    parentId?: string;
    userId?: string;
    requestUrl?: string;
    requestMethod?: string;
    type?: string;
    requestParam?: string;
    requestHeader?: string;
    requestBody?: string;
    responseHeader?: string;
    responseBody?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
    title?: string;
  };

  type InvokeRecordRequest = {
    id?: string;
    title?: string;
    parentId?: string;
    requestUrl?: string;
    requestMethod?: string;
    requestParam?: RequestField[];
    requestHeader?: RequestField[];
    requestBody?: string;
    responseHeader?: RequestField[];
    responseBody?: string;
  };

  type InvokeRecordVO = {
    id?: string;
    title?: string;
    parentId?: string;
    userId?: string;
    requestUrl?: string;
    requestMethod?: string;
    type?: string;
    requestParam?: RequestField[];
    requestHeader?: RequestField[];
    requestBody?: string;
    responseHeader?: RequestField[];
    responseBody?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
  };

  type InvokeRequest = {
    requestUrl?: string;
    requestMethod?: string;
    requestParam?: RequestField[];
    requestHeader?: RequestField[];
    requestBody?: string;
  };

  type InvokeVO = {
    responseHeader?: Record<string, any>;
    responseBody?: string;
  };

  type IPageDictData = {
    size?: number;
    total?: number;
    current?: number;
    records?: DictData[];
    pages?: number;
  };

  type IPageDictType = {
    size?: number;
    total?: number;
    current?: number;
    records?: DictType[];
    pages?: number;
  };

  type IPageInterfaceInfo = {
    size?: number;
    total?: number;
    current?: number;
    records?: InterfaceInfo[];
    pages?: number;
  };

  type IPageSysConfig = {
    size?: number;
    total?: number;
    current?: number;
    records?: SysConfig[];
    pages?: number;
  };

  type IPageSysJob = {
    size?: number;
    total?: number;
    current?: number;
    records?: SysJob[];
    pages?: number;
  };

  type IPageUserVO = {
    size?: number;
    total?: number;
    current?: number;
    records?: UserVO[];
    pages?: number;
  };

  type listConfigParams = {
    config: SysConfig;
    current?: number;
    size?: number;
  };

  type listDictDataParams = {
    dictType: DictType;
    current?: number;
    size?: number;
  };

  type listDictTypeParams = {
    dictType: DictType;
    current?: number;
    size?: number;
  };

  type listInterfacesParams = {
    user: User;
  };

  type listJobParams = {
    job: SysJob;
    current?: number;
    size?: number;
  };

  type ModifyPasswordRequest = {
    oldPassword?: string;
    newPassword?: string;
    checkNewPassword?: string;
  };

  type Picture = {
    url?: string;
    title?: string;
  };

  type PictureQueryRequest = {
    searchText?: string;
    current?: number;
    pageSize?: number;
  };

  type ProList = {
    label?: string;
    value?: string;
    status?: string;
  };

  type QQRequest = {
    qq?: string;
    size?: string;
  };

  type RequestField = {
    key?: string;
    requestKey?: string;
    requestValue?: string;
    description?: string;
  };

  type SearchInterfaceRequest = {
    name?: string;
    status?: string;
    method?: string;
    current?: number;
    size?: number;
  };

  type searchInterfacesByNameParams = {
    interfaceRequest: InterfaceInfoDTO;
  };

  type SearchUserRequest = {
    userName?: string;
    userRole?: string;
    userStatus?: string;
    current?: number;
    size?: number;
  };

  type selectMenuParams = {
    id: string;
  };

  type sendCaptchaParams = {
    userAccount: string;
  };

  type SysConfig = {
    id?: number;
    configKey?: string;
    configValue?: string;
    configType?: string;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
  };

  type SysJob = {
    id?: number;
    jobName?: string;
    jobGroup?: string;
    invokeTarget?: string;
    cronExpression?: string;
    misfirePolicy?: number;
    concurrent?: number;
    status?: number;
    createBy?: string;
    createTime?: string;
    updateBy?: string;
    updateTime?: string;
    remark?: string;
  };

  type testParams = {
    userName?: string;
    age?: string;
  };

  type User = {
    id?: string;
    userAccount?: string;
    userPassword?: string;
    accessKey?: string;
    secretKey?: string;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    userStatus?: number;
    createTime?: string;
    updateTime?: string;
    deleted?: number;
  };

  type userLoginParams = {
    user: User;
  };

  type userRegisterParams = {
    userAccount: string;
    captcha: string;
  };

  type UserVO = {
    id?: string;
    userAccount?: string;
    accessKey?: string;
    secretKey?: string;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    userStatus?: number;
    createTime?: string;
    updateTime?: string;
    deleted?: number;
  };
}
