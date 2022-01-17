function(e){
if(!e)e=w.event
var delta="wheelDelta"in e?e.wheelDelta/120 : -e.detail/3
delta!=0&&fn.call(el,e,delta)}