import axios from '../utils/axios'
import Api from '../config/Api'
export function getWxConfig(url) {
  return axios.post(Api.getWxAuthConfig,{url});
}

export async  function getJobCaseDicApi(){
  return axios.get(Api.getDataDic+`?sysId=0&orgId=0&dictNo=OCCUPATION`)
}

export async  function getPatientTypeApi(){
  return axios.get(Api.getDataDic+`?sysId=0&orgId=0&dictNo=PATIENTTYPE`)
}

export async  function  callDepartmentListApi(){
  return axios.get(Api.getDataDic+`?sysId=0&orgId=0&dictNo=DEPART`)

}
export async  function callDeptListApi(){
  return axios.get(Api.deptListApi)
}

export   function callXG22ListApi(){
  return axios.get(Api.getDataDic+`?sysId=0&orgId=0&dictNo=22_THRONG`,{});
}
export function callXGPersonSortApi(){
  return axios.get(Api.getDataDic+`?sysId=0&orgId=0&dictNo=THRONG`,{});
}

