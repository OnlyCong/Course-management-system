import http from "@/utils/http";

export async function getPythonData(params) {
  return http.jsonPost("/python/getData", params);
}
export async function getPythonData2(params) {
  return http.jsonPost("/python/getData2", params);
}