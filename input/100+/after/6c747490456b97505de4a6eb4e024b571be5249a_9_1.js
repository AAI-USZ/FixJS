function rootDigit(n){
  for(var x=0,i=0,j,s='',t=n+'';i<100;i++){
    for(j=1;;j++) if(strCmp(prodDigit(s+j,j),t)) break;
    j--; t=strMinus(t,prodDigit(s+j,j));
    x+=j; s=strPlus(s+j,''+j); t+='00';
  }
  return x;
}