function(mode){
   if(!mode) var s=0;
   else var s=1;
   for(var i=0,l=this.length;i<l;i++){
      if(!mode) s=s+parseFloat(this[i]);
      else s=s*parseFloat(this[i]);
   }
   return (s/this.length);
}