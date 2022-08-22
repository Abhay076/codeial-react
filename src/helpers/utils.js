export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);//'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]);// abhay 123 => abhay%2020123

    formBody.push(encodedKey + '=' + encodedValue);
  }
   return formBody.join('&');// 'username=abhay&password=12341'
}
