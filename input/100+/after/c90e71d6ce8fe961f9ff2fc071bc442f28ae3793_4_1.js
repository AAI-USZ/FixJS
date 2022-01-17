function resetCode() {
  var defaultCode="//var1 : sees water";
  defaultCode+="\n//var2 : direction";
  defaultCode+="\n//var3 : last hunger";
  defaultCode+="\n\nif (me.getSmell().r>0) me.forward(500);";
  defaultCode+="\nif (me.getColor().r>0.6) {";
  defaultCode+="\n  me.rotate(-4000);";
  defaultCode+="\n}";
  defaultCode+="\nelse {";
  defaultCode+="\n  if (me.getSmell().b>0) {";
  defaultCode+="\n    me.forward(20);";
  defaultCode+="\n  }";
  defaultCode+="\n  else {";
  defaultCode+="\n    if (me.age==0) {me.var1=false; me.var2=1; me.var3=me.getHunger();}";
  defaultCode+="\n    if (me.getColor().b>0 && !me.var1) {me.var1=true;}";
  defaultCode+="\n    if (me.getColor().b==0 && me.var1) {";
  defaultCode+="\n     if (me.getColor().g>0) {";
  defaultCode+="\n     }";
  defaultCode+="\n     else me.var1=false; me.var2*=-1;}";
  defaultCode+="\n    me.rotate(me.var2*30);";
  defaultCode+="\n    me.forward(20);";
  defaultCode+="\n    me.var3=me.getHunger();";
  defaultCode+="\n  }";
  defaultCode+="\n}";
  document.getElementById('code').value=defaultCode;
}