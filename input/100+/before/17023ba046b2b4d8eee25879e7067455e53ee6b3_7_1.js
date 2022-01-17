function(instance,keyFn,cache){
var t=this,c=cache||{},f=function(){
var a=arguments,i=!!instance||this instanceof f,k=keyFn?keyFn(a,t):i+":"+a.length+":"+A.join.call(a)
return k in c?c[k]:(c[k]=i?t.construct(a):t.apply(this,a))}
f.origin=t
f.cached=c
f.extend=function(){
return t.extend.apply(t,arguments).cache(instance,keyFn,c)}
f[P]=t[P]
return f}