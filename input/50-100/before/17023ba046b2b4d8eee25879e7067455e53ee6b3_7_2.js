function(){
var t=this,f=t.clone(),i=0,e
f[P]=Object.create(t[P])
while(e=arguments[i++])for(t in e)if(e.hasOwnProperty(t))f[P][t]=e[t];
return f}