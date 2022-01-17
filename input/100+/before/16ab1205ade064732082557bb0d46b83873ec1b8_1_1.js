function loaded() {
  console.log('mobile : '+getMobile().any());
  var argParams='';
  var args=getUrlParameters();
  if (args!=null) { //TODO
    argParams=window.location.hash.substr(1);
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
    var cookie=argParams.replace(/=/g,',');  //We cheat a little since the arg params have the same syntax as the cookie

  console.log(cookie);

  if (cookie!=null && cookie!='') {
    var fields=cookie.split('&');
    for (i in fields) {
      if (fields[i]=='') continue;
      if (fields[i].split(',')[0]==null || fields[i].split(',')[0]=='') continue;
      var el=document.getElementById(fields[i].split(',')[0]);
      if (el!=null)
        el.value=fields[i].split(',')[1];
    }
  }

  buildQTable();

  if (argParams!='' && argParams.search('autoStart')!=-1) startClicked();

  upMode=function(element) {document.getElementById('code').disabled=(document.getElementById('gameMode').value=='qlearning');
    document.getElementById('qLHelp').style.display=(document.getElementById('gameMode').value==='qlearning')?'':'none';
  };
  document.getElementById('gameMode').onchange=upMode;
  upMode();

  if (getMobile().any()==true) {
    document.getElementById('code').cols='30';
  }
}