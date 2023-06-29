import axios from "axios";
import { axiosConfig } from "@/utils/requestHandler";
import qs from "qs";
import Vue from "vue";
import store from "../store";

// axios.defaults.baseURL = "http://139.198.127.28:18991";
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "";
} else {
  axios.defaults.baseURL = "";
}

// axios.defaults.transformRequest = [
//   function (data) {
//     return qs.stringify(data);
//   },
// ];
// create an axios instance
const service = axios.create(axiosConfig);

// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为Token
service.interceptors.request.use(
  async (config) => {
    if (config.method === "get") {
      const params = { ...config.params } || {};
      // 由于后台会对传递的参数进行校验，删除 type 为 requestPendingHandler 的相关参数
      if (params.type === "requestPendingHandler") {
        delete params.type;
        delete params.isRequestPending;
      }
      config.params = params;
      //config.params._ = new Date().getTime();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// http response 拦截器
service.interceptors.response.use(
  async (res) => {
    console.log("res", res);
    if (res.data.code !== 0) {
      Vue.prototype.$message({
        title: res.data.meta.msg || "系统错误",
        type: "error",
      });
    } else {
      return res.data.data;
    }
  },
  (error) => {
    if (error.toString().indexOf("401") != -1) {
      store.commit("loginOut");
      Vue.prototype.$message({
        title: "错误",
        message: "登录失效,请重新登录",
        type: "error",
      });
    } else {
      Vue.prototype.$message({
        title: "错误",
        message: "系统错误",
        type: "error",
      });
    }
    return Promise.reject(error);
  }
);

service.jsonPost = (url, params) => {
  return service({
    url: url,
    method: "post",
    data: params,
    headers: {
      "Content-Type": "application/json", //如果写成contentType会报错
    },
    transformRequest: [
      function (data) {
        return JSON.stringify(data);
      },
    ],
  });
};
service.upload = (url, params) => {
  return service({
    url: url,
    method: "post",
    data: params,
    responseType: "arraybuffer",
  });
};
service.formData = (url, params) => {
  return service({
    url: url,
    method: "post",
    data: params,
    headers: {
      "Content-Type": "application/json", //如果写成contentType会报错
    },
    transformRequest: [
      function (data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        ret = ret.substring(0, ret.lastIndexOf("&"));
        return ret;
      },
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
export default service;
