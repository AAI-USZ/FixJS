function getChecked(obj,whatreturn){
   whatreturn=whatreturn||'value';
   for(var i=0;i<obj.length;i++){
      if(obj[i].checked) return obj[i][whatreturn];
   }
   return undefined;
}