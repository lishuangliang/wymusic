import axios from 'axios'
/**
 * ajax请求函数模块封装
 * return --> promise对象
 * **/
export default function ajax(url, data={}, type='get') {
  return new Promise(function (resolve, reject) {
    let promise;
    if(type == 'get'){
      let dataStr = '';
      Object.keys(data).forEach(key=>{
        dataStr += key + '=' + data[key] + '&'
      })

      if(dataStr !== ''){
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr
      }
      promise = axios.get(url)
    }else{
      //post请求
      promise = axios.post(url, data);
    }

    promise.then((response)=>{
      resolve(response.data);
    }).catch((error)=>{
      reject(error);
    })
  });
}
