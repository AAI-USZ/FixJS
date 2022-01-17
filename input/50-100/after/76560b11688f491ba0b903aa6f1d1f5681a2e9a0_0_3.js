function updateComplete(){
  var win = true;
  for(var i =0;i<(ROWS*COLS);i++) { 
    if(inmap[i]!=i) win = false;
  }
  if(win) {
    console.log('YAYA~~~~~');
    alert('恭喜恭喜！～');
  }
}