const config = {
  // base_url: 'http://106.14.188.43:8004',
  base_url: 'http://localhost:8004',
  image_url: 'http://localhost:8004/image/',
  computer_url: 'http://localhost:8004/v1/customer',
}

/* 获取指定cookie */
function getCookie(name) {
  var strCookie = document.cookie;
  var arrCookie = strCookie.split(";");
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split("=");
    if (arr[0].trim() === name)
      return arr[1];
  }
  return "";
}

//读取token
function checktoken() {
  if(!getCookie('token') || getCookie('token') === '0'){
    window.location.href = "/login";
    return -1;
  }
  return getCookie('token');
}

export {
  config,
  getCookie,
  checktoken
}

