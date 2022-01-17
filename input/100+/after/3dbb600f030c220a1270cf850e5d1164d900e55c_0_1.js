function(pref,end,from){
   if(!this || !pref || !suf) return '';
   var i1=0, i2=0, text=this.toLowerCase();
   pref=pref.toLowerCase();
   end=end.toLowerCase();
   from=from||0;
   if(pref) i1=text.indexOf(pref,from);
   else i1=from;
   if(i1==-1) return '';
   if(end) i2=text.indexOf(end,i1+pref.length);
   else i2=text.length;
   if(i2==-1) return '';
   return this.slice(i1+pref.length,i2);
}