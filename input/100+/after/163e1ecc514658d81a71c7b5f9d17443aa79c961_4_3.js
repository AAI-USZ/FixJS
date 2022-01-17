function startClicked() {
  gameMode=document.getElementById('gameMode').value;
  width=40*document.getElementById('width').value;
  height=40*document.getElementById('height').value;
  rainFactor=document.getElementById('rain').value;
  killFactor=document.getElementById('kill').value;
  eatFactor=document.getElementById('eat').value;
  drinkFactor=document.getElementById('drink').value;
  initialGreen=document.getElementById('green').value;
  initialRed=document.getElementById('red').value;
  initialWater=document.getElementById('water').value;
  g_init(width,height,30,Array('green_selected.png','gray.png','red.png','water.png','green.png','eye.png'),init,updateWide);

  var cookie='';
  var formNode=document.getElementById('paramsForm');
  var fields=formNode.getElementsByTagName('input');
  var fields2=formNode.getElementsByTagName('select');
  for (i in fields) {
    if (fields[i].id==undefined) continue;
    cookie+=fields[i].id+','+fields[i].value+';';
    fields[i].disabled=true;
  }
  for (i in fields2) {
    if (fields2[i].id==undefined) continue;
    cookie+=fields2[i].id+','+fields2[i].value+';';
    fields2[i].disabled=true;
  }
  setCookie('params',cookie,3650);
  setCookie('code',document.getElementById('code').value,3650);

  //Allocate matrix
  matrixW=width/matrixCellSize;
  matrixH=height/matrixCellSize;
  matrix=new Array(matrixW);
  for (var i=0; i<matrixW; i++) {
    matrix[i]=new Array(matrixH);
    for (var j=0; j<matrixH; j++) {
      matrix[i][j]=new LinkedList();
    }
  }
}