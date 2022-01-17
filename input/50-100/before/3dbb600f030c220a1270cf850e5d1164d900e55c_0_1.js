function(p){
   if(p==undefined || !p) var s=0;
   else var s=1;
   for(var i=0,l=this.length;i<l;i++){
      if(p==undefined || !p) s=s+parseFloat(this[i]);
      else s=s*parseFloat(this[i]);
   }
   return (s/this.length);
}