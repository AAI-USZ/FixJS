function resetCode() {
  var defaultCode="//var1 : sees water\n";
  defaultCode+="//var2 : direction\n";
  defaultCode+="//var3 : last hunger\n";
  defaultCode+="if (me.age==0) {me.var1=false; me.var2=1; me.var3=me.getHunger();}\n";
  defaultCode+="if (me.getColor().b>0 && !me.var1) {me.var1=true;}\n";
  defaultCode+="if (me.getColor().b==0 && me.var1) {me.var1=false; me.var2*=-1;}\n";
  defaultCode+="me.rotate(me.var2*30);\n";
  defaultCode+="me.forward(20);\n";
  defaultCode+="me.var3=me.getHunger();\n";
  document.getElementById('code').value=defaultCode;
}