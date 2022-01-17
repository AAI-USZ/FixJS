function(o){
var s=this,a=arguments,r
if(typeof o=="object")Object.each(o,function(v,k){
a[0]=k
a[1]=v
r=t.apply(s,a)})
else r=t.apply(s,a)
return r}