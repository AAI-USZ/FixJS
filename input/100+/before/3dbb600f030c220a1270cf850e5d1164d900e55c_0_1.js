function getsett(text,ss,si,es){
   if(text==undefined) return undefined;
   if(ss==undefined) return undefined;
   if(es==undefined) return undefined;
   var getsett_i1=0;
   var getsett_i2=0;
   var text1=text.toLowerCase();
   ss=ss.toLowerCase();
   es=es.toLowerCase();
   if(ss!=='') getsett_i1=text1.indexOf(ss,si);
   else getsett_i1=si;
   if(getsett_i1==-1) return undefined;
   if(es!=='') getsett_i2=text1.indexOf(es,getsett_i1+ss.length);
   else getsett_i2=text1.length;
   if(getsett_i2==-1) return undefined;
   return text.slice(getsett_i1+ss.length,getsett_i2);

}