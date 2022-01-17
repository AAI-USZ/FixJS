function reRound(val,as,float){
   if(as==undefined) as=360;
   if(Math.abs(val)<as) return val;
   var s=val/as;
   s=(s-Math.floor(s))*as;
   if(float!==undefined || !float) s=Math.round(s);
   return s;
}