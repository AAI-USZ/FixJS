function(ms){
var t=this,n=0
return function(){
var d=+new Date
if(d>n){
n=d+ms
t.apply(null,arguments)}}}