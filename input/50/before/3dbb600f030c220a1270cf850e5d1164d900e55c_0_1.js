function reAngle(val){
   if(isString(val)) val=parseFloat(val);
   val=reRound(val,360);
   if(val<=0) val+=360;
   return val;
}