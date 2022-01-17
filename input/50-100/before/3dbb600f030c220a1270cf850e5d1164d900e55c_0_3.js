function group2val(groupObj,what){
   what=what||'value';
   for(var i=0;i<groupObj.length;i++){
      if(groupObj[i].type=='radio' && groupObj[i].checked) return groupObj[i][what];
      else if(groupObj[i].type!=='radio') return groupObj[i][what];
   }
   return undefined;
}