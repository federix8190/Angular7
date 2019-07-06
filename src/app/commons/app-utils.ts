export const API_HOST = "https://desa02.konecta.com.py:8380";
export const SERVICE_REST = API_HOST + "/rest";

export function deleteEmptyData(data){
    
    for(const key in data) {
        if(data[key] == '' || data[key] == null) {
          delete data[key];
        }
    }
    return data;
}