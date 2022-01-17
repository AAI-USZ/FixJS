function reRound(val,to,asfloat){
   to=to||100;
   if(Math.abs(val)<to) return val;
   var s=val/to;
   s=(s-Math.floor(s))*to;
   if(!asfloat) s=Math.round(s);
   return s;
}