function loaded() {
  var code=getCookie('code');
  if (code!=null && code!='')
    document.getElementById('code').innerHTML=code;
  else
    resetCode();

  var cookie=getCookie('params');
  if (cookie!=null && cookie!='') {
    var fields=cookie.split(';');
    for (i in fields) {
      if (fields[i]=='') continue;
      if (fields[i].split(',')[0]==null || fields[i].split(',')[0]=='') continue;
      document.getElementById(fields[i].split(',')[0]).value=fields[i].split(',')[1];
    }
  }
}