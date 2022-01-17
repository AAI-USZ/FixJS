function loaded() {
  var argParams='';
  var args=getUrlParameters();
  if (args!=null) {
    if (args['params']!==undefined) argParams=args['params'];
    window.location='#';
  }
  else {
  }

  var code=getCookie('code');
  if (code!=null && code!='')
    document.getElementById('code').innerHTML=code;
  else
    resetCode();
  
  if (argParams=='')
    var cookie=getCookie('params');
  else
    var cookie=argParams;  //We cheat a little since the arg params have the same syntax as the cookie

  if (cookie!=null && cookie!='') {
    var fields=cookie.split(';');
    for (i in fields) {
      if (fields[i]=='') continue;
      if (fields[i].split(',')[0]==null || fields[i].split(',')[0]=='') continue;
      document.getElementById(fields[i].split(',')[0]).value=fields[i].split(',')[1];
    }
  }

  buildQTable();
}